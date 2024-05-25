import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import EpisodeScreen from "./WikiTopScreen/EpisodeScreen";
import EpisodeDetail from "../../components/Card/EpisodeDetails";
import {StyleSheet} from "react-native";
const Stack = createNativeStackNavigator();
export default function EpisodeTab() {
    
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

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#333333',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#97CE4C',
  },
});