import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/login/Login";
import SignUp from "../screens/signup/SignUp";
import Lang from "../language";
import ScreenNames from "../screens/ScreenNames";

const LoginStack = createStackNavigator();

export default function AuthStack() {
  return (
    <LoginStack.Navigator
      initialRouteName={ScreenNames.Main}
      screenOptions={{
        animationEnabled: false,
      }}
    >
      <LoginStack.Screen
        name={ScreenNames.Login}
        component={Login}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen
        name={ScreenNames.SignUp}
        component={SignUp}
        options={{ title: Lang.screens.signUp.title }}
      />
    </LoginStack.Navigator>
  );
}
