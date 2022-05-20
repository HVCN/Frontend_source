import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import {
  widthPercentageToPixels,
  heightPercentageToPixels,
  Theme,
} from "../../../helpers/index";

type ButtonProps = {
  onPress: any;
  disabled: boolean;
  value: string;
};

export const BottomSheetButton = ({
  onPress,
  disabled,
  value,
}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={styles.button}>
      <Text style={styles.text}>{value}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: widthPercentageToPixels(60),
    borderRadius: 10,
    borderColor: Theme.colors.mainText,
    marginVertical: heightPercentageToPixels(2),
    height: heightPercentageToPixels(6),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.darkAccent,
  },
  text: {
    color: Theme.colors.mainContrast,
    fontSize: widthPercentageToPixels(5),
  },
  disabled: {
    color: "grey",
    fontSize: widthPercentageToPixels(4),
  },
});
