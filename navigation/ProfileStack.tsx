import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../screens/";
import ScreenNames from "../screens/ScreenNames";

const Stack = createStackNavigator();

export const ProfileStack = ({ navigation }: any) => {
  return (
    <Stack.Navigator /* screenOptions={{ headerShown: false }} */>
      <Stack.Screen name={ScreenNames.Profile} component={Profile} />
    </Stack.Navigator>
  );
};
