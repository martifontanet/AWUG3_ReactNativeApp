import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import LikeButton from "../Basic/LikeButton";
import FavoriteButton from "../Basic/LikeFavIcon";

export default function Publicacion({ tituloPost, image, user, description }) {
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>{tituloPost}</Text>
      <Image source={image} style={styles.img} />

      <View style={styles.userContainer}>
        <View style={styles.iconContainer}>
          <LikeButton />
          <FavoriteButton />
        </View>

        <Text style={styles.user}>{user}</Text>
        <Text style={styles.text}>{description}</Text>
      </View>
    </View>
  );
}

const size = 268;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: 350,
    padding: 15,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    gap: 30,
    backgroundColor: "#333333",
  },
  userContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    gap: 20,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    width: 60,
    height: 18,
    alignItems: "center",
    gap: 20,
  },
  img: {
    borderRadius: 10,
    height: 150,
    width: "100%",
    resizeMode: "cover",
  },
  title: {
    fontFamily: "Inter",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  user: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "normal",
    color: "white",
  },
});
