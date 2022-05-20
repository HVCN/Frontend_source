import { createStackNavigator } from "@react-navigation/stack";
import { Theme } from "../helpers";
import Lang from "../language";
import { ReceiptScanner } from "../screens/";
import ScreenNames from "../screens/ScreenNames";

const Stack = createStackNavigator();

export const ScannerStack = ({ navigation }: any) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.topBar },
        headerTitleStyle: { color: Theme.colors.mainText },
        animationEnabled: false,
      }}
    >
      <Stack.Screen
        name={ScreenNames.ReceiptScanner}
        component={ReceiptScanner}
        options={{ title: Lang.screens.receiptScanner.title }}
      />
    </Stack.Navigator>
  );
};
