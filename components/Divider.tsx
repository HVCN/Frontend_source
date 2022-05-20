import React from "react";
import { View, StyleSheet } from "react-native";
import { Theme } from "../helpers";

type Props = {
  width: number;
  opacity?: number;
  color?: string;
  marginBottom?: number;
  marginTop?: number;
};

export default function Divider({
  width,
  opacity,
  color,
  marginBottom,
  marginTop,
}: Props) {
  return (
    <View
      style={[
        styles.divider,
        {
          width: width,
          opacity: opacity && opacity,
          borderBottomColor: color ?? Theme.colors.mainContrast,
          marginBottom: marginBottom,
          marginTop: marginTop,
        },
      ]}
    ></View>
  );
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    alignSelf: "center",
  },
});
