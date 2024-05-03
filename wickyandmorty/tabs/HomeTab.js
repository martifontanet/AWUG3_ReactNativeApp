import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

export default function HomeTab() {
  return (
    <Stack.Navigator >
        <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Feed Posts" }}
      />
    </Stack.Navigator>
  );
}
