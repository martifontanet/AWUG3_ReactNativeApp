import { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "./Icons";
import { supabase } from '../../utils/clientSupabase';
import { useUserInfo } from '../../utils/userContext';
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

  const getLikes = useCallback(() => fetchLikes(post.id).then(setLikes), [post]);

  useEffect(() => {
    getLikes();
  }, [getLikes]);

  const handlePress = async () => {
    if (!user.profile) return;
    if (userLikesPost) {
      const { error } = await supabase
        .from('post_likes')
        .delete()
        .eq("id", userLikesPost.id);
      setPressed(false);
      if (error) Alert.alert("Server Error", error.message);
    } else {
      const { error } = await supabase.from('post_likes').insert({
          post_id: post.id,
          user_id: user?.profile?.id
      });
      setPressed(true)
      if (error) Alert.alert("Server Error", error.message);
    }
    // if (pressed) {
    //     setPressed(false);
         
    //     alert("Not Liked anymore !");
    // }else{
    //     setPressed(true)

    //     if(!user.profile) return;
    //     const { error } = await supabase.from('post_likes').insert({
    //         post_id: post.id,
    //         user_id: user?.profile?.id
    //     });
    //     if (error) Alert.alert("Server Error", error.message);

    //     alert("Liked !");
    // }
    getLikes();
  };

  const handlePressIn = () => {
    setPressed(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{likes.length} likes</Text>
      <Pressable
        onPress={handlePress}
        //onPressIn={handlePressIn}
        style={pressed && styles.whenPressing}
      >
        <Icon name="heart" focused={pressed} />
        
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap:5,
  },
  whenPressing: {
    transform: [{ scale: 0.9 }],
  },
  pressed: {
    flexDirection: 'row'
  },
  text: {
    color: 'white',
    fontSize: 16,
  }
});
