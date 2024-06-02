import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Wiki from "../screens/Wiki";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

export default function WikiTab() {
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
        name="Wiki"
        component={Wiki}
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

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#333333",
  },
  headerTitleStyle: {
    fontWeight: "bold",
    color: "#97CE4C",
  },
});