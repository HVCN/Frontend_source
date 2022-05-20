import { createStackNavigator } from "@react-navigation/stack";
import { Theme } from "../helpers";
import Lang from "../language";
import { Inventory } from "../screens/";
import { SpecificInventory } from "../screens/Inventory/SpecificInventory";
import { CompleteInventory } from "../screens/Inventory/CompleteInventory";
import ScreenNames from "../screens/ScreenNames";

const Stack = createStackNavigator();

export const InventoryStack = ({ navigation }: any) => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.Inventory}
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.topBar },
        headerTitleStyle: { color: Theme.colors.mainText },
        animationEnabled: false,
      }}
    >
      <Stack.Screen
        name={ScreenNames.Inventory}
        component={Inventory}
        options={{
          // headerLeft: () => null,
          title: Lang.screens.inventory.title,
        }}
      />
      <Stack.Screen
        name={ScreenNames.SpecificInventory}
        component={SpecificInventory}
      />
      <Stack.Screen
        name={ScreenNames.CompleteInventory}
        component={CompleteInventory}
      />
    </Stack.Navigator>
  );
};
