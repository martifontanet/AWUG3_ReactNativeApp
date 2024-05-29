import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import UserAuth from "../screens/UserAuth";
import UserProfile from "../screens/UserProfile";
import HomeSearch from "../screens/HomeSearch";
import PostDetailScreen from "../screens/PostDetail";
import UsersProfiles from "../screens/UsersProfiles";

const Stack = createNativeStackNavigator();

export default function HomeTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainPage"
        component={Home}
        options={{ title: "Welcome to Wiky And Morty!" }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ title: "User Profile" }}
      />
      <Stack.Screen
        name="UsersProfiles"
        component={UsersProfiles}
        options={{ title: "User Profile" }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={HomeSearch}
        options={{ title: "Search" }}
      />
      <Stack.Screen
        name="PostDetailScreen"
        component={PostDetailScreen}
        options={{ title: "Post Detail" }}
      />
    </Stack.Navigator>
  );
}
