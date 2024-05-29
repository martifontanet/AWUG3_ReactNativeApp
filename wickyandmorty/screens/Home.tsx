import React, { useContext, useCallback, useState } from "react";
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
  const [activeTab, setActiveTab] = useState("2 columnas");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const getOrderBy = (tab: string) => {
    switch (tab) {
      case "1 columna":
        return "created_at";
      case "2 columnas":
        return "created_at"; // Ya que el ordenamiento ascendente es predeterminado
      case "3 columnas":
        return "likes";
      default:
        return undefined;
    }
  };
  
  useFocusEffect(
    useCallback(() => {
      refreshPosts(getOrderBy(activeTab)); // Llama a refreshPosts con el orderBy adecuado según la pestaña activa
    }, [activeTab])
  );
  

  // Función para renderizar el contenido según la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case "1 columna":
        return (
          <MasonryList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PostCard style={styles.card} post={item} />}
            numColumns={1}
            contentContainerStyle={styles.flatListContent}
          />
        );
      case "2 columnas":
        // Implementa la lógica para mostrar publicaciones recientes
        return <MasonryList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PostCard style={styles.card} post={item} />}
            numColumns={2}
            contentContainerStyle={styles.flatListContent}
          />
      case "3 columnas":
        // Implementa la lógica para mostrar publicaciones populares
        return <MasonryList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard style={styles.card} post={item} />}
        numColumns={3}
        contentContainerStyle={styles.flatListContent}
      />
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upBar}>
        <TouchableOpacity style={styles.layout} onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
          <Text style={styles.text}>Layout</Text>
        </TouchableOpacity>
        {isDropdownVisible && (
          <View style={styles.desplegable}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setActiveTab("1 columna")}
            >
              <Text style={[styles.tabText, activeTab === "1 columna" && styles.activeTabText]}>
               ▇
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setActiveTab("2 columnas")}
            >
              <Text style={[styles.tabText, activeTab === "2 columnas" && styles.activeTabText]}>
               ▇ ▇
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setActiveTab("3 columnas")}
            >
              <Text style={[styles.tabText, activeTab === "3 columnas" && styles.activeTabText]}>
               ▇ ▇ ▇
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.rightButtons}>
          <TouchableOpacity
            style={styles.rightButton}
            onPress={() => navigation.navigate("SearchScreen")}
          >
            <TabIcon name="search" focused={false} rounded={true} tab={false} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rightButton}
            onPress={() => {
                navigation.navigate("UserProfile", { userId: profile.id });
            }}
          >
            <TabIcon name="person" focused={false} rounded={true} tab={false} />
          </TouchableOpacity>
        </View>
      </View>
      {renderContent()}
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
  layout: {
    backgroundColor: "rgba(151, 206, 76, 0.7)",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  desplegable: {
    flex: 1,
    flexDirection: "row",
    color: "white",
    justifyContent: 'space-around'
  },
  upBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  rightButtons: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: "row",
  },
  rightButton: {
    marginLeft: 20,
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
  tabText: {
    color: "white",
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: "bold",
  },
});
