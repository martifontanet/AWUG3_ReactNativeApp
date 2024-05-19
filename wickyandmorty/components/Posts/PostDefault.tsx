import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Post } from "../../utils/SupabaseApi";

interface Props {
  post: Post;
}

export default function PostDefault({ post }: Props) {
  const navigation = useNavigation();

  const handlePostPress = () => {
    navigation.navigate("PostDetailScreen", { post });
  };

  return (
    <TouchableOpacity onPress={handlePostPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {post.content}
      </Text>
      {post.image && (
        <Image
          source={{ uri: post.image }}
          style={styles.photo}
          resizeMode="cover"
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "#4E4E4E",
    width: "45%",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
  photo: {
    marginTop: 10,
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
});
