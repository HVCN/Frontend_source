import React, { useState, useLayoutEffect } from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import {
  heightPercentageToPixels,
  Theme,
  widthPercentageToPixels,
} from "../../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Lang from "../../language";
import { FlatList } from "react-native-gesture-handler";
import { RecipeProps } from "../../types";
import { Recipe } from "./Recipes";

// TODO FlatList implementation?
// TODO: finish the search functionality and display suggested recipes

export const RecipeCategories = ({ route, navigation }: any) => {
  const [searchText, setSearchText] = useState<string>("");
  const [title, setTitle] = useState<string>(route.params.category);

  const recipes: RecipeProps[] = route.params.recipes;

  const categoryName = () => {
    if (title === "meat") return Lang.food.categories.meat;
    if (title === "veggie") return Lang.food.categories.veggie;
    if (title === "seafood") return Lang.food.categories.seafood;
    if (title === "pastry") return Lang.food.categories.pastry;
  };

  const searchForRecipe = (searchParam: string) => {
    console.log("Searching for:", searchParam);
    setSearchText("");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title ? categoryName() : Lang.screens.recipes.categories,
    });
  }, [title]);

  return (
    <View style={styles.container}>
      <View style={styles.addItem}>
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          style={styles.inputFieldAdd}
          placeholder={Lang.screens.recipes.search}
          onSubmitEditing={() => {
            searchForRecipe(searchText);
          }}
        />
        <Pressable
          style={styles.addIcon}
          onPress={() => searchForRecipe(searchText)}
        >
          <FontAwesomeIcon
            icon={faSearch}
            size={widthPercentageToPixels(7.5)}
          />
        </Pressable>
      </View>
      {recipes && (
        <FlatList
          data={recipes}
          showsVerticalScrollIndicator
          numColumns={3}
          renderItem={({ item, index }) => (
            <Recipe key={index} recipe={item} navigation={navigation} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: "4%" }} />}
          keyExtractor={(item, index) => item.title + index}
          contentContainerStyle={styles.categoryContainer}
          style={{
            marginBottom: "3%",
            width: widthPercentageToPixels(85),
          }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.background,
    paddingTop: Theme.spacing.top,
  },
  addItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: widthPercentageToPixels(65),
    height: heightPercentageToPixels(7),
    backgroundColor: Theme.colors.light,
    borderRadius: Theme.inputFields.borderRadius,
    marginVertical: Theme.spacing.top,
  },
  inputFieldAdd: {
    width: widthPercentageToPixels(45),
    paddingLeft: 15,
  },
  addIcon: {
    alignSelf: "center",
    paddingHorizontal: 15,
  },
  categoryContainer: {
    paddingBottom: "15%",
  },
});
