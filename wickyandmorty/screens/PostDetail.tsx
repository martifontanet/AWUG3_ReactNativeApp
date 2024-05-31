// Importa los componentes necesarios
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
  LogBox,
  Share,
} from "react-native";
import { supabase } from "../utils/clientSupabase";
import LikeButton from "../components/Basic/LikeButton";
import LikeFavIcon from "../components/Basic/LikeFavIcon";
import { useUserInfo } from "../utils/userContext";
import Avatar from "../components/Basic/Avatar";
import { downloadAvatar } from "../utils/SupabaseApi";
import Icon from "../components/Basic/Icons";
import { useNavigation } from "@react-navigation/native";
import Comments from "../components/Posts/Comentario";

export default function PostDetailScreen({ route }) {
  const { post } = route.params;
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [likes, setLikes] = useState(0);
  const [favs, setFavs] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const user = useUserInfo();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsername = async () => {
      LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
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
    navigation.navigate("UsersProfiles", { userId: post.user_id });
  };

  const handleDelete = async (id) => {
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
            const { error } = await supabase
              .from("posts")
              .delete()
              .eq("id", id);
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

  const handleShare = () => {
    Share.share({
      message: `¡Mira esta publicación de ${username}: ${post.content}!`,
    })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.post}>
        <View style={[styles.userRow, styles.head]}>
          <Pressable onPress={handleProfile} style={styles.row}>
            <Avatar uri={avatar} size={50} />
            <Text style={[styles.userText, styles.margin, styles.username]}>
              {username}
            </Text>
          </Pressable>
          <Pressable onPress={() => setShowOptions(!showOptions)}>
            <Icon
              name="ellipsis-vertical"
              size={25}
              color="#97CE4C"
              focused={false}
            />
          </Pressable>
        </View>
        {showOptions && (
          <View style={styles.menuOptions}>
            <Pressable style={[styles.but,styles.but2]} onPress={handleShare}>
              <View style={styles.row}>
                <Text style={styles.optionText}>Compartir</Text>
                <Icon name="share-social" size={25} color="white" focused={false} />
              </View>
            </Pressable>
            {user.profile.id === userId && (
              <Pressable style={styles.but} onPress={() => handleDelete(post.id)}>
                <View style={styles.row}>
                  <Text style={styles.optionText}>Borrar publicación</Text>
                  <Icon name="trash" size={25} color="white" focused={false} />
                </View>
              </Pressable>
            )}
          </View>
        )}
        {post.image && (
          <Image
            source={{ uri: post.image }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <Pressable onPress={handleProfile} style={styles.row}>
          <Text style={styles.text}>
            <Text style={[styles.text, styles.username]}>{username}</Text>{" "}
            {post.content}
          </Text>
        </Pressable>

        <View style={styles.row}>
          <Pressable onPress={toggleLike} style={styles.icon}>
            <LikeButton route={route} />
          </Pressable>
          <Pressable onPress={toggleFav} style={styles.icon}>
            <LikeFavIcon route={route} />
          </Pressable>
        </View>
        <View style={styles.savedContainer}>
          {user.profile.id === userId && (
            <Text style={styles.text}>Times Saved: {favs}</Text>
          )}
        </View>

        <Comments postId={post.id} />
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
    alignItems: "center",
  },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  savedContainer: {
    flexDirection: "row",
    gap: 5,
  },
  head: {},
  username: {
    color: "#97CE4C",
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  userText: {
    fontSize: 24,
  },
  margin: {
    marginLeft: 10,
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    borderRadius: 10,
  },
  icon: {},
  post: {
    flex: 1,
    marginTop: 20,
    gap: 10,
  },
  menuOptions: {
    backgroundColor: "#444",
    borderRadius: 5,
    padding: 10,
    position: "absolute",
    top: 60,
    right: 10,
    zIndex: 1,
    minWidth: 150,
  },
  optionText: {
    color: "white",
    marginBottom: 5,
    marginRight: 5,
  },
  but: {
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  but2 : {
    marginBottom: 10,
  }
});