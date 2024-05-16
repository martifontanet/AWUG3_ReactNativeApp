import {
  FlatList,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CharacterTab from "./WikiTopTabs/CharacterTab";
import EpisodeTab from "./WikiTopTabs/EpisodeTab";
import LocationTab from "./WikiTopTabs/LocationTab";

const Tab = createMaterialTopTabNavigator();
  
export default function Wiki() { 

  return (
      <NavigationContainer independent={true} >
        <Tab.Navigator
          screenOptions={{
            tabBarStyle : styles.topBar,
            tabBarLabelStyle: { fontSize: 12,},
            tabBarInactiveTintColor : "white",
            tabBarActiveTintColor: "#97CE4C",
          }}
        >
          <Tab.Screen name="Characters" component={CharacterTab} />
          <Tab.Screen name="Episodes" component={EpisodeTab} />
          <Tab.Screen name="Locations" component={LocationTab} />
        </Tab.Navigator>

    </NavigationContainer>
    );
  }
  
  const styles = StyleSheet.create({
    topBar: {
      flex: 1,
      backgroundColor: "#333333",
      maxHeight: 50,
    }
  });
  