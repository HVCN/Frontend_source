import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Theme, widthPercentageToPixels } from "../../../helpers";
import { InventoryTypes } from "../../../constants";
import ScreenNames from "../../ScreenNames";

type InventoryProps = { name: string; type: string; navigation: any };

const Inventory = ({ name, type, navigation }: InventoryProps) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(ScreenNames.InventoryTab, {
          screen: ScreenNames.SpecificInventory,
          initial: false,
          params: {
            inventoryType: type,
            name: name,
          },
        });
      }}
      style={styles.inventories}
    >
      <Text style={styles.inventoryName}>{name}</Text>
    </Pressable>
  );
};

export const Inventories = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {InventoryTypes &&
        InventoryTypes.map((inv, index) => {
          return (
            <Inventory
              key={index}
              name={inv.name}
              type={inv.type}
              navigation={navigation}
            />
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  inventories: {
    backgroundColor: Theme.colors.darkAccent,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  inventoryName: {
    fontSize: widthPercentageToPixels(5),
    color: Theme.colors.mainText,
  },
});
