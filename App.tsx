import { SafeAreaProvider } from "react-native-safe-area-context";
import "./config/firebase";
import RootNavigation from "./navigation";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { LogBox } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

LogBox.ignoreLogs([
  "[react-native-gesture-handler]",
  "Setting a timer for a long period",
]);

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer theme={DarkTheme}>
          <RootNavigation />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
