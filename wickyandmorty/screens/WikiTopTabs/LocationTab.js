import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import LocationScreen from "./WikiTopScreen/LocationScreen";
import LocationDetail from "../../components/Card/LocationDetails";
import {StyleSheet} from "react-native";
const Stack = createNativeStackNavigator();
export default function LocationTab() {
    
    return (
      <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerTintColor: '#97CE4C',
        headerTitleAlign:'center',
      }}
      >
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

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#333333',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#97CE4C',
  },
});