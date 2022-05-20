import React from "react";
import { Text, StyleSheet } from "react-native";
import { widthPercentageToPixels, Theme } from "../../../helpers/index";
import Lang from "../../../language";

type ButtonProps = {
  onPress: any;
};

export const SignUpButton = ({ onPress }: ButtonProps) => {
  return (
    <Text style={styles.text}>
      {Lang.screens.login.noAccount1}
      <Text onPress={onPress} style={{ color: Theme.colors.mainContrast }}>
        {Lang.screens.login.noAccount2}
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Theme.colors.mainText,
    fontSize: widthPercentageToPixels(4),
  },
});
