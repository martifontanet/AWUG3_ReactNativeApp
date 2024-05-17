import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import LocationScreen from "./WikiTopScreen/LocationScreen";
import LocationDetail from "../../components/Card/LocationDetails";
const Stack = createNativeStackNavigator();
export default function LocationTab() {
    
    return (
      <Stack.Navigator >
        <Stack.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name="LocationDetail"
        component={LocationDetail}
        options={{
          title : "Location Details",
        }}
        />
    </Stack.Navigator>
    );
}