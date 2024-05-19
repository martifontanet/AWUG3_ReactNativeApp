import "react-native-url-polyfill/auto";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabIcon from "./components/Basic/TabIcons";
import HomeTab from "./tabs/HomeTab";
import WikiTab from "./tabs/WikiTab";
import PublishTab from "./tabs/PublishTab";
import { AuthProvider, useUserInfo } from "./utils/userContext";
import UserAuth from "./screens/UserAuth";
import Navigation from "./utils/Navigation";
import { useEffect, useState } from "react";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

function Main() {
  const { session } = useUserInfo();
  const [isSessionActive, setIsSessionActive] = useState(session);

  useEffect(() => {
    setIsSessionActive(session);
  }, [session]);

  return isSessionActive ? <Navigation /> : <UserAuth />;
}

const styles = StyleSheet.create({
  tabBar: {
    flex: 1,
    backgroundColor: "black",
    maxHeight: 110,
  },
});
