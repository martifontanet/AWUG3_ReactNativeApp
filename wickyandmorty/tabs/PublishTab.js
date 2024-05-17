import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Publish from "../screens/Publish";
import UserAuth from "../screens/UserAuth";

const Stack = createNativeStackNavigator();

const isAuth = false;

export default function HomeTab() {
  return (
    <Stack.Navigator >
        <Stack.Screen
        name="Publish"
        component={isAuth ? Publish : UserAuth}
        options={{ title: "Publicar nuevo Post" }}
      />
    </Stack.Navigator>
  );
}
