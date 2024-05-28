import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useUserInfo } from "../utils/userContext";
import { supabase } from "../utils/clientSupabase";
import UserForm from "../components/Barras/UserForm";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';

const MyPosts = () => (
  <View style={styles.scene}>
    <Text style={styles.text}>Aquí se mostrarán tus publicaciones</Text>
    {/* Lógica para mostrar las publicaciones del usuario */}
  </View>
);

const SavedPosts = () => (
  <View style={styles.scene}>
    <Text style={styles.text}>Aquí se mostrarán tus posts guardados</Text>
    {/* Lógica para mostrar los posts guardados del usuario */}
  </View>
);

export default function UserProfile() {
  const { profile, loading, saveProfile } = useUserInfo();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'myPosts', title: 'Mis Publicaciones' },
    ...(profile ? [{ key: 'savedPosts', title: 'Posts Guardados' }] : [])
  ];

  const renderScene = SceneMap({
    myPosts: MyPosts,
    savedPosts: SavedPosts,
  });

  return (
    <View style={styles.container}>
      <UserForm
        profile={profile}
        loading={loading!}
        onSave={saveProfile!}
        onLogout={() => supabase.auth.signOut()}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => <TabBar {...props} style={styles.tabBar} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#333333",
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  tabBar: {
    backgroundColor: '#333333',
  },
});
