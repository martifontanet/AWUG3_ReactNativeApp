import React, { useContext, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import PostCard from "../components/Posts/PostDefault";
import { PostsContext } from "../utils/postContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import TabIcon from "../components/Basic/TabIcons";
import MasonryList from "@react-native-seoul/masonry-list";
import { useUserInfo } from "../utils/userContext"; // Importa el contexto

export default function Home() {
  const { posts, refreshPosts } = useContext(PostsContext);
  const navigation = useNavigation();
  const { profile } = useUserInfo(); // Obtiene la información del usuario del contexto

  // Use useFocusEffect to refresh posts when the screen is focused
  useFocusEffect(
    useCallback(() => {
      refreshPosts();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upBar}>
        <Text style={styles.text}>For you | Recent | Popular</Text>
        <View style={styles.rightButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("SearchScreen")}
          >
            <TabIcon name="search" focused={false} rounded={true} tab={false} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (profile?.id) { // Verifica que la ID del usuario esté definida
                navigation.navigate("UserProfile", { userId: profile.id });
              } else {
                // Si la ID del usuario no está definida, puedes mostrar un mensaje de error o realizar alguna otra acción
                console.error("ID de usuario no definida");
              }
            }}
          >
            <TabIcon name="person" focused={false} rounded={true} tab={false} />
          </TouchableOpacity>
        </View>
      </View>
      <MasonryList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard style={styles.card} post={item} />}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "#333333",
  },
  text: {
    color: "white",
  },
  upBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  rightButtons: {
    flexDirection: "row",
  },
  flatListContent: {
    alignItems: "center",
    paddingHorizontal: 5,
  },
  button: {
    marginLeft: 5,
  },
  card: {
    alignItems: "flex-start",
  },
  list: {
    flex: 1,
  },
});
