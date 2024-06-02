import React from "react";
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Post } from "../../utils/SupabaseApi";

interface Props {
  post: Post;
  numColums: string;
}

export default function PostDefault({ post, numColums }: Props) {
  const navigation = useNavigation();

  const handlePostPress = () => {
    navigation.navigate("PostDetailScreen", { post });
  };

  return (
    <TouchableOpacity onPress={handlePostPress} style={styles.container}>
      {post.image ? (
        <ImageBackground source={{ uri: post.image }} style={ numColums === "1 columna" ? styles.photo : numColums === "2 columnas" ? styles.photo2 : styles.photo3}>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {post.content}
            </Text>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {post.content}
            </Text>
          </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#4E4E4E",
    overflow: 'hidden',
  },
  textContainer: {
    backgroundColor: 'rgba(78, 78, 78, 0.9)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    color: "#fff",
    textAlign: 'center',
    marginTop: 5,
  },
  photo: {
    width: "100%",
    height: 400,
    justifyContent: 'flex-end',
  },
  photo2: {
    width: "100%",
    height: 300,
    justifyContent: 'flex-end',
  },
  photo3: {
    width: "100%",
    height: 200,
    justifyContent: 'flex-end',
  },
  noImageContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
