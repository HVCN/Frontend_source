import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { Theme, widthPercentageToPixels } from "../../../helpers";
import Lang from "../../../language";
import { InventoryTypings } from "../../../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type ModalTypes = {
  addItem: () => void;
  date: Date;
  datePickerText: string;
  itemName: string;
  onChangeDate: any;
  setItemName: Dispatch<SetStateAction<string>>;
  setShowDatePicker: Dispatch<SetStateAction<boolean>>;
  setToggleLocation?: Dispatch<SetStateAction<string>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  showDatePicker: boolean;
  toggleLocation?: string;
  visible: boolean;
};

export const AddItemModal = ({
  addItem,
  date,
  datePickerText,
  itemName,
  onChangeDate,
  setItemName,
  setShowDatePicker,
  setToggleLocation,
  setVisible,
  showDatePicker,
  toggleLocation,
  visible,
}: ModalTypes) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalBody}>
          <View style={styles.closeModalButton}>
            <Pressable hitSlop={7} onPress={() => setVisible(!visible)}>
              <FontAwesomeIcon icon={faTimes} color={"white"} size={35} />
            </Pressable>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              style={{ ...styles.input, width: "60%" }}
              onChangeText={setItemName}
              value={itemName}
              placeholder={Lang.screens.inventory.addItemPlaceholder}
            />

            <View style={{ height: "5%" }}></View>

            <Pressable
              onPress={() => setShowDatePicker(true)}
              style={{ ...styles.expiration, width: "60%" }}
            >
              <Text style={styles.dateShown}>{datePickerText}</Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                display="calendar"
                onChange={onChangeDate}
              />
            )}

            <View style={{ height: "5%" }}></View>

            {setToggleLocation && (
              <View style={styles.toggleContainer}>
                <Pressable
                  onPress={() => setToggleLocation(InventoryTypings.Fridge)}
                  style={[
                    styles.toggle,
                    toggleLocation === InventoryTypings.Fridge &&
                      styles.onToggle,
                  ]}
                >
                  <Text style={styles.toggleText}>
                    {Lang.screens.inventory.fridge}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setToggleLocation(InventoryTypings.Freezer)}
                  style={[
                    styles.toggle,
                    toggleLocation === InventoryTypings.Freezer &&
                      styles.onToggle,
                  ]}
                >
                  <Text style={styles.toggleText}>
                    {Lang.screens.inventory.freezer}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setToggleLocation(InventoryTypings.Pantry)}
                  style={[
                    styles.toggle,
                    toggleLocation === InventoryTypings.Pantry &&
                      styles.onToggle,
                  ]}
                >
                  <Text style={styles.toggleText}>
                    {Lang.screens.inventory.pantry}
                  </Text>
                </Pressable>
              </View>
            )}

            <Pressable onPress={addItem} style={styles.sumbit}>
              <Text style={styles.addItemButtonText}>
                {Lang.screens.inventory.addItemSubmit}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  itemName: {
    fontSize: 25,
    color: Theme.colors.mainText,
    textAlign: "center",
  },
  modalBody: {
    width: "90%",
    backgroundColor: Theme.colors.darkAccent,
    borderRadius: 10,

    shadowColor: Theme.colors.lightAccent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(14, 14, 16, 0.6)",
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
  dateShown: {
    fontSize: widthPercentageToPixels(4.3),
    color: "black",
    textAlign: "center",
  },
  sumbit: {
    backgroundColor: Theme.colors.background,
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
    backgroundColor: Theme.colors.background,
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
    color: Theme.colors.mainText,
  },
});
