import { createStackNavigator } from "@react-navigation/stack";
import { Theme } from "../helpers";
import Lang from "../language";
import { ShoppingList, SingleList } from "../screens/";
import ScreenNames from "../screens/ScreenNames";

const Stack = createStackNavigator();

export const ShoppingStack = ({ navigation }: any) => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.ShoppingList}
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.topBar },
        headerTitleStyle: { color: Theme.colors.mainText },
        animationEnabled: false,
      }}
    >
      <Stack.Screen
        name={ScreenNames.ShoppingList}
        component={ShoppingList}
        options={{
          title: Lang.screens.shoppingList.title,
        }}
      />
      <Stack.Screen
        name={ScreenNames.SingleList}
        component={SingleList}
        options={{ title: Lang.screens.shoppingList.nestedTitle }}
      />
    </Stack.Navigator>
  );
};
