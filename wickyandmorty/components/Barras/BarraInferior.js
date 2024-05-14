import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import TabIcon from "../Basic/TabIcons";
import HomeTab from "../../tabs/HomeTab";
import WikiTab from "../../tabs/WikiTab";
import PublishTab from "../../tabs/PublishTab";

const Tab = createBottomTabNavigator();

export default function MenuInferior({  }) {

  return (
    <NavigationContainer>
        <Tab.Navigator 
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: { fontSize: 34, },
            tabBarInactiveTintColor: "white",
            tabBarActiveTintColor: "#97CE4C",
          }}
        >
          <Tab.Screen
            name="HomeTab"
            component={HomeTab}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon  name="home" focused={focused} />
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
                <TabIcon name="add-circle" focused={focused} />
              ),
              title: ``
            }}
          />
          <Tab.Screen
            name="WikiYab"
            component={WikiTab}
            options={{
              
              tabBarIcon: ({ focused }) => (
                <TabIcon name="planet" focused={focused} />
              ),
              title: ''
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "flex-end"
  },
});
