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
import { useUserInfo } from "../utils/userContext";

export default function Home() {
  const { posts, refreshPosts } = useContext(PostsContext);
  const navigation = useNavigation();
  const { profile } = useUserInfo(); // Obtiene la información del usuario del contexto
  const [activeTab, setActiveTab] = useState("2 columnas");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
  useFocusEffect(
    useCallback(() => {
      refreshPosts();
    }, [activeTab])
  );

  const renderContent = () => {
    const numColumns = activeTab === "1 columna" ? 1 : activeTab === "2 columnas" ? 2 : 3;
    return (
      <MasonryList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard style={styles.card} post={item} />}
        numColumns={numColumns}
        contentContainerStyle={styles.flatListContent}
      />
    );
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
    height:'auto'
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
    flex: 1,
  },
  tabText: {
    color: "white",
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: "bold",
  },
});
