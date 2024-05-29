import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Publish from "../screens/Publish";
import UserAuth from "../screens/UserAuth";
import { useUserInfo } from "../utils/userContext";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();


export default function HomeTab() {
  const { session } = useUserInfo();
  return (
      <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerTitleAlign:'center',
      }}
      >
        <Stack.Screen
        name="Publish"
        component={ session ? Publish : UserAuth}
        options={{ title: "New Post"
        }}
      />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#97CE4C',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#000000',
  },
});