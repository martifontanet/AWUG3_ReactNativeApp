import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Publish from "../screens/Publish";

const Stack = createNativeStackNavigator();

export default function HomeTab() {
  return (
    <Stack.Navigator >
        <Stack.Screen
        name="Publish"
        component={Publish}
        options={{ title: "Publicar nuevo Post" }}
      />
    </Stack.Navigator>
  );
}
