import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import EpisodeScreen from "./WikiTopScreen/EpisodeScreen";
import EpisodeDetail from "../../components/Card/EpisodeDetails";
const Stack = createNativeStackNavigator();
export default function EpisodeTab() {
    
    return (
      <Stack.Navigator >
        <Stack.Screen
        name="EpisodeScreen"
        component={EpisodeScreen}
        options={{ headerShown: false}}
        />
        <Stack.Screen
        name="EpisodeDetail"
        component={EpisodeDetail}
        options={{
          title : "Episode Details",
        }}
        />

    </Stack.Navigator>
    );
}