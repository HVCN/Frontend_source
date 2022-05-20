import React, { useMemo, useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  heightPercentageToPixels,
  Theme,
  widthPercentageToPixels,
} from "../../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBacon,
  faBirthdayCake,
  faFish,
  faLeaf,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Lang from "../../language";
import Category from "./components/Category";
import { CATEGORIES } from "../../constants/index";
import { getAllRecipes } from "../../api/RecipeRequests";
import ScreenNames from "../ScreenNames";
import { RecipeProps } from "../../types";
import Divider from "../../components/Divider";

// TODO FlatList implementation?
// TODO: Implement search functionality

type _RecipeProps = {
  recipe: {
    _id: string;
    title: string;
    ingredients: string[];
    steps: string[];
    tags?: string[];
    uri: string;
    category: number;
  };
  navigation?: any;
  style?: StyleProp<ViewStyle>;
};

export const Recipe = ({ recipe, navigation, style }: _RecipeProps) => {
  return (
    <Pressable
      style={[styles.recipeContainer, style]}
      onPress={() =>
        navigation.navigate(ScreenNames.RecipeTab, {
          screen: ScreenNames.SingleRecipe,
          initial: false,
          params: {
            recipe: {
              name: recipe.title,
              uri: recipe.uri,
              ingredients: recipe.ingredients,
              steps: recipe.steps,
            },
          },
        })
      }
    >
      <Image
        source={{
          uri: recipe.uri,
        }}
        style={{ height: 80, borderRadius: 5 }}
        resizeMode="cover"
      />
      <View
        style={{
          paddingTop: 8,
        }}
      >
        <Divider width={widthPercentageToPixels(22)} opacity={0.5} />
      </View>
      <Text
        numberOfLines={1}
        style={{
          color: Theme.colors.mainText,
          textAlign: "center",
          paddingVertical: 3,
        }}
      >
        {recipe.title}
      </Text>
    </Pressable>
  );
};

export const Recipes = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState<string>("");
  const [meatCategory, setMeatCategory] = useState<RecipeProps[]>([]);
  const [veggieCategory, setVeggieCategory] = useState<RecipeProps[]>([]);
  const [seafoodCategory, setSeadfoodCategory] = useState<RecipeProps[]>([]);
  const [pastryCategory, setPastryCategory] = useState<RecipeProps[]>([]);

  const searchForRecipe = (searchParam: string) => {
    console.log("Searching for:", searchParam);
    setSearchText("");
  };

  const navigateToCategory = (categoryName: string, recipes: RecipeProps[]) => {
    navigation.navigate(ScreenNames.RecipeCategory, {
      category: categoryName,
      recipes: recipes,
    });
  };

  useMemo(async () => {
    const result: RecipeProps[] | null = await getAllRecipes();

    if (result) {
      let meat: RecipeProps[] = [];
      let veggie: RecipeProps[] = [];
      let seafood: RecipeProps[] = [];
      let pastry: RecipeProps[] = [];

      result.reduce((prevValue: any, currValue: any) => {
        if (currValue.category === CATEGORIES.MEAT) {
          meat.push(currValue);
        } else if (currValue.category === CATEGORIES.VEGGIE) {
          veggie.push(currValue);
        } else if (currValue.category === CATEGORIES.SEAFOOD) {
          seafood.push(currValue);
        } else if (currValue.category === CATEGORIES.PASTRY) {
          pastry.push(currValue);
        }

        return prevValue;
      }, []);
      setMeatCategory(meat);
      setVeggieCategory(veggie);
      setSeadfoodCategory(seafood);
      setPastryCategory(pastry);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          style={styles.inputFieldSearch}
          placeholder={Lang.screens.recipes.search}
          onSubmitEditing={() => {
            searchForRecipe(searchText);
          }}
        />
        <Pressable
          style={styles.searchIcon}
          onPress={() => searchForRecipe(searchText)}
        >
          <FontAwesomeIcon
            icon={faSearch}
            size={widthPercentageToPixels(7.5)}
          />
        </Pressable>
      </View>
      <Text
        style={{
          fontSize: widthPercentageToPixels(5.5),
          color: Theme.colors.mainText,
        }}
      >
        {Lang.screens.recipes.categories}
      </Text>
      <ScrollView contentContainerStyle={styles.categoryContainer}>
        <Category
          name={Lang.food.categories.meat}
          icon={
            <FontAwesomeIcon
              icon={faBacon}
              size={widthPercentageToPixels(15)}
              color={Theme.colors.mainContrast}
            />
          }
          onPress={async () => {
            navigateToCategory("meat", meatCategory);
          }}
        />
        <Category
          name={Lang.food.categories.veggie}
          icon={
            <FontAwesomeIcon
              icon={faLeaf}
              size={widthPercentageToPixels(15)}
              color={Theme.colors.green}
            />
          }
          onPress={async () => navigateToCategory("veggie", veggieCategory)}
        />
        <Category
          name={Lang.food.categories.seafood}
          icon={
            <FontAwesomeIcon
              icon={faFish}
              size={widthPercentageToPixels(15)}
              color={Theme.colors.blue}
            />
          }
          onPress={async () => navigateToCategory("seafood", seafoodCategory)}
        />
        <Category
          name={Lang.food.categories.pastry}
          icon={
            <FontAwesomeIcon
              icon={faBirthdayCake}
              size={widthPercentageToPixels(15)}
              color={Theme.colors.brown}
            />
          }
          onPress={async () => navigateToCategory("pastry", pastryCategory)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    backgroundColor: Theme.colors.background,
    paddingTop: Theme.spacing.top,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: widthPercentageToPixels(65),
    height: heightPercentageToPixels(7),
    backgroundColor: Theme.colors.light,
    borderRadius: Theme.inputFields.borderRadius,
    marginVertical: Theme.spacing.top,
  },
  inputFieldSearch: {
    width: widthPercentageToPixels(45),
    paddingLeft: 15,
  },
  searchIcon: {
    alignSelf: "center",
    paddingHorizontal: 15,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: widthPercentageToPixels(85),
    paddingBottom: "20%",
  },
  recipeContainer: {
    borderRadius: 5,
    paddingTop: 3,
    paddingHorizontal: 3,
    overflow: "hidden",
    backgroundColor: Theme.colors.darkAccent,
    width: widthPercentageToPixels(27),
  },
});
