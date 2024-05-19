import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Wiki from "../screens/Wiki";
import UserAuth from "../screens/UserAuth";
import { useUserInfo } from "../utils/userContext";

const Stack = createNativeStackNavigator();

export default function HomeTab() {
  const { session } = useUserInfo();
  return (
    <Stack.Navigator>
        <Stack.Screen
        name="Wiki"
        component={session ? Wiki : UserAuth}
        options={{ title: "Wiki Explorer" }}
        />
        {/* <Stack.Screen
        name="Detail"
        component={CharacterDetail}
        options={{ title: "Details" }}
        /> */}
    </Stack.Navigator>
  );
}
