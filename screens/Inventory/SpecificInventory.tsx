import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Platform,
} from "react-native";
import React, { useLayoutEffect, useMemo, useState, useEffect } from "react";
import {
  formatDateSimple,
  heightPercentageToPixels,
  Theme,
  widthPercentageToPixels,
} from "../../helpers";
import { FlatList } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash, faSearch, faClock } from "@fortawesome/free-solid-svg-icons";
import {
  addItemToInventory,
  deleteItemFromInventory,
  getAllItemsFromInventory,
  searchItemsInventory,
} from "../../api/InventoryRequests";
import { getAuth } from "firebase/auth";
import Lang from "../../language";
import { FAB } from "react-native-paper";
import { AddItemModal } from "./components";
import { InventoryItemObject } from "../../types";

const DEFAULT_LOCATION = "home";

export const SpecificInventory = ({ navigation, route }: any) => {
  const [searchText, setSearchText] = useState<string>("");
  const [inventoryItems, setInventoryItems] = useState<InventoryItemObject[]>(
    []
  );
  const [searchResultItems, setSearchResultItems] = useState<
    InventoryItemObject[]
  >([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState("");
  const [date, setDate] = useState<Date>(new Date()); //initial todays date
  const [show, setShow] = useState(false); //show/hide datepicker
  const [text, setText] = useState<string>(Lang.screens.inventory.chooseDate); //dato som vises
  const [updateList, setUpdateList] = useState(false);
  const [fabOpacity, setFabOpacity] = useState(1);
  const [deleteMode, setDeleteMode] = useState(false);

  const auth = getAuth();

  // TODO: searching returns matches no matter which inventory type is "set"
  useEffect(() => {
    if (searchText.length == 0) {
      setSearchResultItems([]);
    }
  }, [searchText]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params.name]);

  useMemo(async () => {
    const results = await getAllItemsFromInventory(
      auth?.currentUser?.uid,
      route.params.inventoryType
    );
    if (results === 204) {
      setInventoryItems([]);
    } else if (results) {
      setInventoryItems(results);
    } else {
      alert(Lang.general.oops);
    }
  }, [route.params.inventoryType, updateList]);

  const searchForItem = async (searchParam: string) => {
    const result = await searchItemsInventory(
      auth.currentUser?.uid,
      searchParam
    );

    if (result === 204) {
      setSearchResultItems([]);
      setSearchText("");
    } else if (result) {
      let _thisType: InventoryItemObject[] = result.filter(
        (item: InventoryItemObject) => {
          return item.type === route.params.inventoryType;
        }
      );
      setSearchResultItems(_thisType);
    }
  };

  const onChange = (event: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setText(formatDateSimple(currentDate));
  };

  const addItem = async () => {
    const result = await addItemToInventory(auth.currentUser?.uid, {
      type: route.params.inventoryType,
      location: DEFAULT_LOCATION, // default location. needs to be properly implemented
      itemName: itemName,
      expirationDate: date,
    });

    if (result != null) {
      // in this case response will be the error/response status
      // anything other than a 201 status code.
      // handle these cases here / inform the user in some way
    }

    setUpdateList(!updateList);
    setItemName("");
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
                hitSlop={7}
                onPress={async () => {
                  let result =
                    _id &&
                    (await deleteItemFromInventory(auth?.currentUser?.uid, {
                      type: route.params.inventoryType,
                      location: DEFAULT_LOCATION,
                      id: _id,
                    }));

                  if (result === null) {
                    setUpdateList(!updateList);

                    if (searchText.length > 0) {
                      await searchForItem(searchText);
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
              color={Theme.colors.navBottomColor}
              size={widthPercentageToPixels(8)}
            />
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            setDeleteMode(!deleteMode);
          }}
        >
          <FontAwesomeIcon
            icon={faTrash}
            color={Theme.colors.mainText}
            size={widthPercentageToPixels(7)}
          />
        </Pressable>
      </View>
      {searchText.length > 0 ? (
        <FlatList
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
    width: widthPercentageToPixels(100),
  },
  itemName: {
    fontSize: 25,
    color: Theme.colors.mainText,
    textAlign: "left",
    width: widthPercentageToPixels(60),
  },
  itemInfo: {
    fontSize: 15,
    color: "white",
  },
  itemContainer: {
    backgroundColor: Theme.colors.darkAccent,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    width: widthPercentageToPixels(90),
  },
  titleHome: {
    justifyContent: "space-evenly",
    width: widthPercentageToPixels(90),
    color: Theme.colors.mainText,
    alignItems: "center",
    marginBottom: "5%",
    flexDirection: "row",
  },
  searchItem: {
    flexDirection: "row",
    justifyContent: "center",
    width: widthPercentageToPixels(65),
    height: heightPercentageToPixels(7),
    backgroundColor: Theme.colors.light,
    borderRadius: 5,
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
