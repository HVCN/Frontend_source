import { createStackNavigator } from "@react-navigation/stack";
import { Theme } from "../helpers";
import { RecipeCategories, Recipes, SingleRecipe } from "../screens/";
import ScreenNames from "../screens/ScreenNames";

const Stack = createStackNavigator();

export const RecipeStack = ({ navigation }: any) => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.Recipes}
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.topBar },
        headerTitleStyle: { color: Theme.colors.mainText },
        animationEnabled: false,
      }}
    >
      <Stack.Screen name={ScreenNames.Recipes} component={Recipes} />
      <Stack.Screen name={ScreenNames.SingleRecipe} component={SingleRecipe} />
      <Stack.Screen
        name={ScreenNames.RecipeCategory}
        component={RecipeCategories}
      />
    </Stack.Navigator>
  );
};
