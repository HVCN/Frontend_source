import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  heightPercentageToPixels,
  Theme,
  weekDayLocalization,
  widthPercentageToPixels,
} from "../../../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import Divider from "../../../components/Divider";
import ScreenNames from "../../ScreenNames";
import { getWeeklyMenu } from "../../../api/WeeklyMenuRequests";
import { getAuth } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import { WeekDayRecipe } from "../../../types";

// type WeeklyMenuDaysProps = {
//   id: string;
//   weekDay: number;
// };
// type WeeklyRecipeProps = {
//   _id: string;
//   title: string;
//   category: number;
//   uri: string;
//   ingredients: string[];
//   steps: string[];
//   weekDay: number;
// };
type WeeklyProps = {
  navigation: any;
};
type WeekdayProps = {
  navigation?: any;
  recipe: WeekDayRecipe;
};

export const Menu = ({ navigation }: WeeklyProps) => {
  const [weeklyMenu, setWeeklyMenu] = useState<WeekDayRecipe[]>([]);

  const { currentUser } = getAuth();

  // navigation.navigate(ScreenNames.WeeklyMenu)
  const Weekday = ({ navigation, recipe }: WeekdayProps) => {
    // console.log(recipe.title);
    return (
      <View style={styles.weekdayContainer} key={recipe.weekday}>
        <Pressable
          onPress={() =>
            recipe._id &&
            navigation.navigate(ScreenNames.SingleRecipe, {
              recipe: {
                name: recipe.title,
                uri: recipe.uri,
                ingredients: recipe.ingredients,
                steps: recipe.steps,
              },
            })
          }
        >
          <Image
            source={{
              uri: recipe.uri,
            }}
            style={{
              height: widthPercentageToPixels(20),
              width: widthPercentageToPixels(25),
              marginBottom: "7%",
            }}
            borderRadius={5}
            resizeMode="cover"
          />

          <View style={styles.weekdayFooter}>
            <Divider width={widthPercentageToPixels(20)} opacity={0.7} />
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <FontAwesomeIcon
                icon={faSeedling}
                size={20}
                style={styles.weekdayIcon}
              />
              <Text style={styles.weekdayName}>
                {weekDayLocalization(recipe.weekday)}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      (async () => {
        const results = await getWeeklyMenu(currentUser?.uid);

        if (results && results !== 204) {
          setWeeklyMenu(results);
        }
      })();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const renderItem = (item: WeekDayRecipe) => {
    return <Weekday navigation={navigation} recipe={item} />;
  };

  return weeklyMenu.length > 0 ? (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator
      persistentScrollbar
      data={weeklyMenu}
      renderItem={(e) => renderItem(e.item)}
      keyExtractor={(item) => item.weekday.toString()}
      style={styles.flatlist}
      ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
    />
  ) : (
    <View
      style={{
        borderRadius: 5,
        backgroundColor: Theme.colors.darkAccent,
        // width: "100%",
        height: heightPercentageToPixels(5),
      }}
    ></View>
  );
};

const styles = StyleSheet.create({
  weekdayContainer: {
    borderRadius: 5,
    width: widthPercentageToPixels(26),
    alignItems: "center",
  },
  weekdayName: { color: Theme.colors.mainText },
  weekdayIcon: { marginRight: 5, color: Theme.colors.green },
  weekdayFooter: {
    alignItems: "center",
  },
  flatlist: {
    padding: 2,
    borderRadius: 5,
    paddingBottom: 5,
    backgroundColor: Theme.colors.darkAccent,
  },
  listItemSeparator: {
    width: "1.5%",
  },
});
