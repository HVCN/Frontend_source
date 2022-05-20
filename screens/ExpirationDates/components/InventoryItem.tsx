import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { formatDistanceToNowStrict } from "date-fns";
import { enUS, nb } from "date-fns/locale";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { InventoryTypings } from "../../../constants/inventory";
import { Theme } from "../../../helpers";
import {
  formatExpirationString,
  getColorBasedOnExpiration,
  getExpirationDays,
} from "../../../helpers/ExpirationDate";
import { isEN } from "../../../language/Lang";
import { Item } from "../../../types";
import { RemoveModal } from "./RemoveModal";

// general item component.
export const InventoryItem = ({
  item,
  canBeDeleted,
  reRender,
  dispatch,
  type,
}: Item) => {
  const [modalVisible, setModalVisible] = useState(false);

  let expDays = getExpirationDays(item.expirationDate);

  let displayLocale = isEN ? enUS : nb;

  return (
    <View style={[styles.itemContainer, canBeDeleted && { padding: 7 }]}>
      {canBeDeleted ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{ paddingHorizontal: 10 }}
          >
            <FontAwesomeIcon
              size={20}
              style={{ color: Theme.colors.mainContrast }}
              icon={faTrashAlt}
            />
          </Pressable>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemName}>
            {item.itemName}
          </Text>
          {type && (
            <RemoveModal
              state={[modalVisible, setModalVisible]}
              item={item}
              type={type}
              dispatch={dispatch}
              reRender={reRender}
            />
          )}
        </View>
      ) : (
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemName}>
          {item.itemName}
        </Text>
      )}

      <Text
        style={{
          color: getColorBasedOnExpiration(expDays),
          alignSelf: "center",
        }}
      >
        {expDays <= 0 ? "- " : ""}
        {formatExpirationString(
          formatDistanceToNowStrict(new Date(item.expirationDate), {
            locale: displayLocale,
          })
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Theme.colors.screenBackgroundContrast,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 5,
  },
  divider: {
    width: 1,
    backgroundColor: Theme.colors.tomato,
  },
  itemColumn: {
    width: "45%",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemName: {
    color: "white",
    width: "55%",
  },
});
