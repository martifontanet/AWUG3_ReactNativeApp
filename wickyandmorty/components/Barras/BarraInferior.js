import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
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
            tabBarLabelStyle: { fontSize: 14 },
            tabBarInactiveTintColor: "grey",
            tabBarActiveTintColor: "blue",
          }}
        >
          <Tab.Screen
            name="HomeTab"
            component={HomeTab}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon name="home" focused={focused} />
              ),
              title: 'Home'
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
              title: `Create Post ()`
            }}
          />
          <Tab.Screen
            name="WikiYab"
            component={WikiTab}
            options={{
              
              tabBarIcon: ({ focused }) => (
                <TabIcon name="planet" focused={focused} />
              ),
              title: 'Wiki'
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
