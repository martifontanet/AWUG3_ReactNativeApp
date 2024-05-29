import { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import Icon from "./Icons";
import { supabase } from "../../utils/clientSupabase";
import { useUserInfo } from "../../utils/userContext";
import { fetchLikes } from "../../utils/SupabaseApi";

export default function LikeButton({ route }) {
  const { post } = route.params;
  const [pressed, setPressed] = useState(false);
  const [likes, setLikes] = useState([]);
  const user = useUserInfo();

  const userLikesPost = useMemo(
    () => likes?.find((like) => like.user_id === user?.profile?.id),
    [likes, user]
  );

  const getLikes = useCallback(() => {
    fetchLikes(post.id).then((data) => {
      setLikes(data);
      setPressed(data.some((like) => like.user_id === user?.profile?.id));
    });
  }, [post, user]);

  useEffect(() => {
    getLikes();
  }, [getLikes]);

  const handlePress = async () => {
    if (!user.profile) return;
    if (userLikesPost) {
      const { error } = await supabase
        .from("post_likes")
        .delete()
        .eq("id", userLikesPost.id);
      if (error) Alert.alert("Server Error", error.message);
      else setPressed(false);
    } else {
      const { error } = await supabase.from("post_likes").insert({
        post_id: post.id,
        user_id: user?.profile?.id,
      });
      if (error) Alert.alert("Server Error", error.message);
      else setPressed(true);
    }
    getLikes();
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        style={
          pressed && styles.whenPressing
        }
      >
        <Icon name="heart" size={40} color="#97CE4C" focused={pressed} />
        <Text style={styles.text}>
          {likes.length} {likes.length === 1 ? "like" : "likes"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  whenPressing: {
    transform: [{ scale: 1 }],
  },
  pressed: {
    transform: [{ scale: 0.9 }],
  },
  text: {
    color: "white",
    fontSize: 20,
    marginLeft: 5,
  },
});
