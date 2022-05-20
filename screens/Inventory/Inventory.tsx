import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import React, { useState } from "react";
import {
  capitalizeFirstChar,
  formatDateSimple,
  Theme,
  typeLocalization,
  widthPercentageToPixels,
} from "../../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import Lang from "../../language";
import { getAuth } from "firebase/auth";
import { addItemToInventory } from "../../api/InventoryRequests";
import { InventoryTypings } from "../../constants";
import ScreenNames from "../ScreenNames";
import { AddItemModal } from "./components";

export const Inventory = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState("");
  const [toggleLocation, setToggleLocation] = useState("");
  const [date, setDate] = useState<Date>(new Date()); //initial todays date
  const [show, setShow] = useState(false); //show/hide datepicker
  const [text, setText] = useState<string>(Lang.screens.inventory.chooseDate); //dato som vises

  const auth = getAuth();

  const navigateToType = (inventoryType: string) => {
    navigation.navigate(ScreenNames.SpecificInventory, {
      inventoryType: inventoryType,
      name: capitalizeFirstChar(typeLocalization(inventoryType)),
    });
  };

  const onChange = (event: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setText(formatDateSimple(currentDate));
  };

  const addItem = async () => {
    const response = await addItemToInventory(auth.currentUser?.uid, {
      type: toggleLocation,
      location: "home", // default location. needs to be properly implemented
      itemName: itemName,
      expirationDate: date,
    });

    if (response != null) {
      // in this case response will be the error/response status
      // anything other than a 201 status code.
      // handle these cases here / inform the user in some way
    }

    setItemName("");
    setToggleLocation("");
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable
          onPress={() => navigateToType(InventoryTypings.Fridge)}
          style={styles.itemContainer}
        >
          <Text style={styles.itemName}>{Lang.screens.inventory.fridge}</Text>
        </Pressable>
        <Pressable
          onPress={() => navigateToType(InventoryTypings.Freezer)}
          style={styles.itemContainer}
        >
          <Text style={styles.itemName}>{Lang.screens.inventory.freezer}</Text>
        </Pressable>
        <Pressable
          onPress={() => navigateToType(InventoryTypings.Pantry)}
          style={styles.itemContainer}
        >
          <Text style={styles.itemName}>{Lang.screens.inventory.pantry}</Text>
        </Pressable>
      </View>

      <View>
        <Pressable
          onPress={() =>
            navigation.navigate(ScreenNames.CompleteInventory, {
              name: Lang.screens.inventory.completeInventory,
            })
          }
          style={styles.showAllContainer}
        >
          <Text style={styles.itemName}>{Lang.screens.inventory.showAll}</Text>
        </Pressable>
        <Pressable
          style={styles.bottomContainer}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesomeIcon
            icon={faPlusSquare}
            size={40}
            color={Theme.colors.mainText}
          />
        </Pressable>
      </View>
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
    backgroundColor: Theme.colors.background,
    flex: 1,
    justifyContent: "space-evenly",
  },
  itemName: {
    fontSize: 25,
    color: Theme.colors.mainText,
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: Theme.colors.darkAccent,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    alignSelf: "center",
    width: widthPercentageToPixels(70),
  },
  showAllContainer: {
    backgroundColor: Theme.colors.darkAccent,
    padding: 10,
    marginBottom: "5%",
    borderRadius: 5,
    width: widthPercentageToPixels(50),
    alignSelf: "center",
  },
  bottomContainer: {
    alignSelf: "center",
  },
  modalBody: {
    width: "90%",
    backgroundColor: Theme.colors.darkAccent,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(14, 14, 16, 0.5)",
    // backgroundColor: Theme.colors.darkAccent,
  },
  closeModalButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  input: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
  },
  inputText: {
    fontSize: widthPercentageToPixels(5.5),
    color: Theme.colors.mainText,
    textAlign: "center",
  },
  dateShown: {
    fontSize: widthPercentageToPixels(4.3),
    color: "black",
    textAlign: "center",
  },
  sumbit: {
    backgroundColor: Theme.colors.darkAccent,
    marginTop: "5%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  toggleContainer: {
    flexDirection: "row",
  },
  toggle: {
    marginHorizontal: "2%",
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: Theme.colors.darkAccent,
  },
  onToggle: {
    backgroundColor: Theme.colors.mainContrast,
  },
  toggleText: {
    color: "white",
    fontSize: widthPercentageToPixels(4.4),
  },
  expiration: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  addItemButtonText: {
    fontSize: widthPercentageToPixels(5.5),
    color: "white",
  },
});
