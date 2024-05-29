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
  Pressable,
} from "react-native";
import { supabase } from "../utils/clientSupabase";
import LikeButton from "../components/Basic/LikeButton";
import LikeFavIcon from "../components/Basic/LikeFavIcon";
import { useUserInfo } from "../utils/userContext";
import Avatar from "../components/Basic/Avatar";
import { downloadAvatar } from "../utils/SupabaseApi";
import Icon from "../components/Basic/Icons";
import { useNavigation } from "@react-navigation/native";

export default function PostDetailScreen({ route }) {
  const { post } = route.params;
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [likes, setLikes] = useState(0);
  const [favs, setFavs] = useState(0);
  const user = useUserInfo();
  const navigation = useNavigation();

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
        setUserId(data[0].id);
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

  const handleProfile = async () => {
    navigation.navigate("UserProfile");
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      "Eliminar",
      "Estás seguro que quieres eliminar este post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const { error } = await supabase.from("posts").delete().eq("id", id);
            if (error) {
              console.log(error);
              Alert.alert("Server Error", error.message);
            } else {
              navigation.navigate("MainPage");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.post}>
        <Pressable onPress={handleProfile} style={[styles.row, styles.head]}>
          <Avatar uri={avatar} size={50} />
          <Text style={[styles.text, styles.margin, styles.username]}>
            {username}
          </Text>
        </Pressable>
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
          <Pressable onPress={toggleLike} style={styles.icon}>
            <LikeButton route={route}  />
          </Pressable>
          <Pressable onPress={toggleFav} style={styles.icon}>
            <LikeFavIcon route={route}  />
          </Pressable>

          {user.profile.id === userId && (
            <Text style={styles.text}>Times Saved: {favs}</Text>
          )}
          {user.profile.id === userId && (
            <Pressable onPress={() => handleDelete(post.id)} style={styles.text}>
              <Icon name="trash" size={40} color="#97CE4C" focused={false} />
            </Pressable>
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
    backgroundColor: "#333333",
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
  icon: {},
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
