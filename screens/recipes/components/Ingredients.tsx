import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Theme, widthPercentageToPixels } from "../../../helpers";
import Lang from "../../../language";
import { IngredientsType } from "../../../types";

const Ingredients = ({ data }: IngredientsType) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{Lang.screens.recipes.ingredients}</Text>
      <View style={styles.ingredients}>
        <ScrollView
          style={styles.ingredientColumn}
          horizontal={true}
          persistentScrollbar
        >
          <View>
            {data.map((ing: string, index: number) => {
              if (index % 2 == 0) {
                return (
                  <Text key={index} style={{ color: "white" }}>
                    {ing}
                  </Text>
                );
              }
            })}
          </View>
        </ScrollView>
        <View style={styles.divider} />

        <ScrollView
          style={styles.ingredientColumn}
          horizontal={true}
          persistentScrollbar
        >
          <View>
            {data.map((ing: string, index: number) => {
              if (index % 2 !== 0) {
                return (
                  <Text key={index} style={{ color: "white" }}>
                    {ing}
                  </Text>
                );
              }
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Ingredients;

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToPixels(90),
    minHeight: "20%",
    backgroundColor: Theme.colors.darkAccent,
    paddingBottom: "2%",
    borderRadius: 10,
    alignItems: "center",
  },
  headerText: {
    color: Theme.colors.mainContrast,
    fontSize: widthPercentageToPixels(5),
    marginVertical: "2%",
  },
  ingredients: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
  ingredientColumn: {
    paddingBottom: "3%",
    width: "50%",
  },
  divider: {
    width: 1,
    backgroundColor: Theme.colors.mainContrast,
    marginHorizontal: "2%",
  },
});
