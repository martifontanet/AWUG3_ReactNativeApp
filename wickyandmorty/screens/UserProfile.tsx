import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useUserInfo } from "../utils/userContext";
import { supabase } from "../utils/clientSupabase";
import UserForm from "../components/Barras/UserForm";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MyPosts = () => {
  const { profile } = useUserInfo();
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  const fetchMyPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", profile?.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setPosts(data);
  }, [profile]);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.postItem}
      onPress={() => navigation.navigate("PostDetailScreen", { post: item })}
    >
      <Text style={styles.text}>{item.content}</Text>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.scene}>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.text}>No tienes publicaciones</Text>
      )}
    </View>
  );
};

const SavedPosts = () => {
  const { profile } = useUserInfo();
  const [savedPosts, setSavedPosts] = useState([]);
  const navigation = useNavigation();

  const fetchSavedPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from("post_fav")
      .select("post_id")
      .eq("user_id", profile?.id);

    if (error) {
      console.log(error);
      return;
    }

    const postIds = data.map((fav) => fav.post_id);

    if (postIds.length > 0) {
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .in("id", postIds);

      if (postsError) {
        console.log(postsError);
        return;
      }

      setSavedPosts(postsData);
    } else {
      setSavedPosts([]);
    }
  }, [profile]);

  useEffect(() => {
    fetchSavedPosts();
  }, [fetchSavedPosts]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.postItem}
      onPress={() => navigation.navigate("PostDetailScreen", { post: item })}
    >
      <Text style={styles.text}>{item.content}</Text>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.scene}>
      {savedPosts.length > 0 ? (
        <FlatList
          data={savedPosts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.text}>No tienes posts guardados</Text>
      )}
    </View>
  );
};

export default function UserProfile() {
  const { profile, loading, saveProfile } = useUserInfo();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const routes = [
    { key: "myPosts", title: "Mis Publicaciones" },
    { key: "savedPosts", title: "Posts Guardados" },
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
        renderTabBar={(props) => <TabBar {...props} style={styles.tabBar} />}
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
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  tabBar: {
    backgroundColor: "#333333",
  },
  postItem: {
    marginBottom: 20,
    backgroundColor: "#444444",
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});
