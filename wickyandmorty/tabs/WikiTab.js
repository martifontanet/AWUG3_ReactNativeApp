import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Wiki from "../screens/Wiki";
import CharacterDetail from "../components/Card/CharacterDetails";

const Stack = createNativeStackNavigator();

export default function HomeTab() {
  return (
    <Stack.Navigator>
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
