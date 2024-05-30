import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Publish from "../screens/Publish";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

export default function HomeTab() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerTintColor: "#97CE4C",
      headerTitleAlign: "center",
    }}
    >
      <Stack.Screen
        name="Publish"
        component={Publish}
        options={{ title: "New Post" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#333333",
  },
  headerTitleStyle: {
    fontWeight: "bold",
    color: "#97CE4C",
  },
});
