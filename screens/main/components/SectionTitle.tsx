import {
  Text,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import { Theme, widthPercentageToPixels } from "../../../helpers";

type SectionProps = {
  title: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export const SectionTitle = ({ title, onPress }: SectionProps) => {
  return (
    <Pressable
      onPress={onPress ?? (() => console.log("No onpress: " + title))}
      style={styles.container}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: "1.5%",
  },
  title: {
    color: Theme.colors.mainContrast,
    fontSize: widthPercentageToPixels(6),
  },
});
