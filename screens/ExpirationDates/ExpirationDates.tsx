import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import {
  heightPercentageToPixels,
  widthPercentageToPixels,
  Theme,
  generateUUID,
} from "../../helpers";
import RBSheet from "react-native-raw-bottom-sheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Lang from "../../language";
import { getAllItemsFromInventory } from "../../api/InventoryRequests";
import { getAuth } from "firebase/auth";
import Divider from "../../components/Divider";
import { InventoryTypings } from "../../constants/inventory";
import { InventoryItem } from "./components/InventoryItem";
import { InventoryDisplayProps, InventoryItemObject } from "../../types";

const InventoryDisplay = ({
  inventoryName,
  data,
  renderControl,
  type,
}: InventoryDisplayProps) => {
  const [reRender, setReRender] = renderControl;

  const refRBSheet = useRef<any>();

  return (
    <View style={{ marginHorizontal: 15, marginBottom: "5%" }}>
      <Pressable
        onPress={() => {
          refRBSheet.current.open();
        }}
      >
        <Text style={styles.inventoryName}>{inventoryName}</Text>
        <View style={styles.inventoryContainer}>
          <View style={styles.column}>
            {data &&
              data.length > 0 &&
              data.map((item: InventoryItemObject, index: number) => {
                if (index <= 7 && index % 2 === 0) {
                  return <InventoryItem key={generateUUID()} item={item} />;
                }
              })}
          </View>
          <View style={styles.divider} />
          <View style={styles.column}>
            {data &&
              data.length > 0 &&
              data.map((item: any, index: number) => {
                if (index <= 7 && index % 2 !== 0) {
                  return <InventoryItem key={generateUUID()} item={item} />;
                }
              })}
          </View>
        </View>

        <Text style={{ color: "white" }}>{Lang.screens.expiration.seeAll}</Text>
      </Pressable>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        height={heightPercentageToPixels(80)}
        customStyles={{
          wrapper: {
            paddingTop: 50,
          },
          container: {
            backgroundColor: Theme.colors.screenBackgroundContrast,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <View style={styles.header}>
          <Text
            style={{
              alignSelf: "center",
              textAlign: "center",
              flexGrow: 1,
              color: Theme.colors.mainText,
              fontSize: widthPercentageToPixels(7),
              marginLeft: "10%",
            }}
          >
            {inventoryName}
          </Text>
          <Pressable
            onPress={() => {
              refRBSheet.current.close();
            }}
            style={styles.timesIcon}
          >
            <FontAwesomeIcon icon={faTimes} size={40} color={"white"} />
          </Pressable>
        </View>
        <ScrollView>
          {data &&
            data.length > 0 &&
            data.map((item: InventoryItemObject, index: number) => {
              return (
                <View key={generateUUID()}>
                  <InventoryItem
                    canBeDeleted
                    item={item}
                    dispatch={setReRender}
                    reRender={reRender}
                    type={type}
                  />
                  <Divider
                    width={widthPercentageToPixels(100)}
                    opacity={0.1}
                    color={"white"}
                  />
                </View>
              );
            })}
        </ScrollView>
      </RBSheet>
    </View>
  );
};

export const ExpirationDates = () => {
  const [reRender, setReRender] = useState(false);
  const [freezerItems, setFreezerItems] = useState<InventoryItemObject[]>([]);
  const [fridgeItems, setFridgeItems] = useState<InventoryItemObject[]>([]);
  const [pantryItems, setPantryItems] = useState<InventoryItemObject[]>([]);

  const auth = getAuth();

  useMemo(async () => {
    const fridge: InventoryItemObject[] | null = await getAllItemsFromInventory(
      auth?.currentUser?.uid,
      InventoryTypings.Fridge
    );

    if (fridge) {
      setFridgeItems(fridge);
    }

    const freezer: InventoryItemObject[] | null =
      await getAllItemsFromInventory(
        auth?.currentUser?.uid,
        InventoryTypings.Freezer
      );
    if (freezer) {
      setFreezerItems(freezer);
    }

    const pantry: InventoryItemObject[] | null = await getAllItemsFromInventory(
      auth?.currentUser?.uid,
      InventoryTypings.Pantry
    );
    if (pantry) {
      setPantryItems(pantry);
    }
  }, [reRender]);

  if (fridgeItems.length > 0) {
    fridgeItems.sort((a, b) =>
      a.expirationDate
        .toLocaleString()
        .localeCompare(b.expirationDate.toLocaleString())
    );
  }
  if (freezerItems.length > 0) {
    freezerItems.sort((a, b) =>
      a.expirationDate
        .toLocaleString()
        .localeCompare(b.expirationDate.toLocaleString())
    );
  }
  if (pantryItems.length > 0) {
    pantryItems.sort((a, b) =>
      a.expirationDate
        .toLocaleString()
        .localeCompare(b.expirationDate.toLocaleString())
    );
  }

  return (
    <View style={styles.wrapper}>
      <InventoryDisplay
        inventoryName={Lang.screens.expiration.fridge}
        data={fridgeItems}
        type={InventoryTypings.Fridge}
        renderControl={[reRender, setReRender]}
      />
      <InventoryDisplay
        inventoryName={Lang.screens.expiration.freezer}
        data={freezerItems}
        type={InventoryTypings.Freezer}
        renderControl={[reRender, setReRender]}
      />
      <InventoryDisplay
        inventoryName={Lang.screens.expiration.pantry}
        data={pantryItems}
        type={InventoryTypings.Pantry}
        renderControl={[reRender, setReRender]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    backgroundColor: Theme.colors.mainColor,
    paddingTop: "5%",
  },
  inventoryName: {
    color: Theme.colors.tomato,
    fontSize: widthPercentageToPixels(5),
  },
  timesIcon: {
    color: "white",
    padding: 10,
  },
  inventoryContainer: {
    backgroundColor: Theme.colors.screenBackgroundContrast,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    width: "100%",
    borderColor: "white",
    justifyContent: "space-between",
    minHeight: 50,
  },
  column: {
    width: "45%",
  },
  divider: {
    width: 1,
    backgroundColor: Theme.colors.tomato,
  },
  header: {
    marginBottom: "5%",
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
  },
});
