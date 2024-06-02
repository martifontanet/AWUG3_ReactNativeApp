import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CharacterDetailsEpisodeList from "./CharacterDetailsEpisodeList";
import { useFonts, Inter_400Regular, Inter_900Black } from '@expo-google-fonts/inter';
import DetailBox from './CharacterDetailBox';

export default function CharacterDetail({ route }) {
  const navigation = useNavigation();
  const { id } = route.params;
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_900Black
  });

  const charDetail = async () => {
    console.log(id);
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataList = await response.json();
      setChar(dataList);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const extractIdFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  useEffect(() => {
    charDetail();
  }, [id]);

  const renderHeader = () => (
    <>
      {loading && <Text>Detail loading....</Text>}
      {error && <Text>{error}</Text>}
      {char && fontsLoaded && (
        <View style={styles.headerContainer}>
          <Image source={{ uri: char.image }} style={styles.img} />
          <Text style={styles.title}>{char.name}</Text>
          <View style={styles.boxContainer}>
            <DetailBox icon="pets" label="Species" value={char.species} />
            <DetailBox icon="favorite" label="Status" value={char.status} />
            <DetailBox icon="person" label="Gender" value={char.gender} />
            <DetailBox
              icon="location-on"
              label="Location"
              value={char.location.name}
              onPress={() => {
                const locationId = extractIdFromUrl(char.location.url);
                navigation.navigate("LocationDetail", { id: locationId });
              }}
              customStyles={styles.clickableBox}
            />
          </View>
          <Text style={styles.text}>Appearing Episodes:</Text>
        </View>
      )}
    </>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        data={char ? char.episode : []}
        ListHeaderComponent={renderHeader()}
        renderItem={({ item }) => <CharacterDetailsEpisodeList link={item} />}
        numColumns={1}
        style={styles.charList}
        keyExtractor={(item, index) => index.toString()}
        key={1}
      />
    </ScrollView>
  );
}

const size = 225;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#333333",
    justifyContent: "center",
    alignItems: "center"
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    padding: 10,
  },
  img: {
    width: size,
    height: size,
    borderRadius: 10,
  },
  title: {
    fontFamily: "Inter_900Black",
    textAlign: "center",
    fontSize: 20,
    color: "white",
    marginBottom: 10,
  },
  boxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  clickableBox: {
    backgroundColor: '#222222',
    borderColor: '#97CE4C',
  },
  text: {
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "normal",
    color: "white",
  },
  link: {
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#97CE4C",
  },
  charList: {
    marginVertical: 10,
  },
});
