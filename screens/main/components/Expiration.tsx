import { View, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import {
  generateUUID,
  heightPercentageToPixels,
  Theme,
} from "../../../helpers";
import { getAuth } from "firebase/auth";
import { getExpiringItems } from "../../../api/InventoryRequests";
import { InventoryItem } from "../../ExpirationDates/components/InventoryItem";
import { InventoryItemObject } from "../../../types";

type ExpirationProps = {
  renderMainExp: any;
};

export function Expiration({ renderMainExp }: ExpirationProps) {
  const [inventoryItems, setInventoryItems] = useState<InventoryItemObject[]>(
    []
  );

  const { currentUser } = getAuth();

  useMemo(async () => {
    const results: InventoryItemObject[] | null =
      currentUser && (await getExpiringItems(currentUser.uid));

    if (results) {
      setInventoryItems(results);
    }
  }, [renderMainExp]);

  const inventoryItems1 =
    inventoryItems && inventoryItems.filter((item, index) => index % 2 == 0);
  const inventoryItems2 =
    inventoryItems && inventoryItems.filter((item, index) => index % 2 == 1);

  return (
    <View style={styles.wrapper}>
      <View style={styles.itemColumn}>
        {inventoryItems &&
          inventoryItems1.map((item, index) => (
            <InventoryItem
              canBeDeleted={false}
              key={generateUUID()}
              item={item}
            />
          ))}
      </View>
      <View style={styles.divider} />
      <View style={styles.itemColumn}>
        {inventoryItems &&
          inventoryItems2.map((item, index) => (
            <InventoryItem
              canBeDeleted={false}
              key={generateUUID()}
              item={item}
            />
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Theme.colors.darkAccent,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 5,
    minHeight: heightPercentageToPixels(5),
  },
  divider: {
    width: 1,
    backgroundColor: Theme.colors.mainContrast,
  },
  itemColumn: {
    width: "45%",
    maxWidth: "45%",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemName: {
    color: Theme.colors.mainText,
  },
});
