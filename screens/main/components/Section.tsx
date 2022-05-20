import {
  View,
  Text,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import { SectionTitle } from "./SectionTitle";
import { Theme, widthPercentageToPixels } from "../../../helpers";

type SectionProps = {
  title: string;
  redirect?: string;
  redirectOnPress?: (event: GestureResponderEvent) => void;
  width?: number;
  height?: number;
  children: React.ReactNode;
};

export const Section = ({
  title,
  redirect,
  redirectOnPress,
  width,
  height,
  children,
}: SectionProps) => {
  return (
    <View style={styles.sectionContainer}>
      <SectionTitle title={title} onPress={redirectOnPress} />
      {children}
      {redirect && (
        <Pressable onPress={redirectOnPress}>
          <Text style={styles.more}>{redirect}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    width: widthPercentageToPixels(90),
    marginVertical: "3%",
  },
  more: {
    color: Theme.colors.mainContrast,
    marginVertical: "1%",
    fontSize: widthPercentageToPixels(4),
  },
});
