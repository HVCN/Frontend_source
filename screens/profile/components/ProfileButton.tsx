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
  backgroundColor: string;
};

export const ProfileButton = ({
  onPress,
  disabled,
  value,
  backgroundColor,
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, { backgroundColor }]}
    >
      <Text style={[disabled ? styles.disabled : styles.text]}>{value}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: widthPercentageToPixels(50),
    borderRadius: Theme.buttons.borderRadius,
    borderColor: Theme.colors.mainText,
    marginVertical: heightPercentageToPixels(2),
    height: heightPercentageToPixels(5),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.darkAccent,
  },
  text: {
    color: Theme.colors.mainContrast,
    fontSize: widthPercentageToPixels(4),
  },
  disabled: {
    color: "grey",
    fontSize: widthPercentageToPixels(4),
  },
});
