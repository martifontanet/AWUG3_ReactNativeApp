import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import CharacterScreen from "./WikiTopScreen/CharacterScreen";
import CharacterDetail from "../../components/Card/CharacterDetails";
import BackButton from "../../components/Basic/BackButton";
const Stack = createNativeStackNavigator();
export default function CharacterTab() {
    
    return (
      <Stack.Navigator >
        <Stack.Screen
        name="CharacterScreen"
        component={CharacterScreen}
        options={{headerShown: false }}
        />
        <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetail}
        options={{
          title : "Character Details",
        }}
        />
      </Stack.Navigator>
    );
}
    