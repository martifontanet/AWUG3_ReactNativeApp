import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Comentario({ nombreUsuario, texto, numLikes }) {
  const [heartActive, setHeartActive] = useState(false);

  const toggleHeart = () => {
    setHeartActive(!heartActive);
  };

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={require("../../assets/foto.jpg")}
          style={styles.fotoPerfil}
        />
        <View style={styles.userInfo}>
          <Text style={styles.nombreUsuario}>{nombreUsuario}</Text>
          <Text style={styles.texto}>{texto}</Text>
        </View>
      </View>
      <View style={styles.likesContainer}>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={toggleHeart}
          activeOpacity={0.8}
        >
          <Ionicons
            name={heartActive ? "heart" : "heart-outline"}
            size={24}
            color={heartActive ? "#97CE4C" : "#97CE4C"}
          />
        </TouchableOpacity>
        <Text style={styles.likes}>{numLikes} Likes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#4E4E4E",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fotoPerfil: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "column",
  },
  nombreUsuario: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  texto: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 5,
  },
  likesContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "auto",
  },
  likeButton: {
    marginRight: 5,
  },
  likes: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 5,
  },
});
