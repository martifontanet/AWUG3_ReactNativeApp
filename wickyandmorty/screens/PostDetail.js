import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { supabase } from "../utils/clientSupabase";
import LikeButton from "../components/Basic/LikeButton";
import LikeFavIcon from "../components/Basic/LikeFavIcon";
import { useUserInfo } from "../utils/userContext";
import Avatar from "../components/Basic/Avatar";
import { downloadAvatar } from "../utils/SupabaseApi";

export default function PostDetailScreen({ route }) {
  const { post } = route.params;
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [likes, setLikes] = useState(0);
  const [favs, setFavs] = useState(0);
  const user = useUserInfo();

  useEffect(() => {
    const fetchUsername = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", post.user_id);

      if (error) {
        console.log(error);
        return;
      }

      if (data && data.length > 0) {
        setUsername(data[0].username);
        if (data[0].avatar_url) {
          downloadAvatar(data[0].avatar_url).then(setAvatar);
        }
      }
    };

    fetchUsername();
  }, [post.user_id]);

  const toggleLike = async () => {
    if (!user.profile) return;
    const { error } = await supabase.from("post_likes").insert({
      post_id: post.id,
      user_id: user?.profile?.id,
    });
    if (error) {
      Alert.alert("Server Error", error.message);
    } else {
      setLikes(likes + 1);
    }
  };
  const toggleFav = async () => {
    if (!user.profile) return;
    const { error } = await supabase.from("post_fav").insert({
      post_id: post.id,
      user_id: user?.profile?.id,
    });
    if (error) {
      Alert.alert("Server Error", error.message);
    } else {
      setFavs(favs + 1);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.post}>
        <View style={[styles.row, styles.head]}>
          <Avatar uri={avatar} size={50} />
          <Text style={[styles.text, styles.margin, styles.username]}>
            {username}
          </Text>
        </View>
        {post.image && (
          <Image
            source={{ uri: post.image }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <View style={styles.row}>
          <Text style={styles.text}>
            <Text style={[styles.text, styles.username]}>{username}</Text>{" "}
            {post.content}
          </Text>
        </View>

        <View style={styles.row}>
          <LikeButton route={route} onPress={toggleLike} style={styles.icon} />
          <LikeFavIcon onPress={toggleFav} style={styles.icon} />
          {user.profile.username === username && (
            <Text style={styles.text}>Times Saved: {favs}</Text>
          )}
        </View>
        <View>
          <TextInput
            style={styles.inputBox}
            placeholder="Añade un comentario"
            placeholderTextColor="#323941"
            autoCapitalize="none"
          />
          <Button title="Submit" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#333333", // Cambia esto al color de fondo deseado
  },
  row: {
    flexDirection: "row",
  },
  head: {
    marginBottom: 20,
  },
  username: {
    color: "#97CE4C",
    fontWeight: "bold",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  margin: {
    marginLeft: 20,
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    borderRadius: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 100,
  },
  post: {
    flex: 1,
    marginTop: 20,
  },
  inputBox: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 30,
  },
});
