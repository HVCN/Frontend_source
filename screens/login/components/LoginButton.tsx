import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import {
  widthPercentageToPixels,
  heightPercentageToPixels,
  Theme,
} from "../../../helpers/index";
import Lang from "../../../language";

type ButtonProps = {
  onPress: any;
};

export const LoginButton = ({ onPress }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{Lang.components.signIn}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: widthPercentageToPixels(40),
    borderRadius: 10,
    borderColor: Theme.colors.borderColor,
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
});
