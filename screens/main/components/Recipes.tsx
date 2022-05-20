import { View, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import { Theme } from "../../../helpers";
import { useNavigation } from "@react-navigation/native";
import { compareRecipeUser } from "../../../api/RecipeRequests";
import { getAuth } from "firebase/auth";
import { RecipeProps } from "../../../types";
import { Recipe } from "../../recipes/Recipes";

export const SuggestedRecipes = () => {
  const [displayedRecipes, setDisplayedRecipes] = useState<RecipeProps[]>([]);
  const navigation = useNavigation();
  const { currentUser } = getAuth();

  useMemo(async () => {
    const result = await compareRecipeUser(currentUser?.uid, 3);

    if (result) {
      setDisplayedRecipes(result);
    }
  }, []);

  return (
    <View style={styles.container}>
      {displayedRecipes.map((_recipe, index) => {
        return <Recipe key={index} recipe={_recipe} navigation={navigation} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1,
  },
});
