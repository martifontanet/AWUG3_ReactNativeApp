import "react-native-url-polyfill/auto";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider, useUserInfo } from "./utils/userContext";
import UserAuth from "./screens/UserAuth";
import Navigation from "./utils/Navigation";
import { useEffect, useState } from "react";
import useThemeColors from "./Hooks/useThemeColor";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

export default function App() {
  
const themeColors = useThemeColors();
const styles = getThemedStylesheet(themeColors)

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

function getThemedStylesheet(colors) {
  return StyleSheet.create({
    tabBar: {
      backgroundColor: colors.surface
    }
  });
}

