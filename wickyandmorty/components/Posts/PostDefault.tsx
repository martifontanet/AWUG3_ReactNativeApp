import React, { useState } from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { Post } from "../../utils/SupabaseApi";

interface Props {
  post: Post;
}

export default function PostDefault({ post }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{post.content}</Text>
      {post.image && (
        <Image
          source={{ uri: post.image }}
          style={styles.photo}
          resizeMode="cover"
        />
      )}
    </View>
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
