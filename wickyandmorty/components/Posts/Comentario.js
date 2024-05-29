// components/Basic/Comments.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import { supabase } from "../../utils/clientSupabase";
import Avatar from "../Basic/Avatar";
import { useUserInfo } from "../../utils/userContext";
import Icon from "../Basic/Icons";
import { downloadAvatar } from "../../utils/SupabaseApi";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);
  const user = useUserInfo();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data, error } = await supabase
          .from("comments")
          .select("*, profiles(username, avatar_url)")
          .eq("post_id", postId)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching comments:", error.message);
          return;
        }

        const commentsWithAvatars = await Promise.all(
          data.map(async (comment) => {
            const avatarUrl = await downloadAvatar(comment.profiles.avatar_url);
            return { ...comment, avatarUrl };
          })
        );

        setComments(commentsWithAvatars);
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const { data, error } = await supabase
      .from("comments")
      .insert({
        post_id: postId,
        user_id: user.profile.id,
        content: newComment.trim(),
      })
      .select("*, profiles(username, avatar_url)");

    if (error) {
      Alert.alert("Server Error", error.message);
    } else {
      const newCommentWithAvatar = await downloadAvatar(data[0].profiles.avatar_url);
      setComments([{ ...data[0], avatarUrl: newCommentWithAvatar }, ...comments]);
      setNewComment("");
    }
  };

  const handleDeleteComment = async (commentId) => {
    Alert.alert(
      "Eliminar comentario",
      "Estás seguro que quieres eliminar este comentario?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const { error } = await supabase.from("comments").delete().eq("id", commentId);
            if (error) {
              console.error("Error deleting comment:", error.message);
            } else {
              setComments(comments.filter((comment) => comment.id !== commentId));
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderComment = ({ item }) => (
    <View style={styles.comment}>
      <Avatar uri={item.avatarUrl} size={40} />
      <View style={styles.commentContent}>
        <Text style={styles.commentUsername}>{item.profiles.username}</Text>
        <Text style={styles.commentText}>{item.content}</Text>
      </View>
      {item.user_id === user.profile.id && (
        <Pressable onPress={() => handleDeleteComment(item.id)} style={styles.icon}>
          <Icon name="trash" size={20} color="#97CE4C" focused={false} />
        </Pressable>
      )}
    </View>
  );

  return (
    <View>
      <TextInput
        style={styles.inputBox}
        placeholder="Añade un comentario"
        placeholderTextColor="#323941"
        autoCapitalize="none"
        value={newComment}
        onChangeText={setNewComment}
      />
      <Button title="Submit" onPress={handleAddComment} />

      <Text style={styles.commentsTitle}>Comentarios:</Text>
      {loadingComments ? (
        <ActivityIndicator size="large" color="#97CE4C" />
      ) : (
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 30,
  },
  commentsTitle: {
    fontSize: 20,
    color: "#97CE4C",
    marginTop: 20,
    marginBottom: 10,
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  commentContent: {
    flex: 1,
    marginLeft: 10,
  },
  commentUsername: {
    color: "#97CE4C",
    fontWeight: "bold",
  },
  commentText: {
    color: "white",
  },
  icon: {
    marginLeft: 10,
  },
});
