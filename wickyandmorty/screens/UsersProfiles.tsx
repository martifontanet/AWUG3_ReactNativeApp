import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../utils/clientSupabase";
import Avatar from "../components/Basic/Avatar";
import { useNavigation } from "@react-navigation/native";
import { downloadAvatar } from "../utils/SupabaseApi";

export default function OtherUserProfile({ route }) {
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga
  const [error, setError] = useState(null); // Nuevo estado para manejar errores
  const navigation = useNavigation();
  const [avatarUrl, setAvatarUrl] = useState("");
  const { userId } = route.params;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        setUserInfo(data);
        downloadAvatar(data.avatar_url).then(setAvatarUrl);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setError(error.message); // Manejar errores estableciendo el estado de error
      } finally {
        setLoading(false); // Marcar como no cargando, independientemente del resultado
      }
    };

    const fetchUserPosts = async () => {
      try {
        const { data } = await supabase
          .from("posts")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        setUserPosts(data);
      } catch (error) {
        console.error("Error fetching user posts:", error.message);
        setError(error.message); // Manejar errores estableciendo el estado de error
      }
    };

    fetchUserData();
    fetchUserPosts();
  }, [userId]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.postItem}
      onPress={() => navigation.navigate("PostDetailScreen", { post: item })}
    >
      <Text style={styles.text}>{item.content}</Text>
      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator style={styles.loadingIndicator} size="large" color="#97CE4C" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar uri={avatarUrl} size={120} />
        <Text style={styles.username}>{userInfo.username}</Text>
        <Text style={styles.text}>Publicaciones</Text>
      </View>
      <FlatList
        data={userPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#333333",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop:20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#97CE4C",
    marginTop: 10,
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
  text: {
    fontSize: 20,
    color: "white",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginBottom: 20,
  },
  retryText: {
    fontSize: 16,
    color: "#97CE4C",
    textDecorationLine: "underline",
  },
});
