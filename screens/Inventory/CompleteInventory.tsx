import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import React, { useMemo, useState, useEffect } from "react";
import {
  heightPercentageToPixels,
  Theme,
  widthPercentageToPixels,
  formatDateSimple,
} from "../../helpers";
import {
  addItemToInventory,
  deleteItemFromInventory,
  getAllItemsFromWholeInventory,
  searchItemsInventory,
} from "../../api/InventoryRequests";
import { getAuth } from "firebase/auth";
import { FlatList, TextInput } from "react-native-gesture-handler";
import Lang from "../../language";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FAB } from "react-native-paper";
import { AddItemModal } from "./components";
import { InventoryItemObject } from "../../types";

const DEFAULT_LOCATION = "home";

export const CompleteInventory = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState<string>("");
  const [inventoryItems, setInventoryItems] = useState<InventoryItemObject[]>(
    []
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [searchResultItems, setSearchResultItems] = useState<
    InventoryItemObject[]
  >([]);
  const [itemName, setItemName] = useState("");
  const [toggleLocation, setToggleLocation] = useState("");
  const [date, setDate] = useState<Date>(new Date()); //initial todays date
  const [show, setShow] = useState(false); //show/hide datepicker
  const [text, setText] = useState<string>(Lang.screens.inventory.chooseDate); //dato som vises
  const [updateList, setUpdateList] = useState(false);
  const [fabOpacity, setFabOpacity] = useState(1);
  const [deleteMode, setDeleteMode] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    if (searchText.length == 0) {
      setSearchResultItems([]);
    }
  }, [searchText]);

  useMemo(async () => {
    const response = await getAllItemsFromWholeInventory(auth.currentUser?.uid);

    if (response === 204) {
      setInventoryItems([]);
    } else if (response) {
      setInventoryItems(response);
    } else {
      alert(Lang.general.oops);
    }
  }, [updateList]);

  const searchForItem = async (searchParam: string) => {
    const response = await searchItemsInventory(
      auth.currentUser?.uid,
      searchParam
    );

    if (response === 204) {
      setSearchResultItems([]);
      setSearchText("");
    } else if (response) {
      setSearchResultItems(response);
    }
  };

  const addItem = async () => {
    const result = await addItemToInventory(auth.currentUser?.uid, {
      type: toggleLocation,
      location: DEFAULT_LOCATION, // default location. needs to be properly implemented
      itemName: itemName,
      expirationDate: date,
    });

    if (result != null) {
      // in this case response will be the error/response status
      // anything other than a 201 status code.
      // handle these cases here / inform the user in some way
      //Hello test
    }

    setUpdateList(!updateList);
    setItemName("");
  };

  const onChange = (event: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setText(formatDateSimple(currentDate));
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    return (
      layoutMeasurement.height +
        contentOffset.y +
        heightPercentageToPixels(10) >=
      contentSize.height
    );
  };

  const renderItem = ({
    itemName,
    expirationDate,
    type,
    _id,
  }: InventoryItemObject) => {
    let _expirationDate: Date = new Date(expirationDate);

    return (
      <View style={styles.itemContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text numberOfLines={1} style={styles.itemName}>
            {itemName}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {deleteMode ? (
              <Pressable
                onPress={async () => {
                  let result =
                    _id &&
                    (await deleteItemFromInventory(auth?.currentUser?.uid, {
                      type: type,
                      location: DEFAULT_LOCATION,
                      id: _id,
                    }));

                  if (result === null) {
                    setUpdateList(!updateList);

                    if (searchText.length > 0) {
                      searchForItem(searchText);
                    }
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  color={Theme.colors.mainText}
                  size={widthPercentageToPixels(7)}
                />
              </Pressable>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faClock}
                  color={Theme.colors.mainText}
                  size={20}
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.itemInfo}>
                  {formatDateSimple(_expirationDate)}
                </Text>
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleHome}>
        <View style={styles.searchItem}>
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            style={styles.inputFieldAdd}
            placeholder={Lang.screens.inventory.searchPlaceholder}
            onSubmitEditing={() => {
              searchForItem(searchText);
            }}
          />
          <Pressable
            onPress={() => {
              searchForItem(searchText);
            }}
            style={{ alignSelf: "center" }}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color={Theme.colors.darkAccent}
              size={35}
            />
          </Pressable>
        </View>

        <Pressable onPress={() => setDeleteMode(!deleteMode)}>
          <FontAwesomeIcon
            icon={faTrash}
            color={Theme.colors.mainText}
            size={35}
          />
        </Pressable>
      </View>
      {searchText.length > 0 ? (
        <FlatList
          style={{ paddingBottom: 50 }}
          keyExtractor={(item, index) => index.toString()} //Kan byttes ut med å rename id til key i list
          data={searchResultItems}
          renderItem={(itemObj) => renderItem(itemObj.item)}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              setFabOpacity(0.5);
            } else {
              setFabOpacity(1);
            }
          }}
        />
      ) : (
        <FlatList
          keyExtractor={(item, index) => index.toString()} //Kan byttes ut med å rename id til key i list
          data={inventoryItems}
          renderItem={(itemObj) => renderItem(itemObj.item)}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              setFabOpacity(0.5);
            } else {
              setFabOpacity(1);
            }
          }}
          extraData={updateList}
        />
      )}
      <FAB
        style={{ ...styles.fab, opacity: fabOpacity }}
        small={false}
        icon="plus"
        color={Theme.colors.mainContrast}
        onPress={() => setModalVisible(true)}
      />
      <AddItemModal
        visible={modalVisible}
        setVisible={() => {
          setModalVisible(!modalVisible);
        }}
        itemName={itemName}
        setItemName={setItemName}
        date={date}
        onChangeDate={onChange}
        showDatePicker={show}
        setShowDatePicker={setShow}
        datePickerText={text}
        toggleLocation={toggleLocation}
        setToggleLocation={setToggleLocation}
        addItem={addItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: Theme.colors.background,
    height: "100%",
    alignItems: "center",
  },
  titleHome: {
    justifyContent: "space-evenly",
    width: widthPercentageToPixels(90),
    color: Theme.colors.mainText,
    alignItems: "center",
    marginBottom: "5%",
    flexDirection: "row",
  },
  itemName: {
    fontSize: widthPercentageToPixels(6),
    color: Theme.colors.mainText,
    width: widthPercentageToPixels(60),
  },
  itemInfo: {
    fontSize: widthPercentageToPixels(4),
    color: Theme.colors.mainText,
  },
  itemContainer: {
    backgroundColor: Theme.colors.darkAccent, // Theme.colors.screenBackgroundContrast
    padding: 10,
    marginBottom: 15,
    width: widthPercentageToPixels(90),
    borderRadius: 5,
  },
  searchItem: {
    flexDirection: "row",
    justifyContent: "center",
    width: widthPercentageToPixels(65),
    height: heightPercentageToPixels(7),
    backgroundColor: Theme.colors.light,
    borderRadius: Theme.inputFields.borderRadius,
    marginVertical: "4%",
  },
  inputFieldAdd: {
    width: widthPercentageToPixels(50),
    paddingLeft: 15,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
  },
});
