import React, { ReactElement } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Divider from "../../../components/Divider";
import { Theme, widthPercentageToPixels } from "../../../helpers";
import { CategoryProps } from "../../../types";

const Category = ({ name, icon, onPress }: CategoryProps) => {
  return (
    <View>
      <Pressable onPress={onPress} style={styles.container}>
        <View
          style={{
            width: widthPercentageToPixels(40),
            alignItems: "center",
          }}
        >
          <Text style={styles.category}>{name}</Text>
          <Divider width={widthPercentageToPixels(20)} opacity={0.4} />
        </View>
        <View style={styles.icon}>{icon}</View>
      </Pressable>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToPixels(40),
    aspectRatio: 1.2,
    borderRadius: 5,
    marginVertical: "5%",
    alignItems: "center",
    backgroundColor: Theme.colors.darkAccent,

    // android boxShadow
    elevation: 2,
    // ios boxShadow
    shadowColor: Theme.colors.light,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    // ios boxShadow
  },
  category: {
    paddingVertical: 10,
    color: Theme.colors.mainText,
  },
  icon: {
    flex: 1,
    justifyContent: "center",
  },
});
