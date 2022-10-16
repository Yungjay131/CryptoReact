import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";

import Home from "./screens/Home";
import Onboarding from "./screens/Onboarding";
import Details from "./screens/Details";

const Stack = createStackNavigator();

export default function App() {
  /* fonts and assets to be used in the app */
  const [loaded] = useFonts({
    chivo: require("./assets/fonts/chivo_regular.ttf"),
    lato: require("./assets/fonts/lato_regular.ttf"),
    helvetica: require("./assets/fonts/helvetica_45_light.ttf"),
    source_sans: require("./assets/fonts/source_sans_pro_regular.ttf"),
  });

  if(!loaded)
    return null;
    
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initalRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
