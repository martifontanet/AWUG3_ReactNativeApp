import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CharacterScreen from "./WikiTopScreen/CharacterScreen";
import CharacterDetail from "../../components/Card/CharacterDetails";
import { StyleSheet } from "react-native";
const Stack = createNativeStackNavigator();
export default function CharacterTab() {
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
        name="CharacterScreen"
        component={CharacterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetail}
        options={{
          title: "Character Details",
        }}
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
