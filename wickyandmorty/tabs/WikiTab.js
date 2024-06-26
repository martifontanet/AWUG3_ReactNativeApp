import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Wiki from "../screens/Wiki";

const Stack = createNativeStackNavigator();

export default function HomeTab() {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name="Wiki"
        component={Wiki}
        options={{ title: "Wiki Explorer" }}
      />
    </Stack.Navigator>
  );
}
