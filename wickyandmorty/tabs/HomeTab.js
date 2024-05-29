import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import UserAuth from "../screens/UserAuth";
import { useUserInfo } from "../utils/userContext";
import UserProfile from "../screens/UserProfile";
import HomeSearch from "../screens/HomeSearch";
import PostDetailScreen from "../screens/PostDetail";
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
        name="MainPage"
        component={session ? Home : UserAuth}
        options={{ title: "Welcome to Wicky And Morty!" }}
      />
      <Stack.Screen
        name="UserProfile"
        component={session ? UserProfile : UserAuth}
        options={{ title: "User Profile" }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={session ? HomeSearch : UserAuth}
        options={{ title: "Search" }}
      />
      <Stack.Screen
        name="PostDetailScreen"
        component={session ? PostDetailScreen : UserAuth}
        options={{ title: "Post Detail" }}
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