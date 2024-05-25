import "react-native-url-polyfill/auto";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabIcon from "../components/Basic/TabIcons";
import HomeTab from "../tabs/HomeTab";
import WikiTab from "../tabs/WikiTab";
import PublishTab from "../tabs/PublishTab";
import { PostsProvider } from './postContext';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
        <NavigationContainer>
          <PostsProvider>
            <Tab.Navigator 
              screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: { fontSize: 14, },
                tabBarInactiveTintColor: "white",
                tabBarActiveTintColor: "#97CE4C",
                headerShown: false,
              }}
            >
              <Tab.Screen
                name="HomeTab"
                component={HomeTab }
                options={{
                  headerShown: false,
                  headerTitle: false,
                  tabBarIcon: ({ focused }) => (
                    <TabIcon  name="home" focused={focused} tab={true} />
                  ),
                  title: ''
                }}
              />
              <Tab.Screen
                name="PublishTab"
                component={PublishTab}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <TabIcon name="add-circle" focused={focused} tab={true} />
                  ),
                  title: ``
                }}
              />
              <Tab.Screen
                name="WikiTab"
                component={WikiTab}
                options={{
                  
                  tabBarIcon: ({ focused }) => (
                    <TabIcon name="planet" focused={focused} tab={true} />
                  ),
                  title: ''
                }}
              />
            </Tab.Navigator>
          </PostsProvider>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flex: 1,
    backgroundColor: "black",
    maxHeight: 110,
  },
});
