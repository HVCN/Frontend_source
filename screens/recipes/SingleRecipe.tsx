import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { Theme, widthPercentageToPixels } from "../../helpers";
import Ingredients from "./components/Ingredients";
import Lang from "../../language";
import RateRecipe from "./components/RateRecipe";

export const SingleRecipe = ({ route, navigation }: any) => {
  const [showSteps, setShowSteps] = useState(false);
  const [title, setTitle] = useState<string>(route.params.recipe.name);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [title]);

  return (
    <View style={styles.container}>
      <Image
        source={
          route.params.recipe.uri
            ? { uri: route.params.recipe.uri }
            : require("../../assets/images/single_recipe_header_placeholder.png")
        }
        style={styles.image}
        resizeMode="cover"
      />
      <View style={{ flexGrow: 1 }}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.approachButton}
            onPress={() => setShowSteps(!showSteps)}
          >
            <Text
              style={[
                styles.approachButtonText,
                !showSteps && { color: Theme.colors.mainContrast },
              ]}
            >
              {Lang.screens.recipes.ingredients}
            </Text>
          </Pressable>
          <Pressable
            style={styles.approachButton}
            onPress={() => setShowSteps(!showSteps)}
          >
            <Text
              style={[
                styles.approachButtonText,
                showSteps && { color: Theme.colors.mainContrast },
              ]}
            >
              {Lang.screens.recipes.howTo}
            </Text>
          </Pressable>
        </View>

        {!showSteps ? (
          <Ingredients data={route.params.recipe.ingredients} />
        ) : (
          <View style={styles.approachContainer}>
            <ScrollView
              persistentScrollbar
              contentContainerStyle={styles.approachScrollView}
            >
              {route.params.recipe.steps ? (
                route.params.recipe.steps.map((step: string, index: number) => (
                  <Text key={index} style={styles.approachText}>
                    {index + 1 + ". "}
                    {step}
                  </Text>
                ))
              ) : (
                <Text
                  style={{
                    fontSize: widthPercentageToPixels(5),
                    color: Theme.colors.mainText,
                    textAlign: "center",
                  }}
                >
                  {Lang.screens.recipes.missingSteps}
                </Text>
              )}
            </ScrollView>
          </View>
        )}

        {!showSteps && (
          <View
            style={{
              bottom: 0,
              position: "absolute",
              alignSelf: "center",
            }}
          >
            <RateRecipe />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Theme.colors.background,
    alignItems: "center",
  },
  image: {
    height: "30%",
    width: "100%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  approachButton: {
    padding: "3%",
    backgroundColor: Theme.colors.darkAccent,
    borderRadius: 10,
    alignSelf: "center",
    minWidth: widthPercentageToPixels(30),
  },
  approachButtonText: {
    color: Theme.colors.mainText,
    textAlign: "center",
  },
  approachContainer: {
    width: "90%",
    maxHeight: "70%",
  },
  approachText: {
    color: Theme.colors.mainText,
    marginBottom: "3%",
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: "3%",
    width: widthPercentageToPixels(70),
    justifyContent: "space-around",
  },
  approachScrollView: {
    backgroundColor: Theme.colors.darkAccent,
    padding: 10,
    borderRadius: 10,
    width: widthPercentageToPixels(90),
  },
});
