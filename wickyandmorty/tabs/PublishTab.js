import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Publish from "../screens/Publish";
import UserAuth from "../screens/UserAuth";
import { useUserInfo } from "../utils/userContext";

const Stack = createNativeStackNavigator();


export default function HomeTab() {
  const { session } = useUserInfo();
  return (
      <Stack.Navigator >
        <Stack.Screen
        name="Publish"
        component={ session ? Publish : UserAuth}
        options={{ title: "Publicar nuevo Post" }}
      />
      </Stack.Navigator>
  );
}
