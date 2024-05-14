import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

export default function HomeTab() {
  return (
    <Stack.Navigator >
        <Stack.Screen
        name="MainPage"
        component={Home}
        options={{ title: "Welcome to Wiky And Morty!" }}
      />
    </Stack.Navigator>
  );
}
