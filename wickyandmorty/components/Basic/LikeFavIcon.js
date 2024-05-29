import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet } from "react-native";
import Icon from "./Icons";
import { supabase } from "../../utils/clientSupabase";
import { useUserInfo } from "../../utils/userContext";
import { fetchFavs } from "../../utils/SupabaseApi";

export default function LikeFavIcon({ route }) {
  const { post } = route.params;
  const [pressed, setPressed] = useState(false);
  const [favs, setFavs] = useState([]);
  const user = useUserInfo();

  const userFavsPost = useMemo(
    () => favs?.find((fav) => fav.user_id === user?.profile?.id),
    [favs, user]
  );

  const getFavs = useCallback(() => {
    fetchFavs(post.id).then((data) => {
      setFavs(data);
      setPressed(data.some((fav) => fav.user_id === user?.profile?.id));
    });
  }, [post, user]);

  useEffect(() => {
    getFavs();
  }, [getFavs]);

  const handlePress = async () => {
    if (!user.profile) return;
    if (userFavsPost) {
      const { error } = await supabase
        .from("post_fav")
        .delete()
        .eq("id", userFavsPost.id);
      if (error) Alert.alert("Server Error", error.message);
      else setPressed(false);
    } else {
      const { error } = await supabase.from("post_fav").insert({
        post_id: post.id,
        user_id: user?.profile?.id,
      });
      if (error) Alert.alert("Server Error", error.message);
      else setPressed(true);
    }
    getFavs();
  };

  return (
    <Pressable 
      onPress={handlePress} 
      style={
        pressed && styles.whenPressing
      }
    >
      <Icon name="star" size={40} color="#97CE4C" focused={pressed} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  whenPressing: {
    transform: [{ scale: 0.9 }],
  },
});
