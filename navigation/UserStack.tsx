import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStack } from "./MainStack";
import { ShoppingStack } from "./ShoppingStack";
import { InventoryStack } from "./InventoryStack";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { Theme } from "../helpers";
import ScreenNames from "../screens/ScreenNames";
import { ScannerStack } from "./ScannerStack";
import { RecipeStack } from "./RecipeStack";

const Tab = createBottomTabNavigator();

const UserStack = () => {
  // All screens that should be available by clicking on the main screen ONLY belong here
  <MainStack />;
  <InventoryStack />;
  <RecipeStack />;

  // <ShoppingStack />;

  // This is the main navigator. This header should not be visible
  // Bottom nav options
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === ScreenNames.MainTab) {
            iconName = focused ? "home" : "home";
          } else if (route.name === ScreenNames.ShoppingListTab) {
            iconName = focused ? "shopping-basket" : "shopping-basket";
          } else if (route.name === ScreenNames.InventoryTab) {
            iconName = focused ? "clipboard-list" : "clipboard-list";
          } else if (route.name === ScreenNames.ScannerTab) {
            iconName = focused ? "clipboard-list" : "clipboard-list";
            return <AntDesign name="scan1" size={size} color={color} />;
          } else if (route.name === ScreenNames.RecipeTab) {
            iconName = focused ? "utensils" : "utensils";
          }
          return (
            <FontAwesome5
              name={iconName}
              size={route.name === ScreenNames.MainTab ? size + 7 : size}
              color={color}
            />
          );
        },
        tabBarStyle: {
          backgroundColor: Theme.colors.bottomBar,
          borderTopWidth: 0,
          // position: "absolute",
        },
        tabBarActiveTintColor: Theme.colors.mainText,
        tabBarInactiveTintColor: Theme.colors.background,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      })}
      initialRouteName={ScreenNames.MainTab}
    >
      <Tab.Screen
        name={ScreenNames.ShoppingListTab}
        component={ShoppingStack}
      />
      <Tab.Screen name={ScreenNames.RecipeTab} component={RecipeStack} />
      <Tab.Screen name={ScreenNames.MainTab} component={MainStack} />
      <Tab.Screen name={ScreenNames.InventoryTab} component={InventoryStack} />
      <Tab.Screen name={ScreenNames.ScannerTab} component={ScannerStack} />
    </Tab.Navigator>
  );
};

export default UserStack;
