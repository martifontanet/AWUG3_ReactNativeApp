import React, { useState } from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { Post } from "../../utils/SupabaseApi";

interface Props {
  post: Post;
}

export default function PostDefault( {post}: Props) {
  return (
    <View style={styles.container} >
      
      <Text
        style={ styles.title } >{post.content}</Text>
      
      {post.image && (
        <Image
          source={{uri: post.image}}
          style={styles.photo}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#4E4E4E",
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
    resizeMode: "cover",
    borderRadius: 5,
  },
});
