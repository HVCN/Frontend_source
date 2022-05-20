import {
  faCheck,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FadeInView } from "../../../components";
import {
  heightPercentageToPixels,
  Theme,
  widthPercentageToPixels,
} from "../../../helpers";

type Props = {
  text: string;
  onPress: any;
};

// TODO implement an object structure to the list items. needs to keep track of the list items' statuses

export const ListItem = ({ text, onPress }: Props) => {
  const [active, setActive] = useState(true);

  return (
    <FadeInView>
      <View style={styles.wrapper}>
        <Pressable
          style={[
            styles.container,
            !active && { backgroundColor: Theme.colors.mainContrast },
          ]}
          hitSlop={8}
          onPress={() => {
            setActive(!active);
          }}
        >
          <Text
            style={[
              styles.itemName,
              !active && { color: Theme.colors.mainText },
            ]}
            numberOfLines={1}
          >
            {text}
          </Text>
          <FontAwesomeIcon
            icon={active ? faCheck : faTimes}
            size={widthPercentageToPixels(5)}
          />
        </Pressable>
        {active && (
          <Pressable style={styles.delete} onPress={onPress}>
            <FontAwesomeIcon
              icon={faTrashAlt}
              size={widthPercentageToPixels(5)}
              color={Theme.colors.mainText}
            />
          </Pressable>
        )}
      </View>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginVertical: heightPercentageToPixels(0.5),
  },
  container: {
    paddingVertical: heightPercentageToPixels(1),
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: Theme.colors.light,
    paddingRight: 10,
    flex: 1,
  },
  delete: {
    alignSelf: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
  itemName: {
    maxWidth: "80%",
    paddingLeft: 15,
    color: "black",
    fontSize: widthPercentageToPixels(4),
  },
});
