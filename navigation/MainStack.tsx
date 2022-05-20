import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createStackNavigator } from "@react-navigation/stack";
import { Pressable } from "react-native";
import { Theme, widthPercentageToPixels } from "../helpers";
import Lang from "../language";
import {
  Main,
  ExpirationDates,
  Recipes,
  Profile,
  SingleRecipe,
  RecipeCategories,
  WeeklyMenu,
  About,
  ReportProblem,
} from "../screens/index";
import ScreenNames from "../screens/ScreenNames";

const Stack = createStackNavigator();

export const MainStack = ({ navigation }: any) => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.Main}
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.topBar },
        headerTitleStyle: { color: Theme.colors.mainText },
        animationEnabled: false,
      }}
    >
      <Stack.Screen
        name={ScreenNames.Main}
        component={Main}
        options={{
          title: Lang.screens.main.title,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate(ScreenNames.Profile)}
              style={{ paddingHorizontal: "3%" }}
            >
              <FontAwesomeIcon
                icon={faUserCircle} // faUser?
                size={widthPercentageToPixels(8)}
                color="white"
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name={ScreenNames.ExpirationDates}
        component={ExpirationDates}
        options={{ title: Lang.screens.expiration.title }}
      />
      <Stack.Screen
        name={ScreenNames.Recipes}
        component={Recipes}
        options={{ title: Lang.screens.recipes.title }}
      />
      <Stack.Screen
        name={ScreenNames.RecipeCategory}
        component={RecipeCategories}
      />
      <Stack.Screen name={ScreenNames.SingleRecipe} component={SingleRecipe} />
      <Stack.Screen
        name={ScreenNames.Profile}
        component={Profile}
        options={{ title: Lang.screens.profile.title }}
      />
      <Stack.Screen
        name={ScreenNames.WeeklyMenu}
        component={WeeklyMenu}
        options={{ title: Lang.screens.weeklyMenu.title }}
      />
      <Stack.Screen
        name={ScreenNames.About}
        component={About}
        options={{ title: Lang.screens.about.title }}
      />
      <Stack.Screen
        name={ScreenNames.ReportProblem}
        component={ReportProblem}
        options={{ title: Lang.screens.reportProblem.title }}
      />
    </Stack.Navigator>
  );
};
