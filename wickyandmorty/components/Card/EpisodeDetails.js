import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useFonts, Inter_400Regular, Inter_900Black } from '@expo-google-fonts/inter';
import EpilocPhoto from "./EpilocPhoto";
import DetailBox from './CharacterDetailBox';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function EpisodeDetail({ route }) {
  const { id } = route.params;
  const [ep, setEp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_900Black
  });

  const epDetail = async () => {
    //console.log(id);
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataList = await response.json();
      setEp(dataList);
      //console.log("data : ", dataList);
      //console.log("ep data fetched : ", ep);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    epDetail();
  }, [id]);

  return (
    <ScrollView style={[styles.container]}>
      {loading && <Text>Detail loading....</Text>}
      {error && <Text>{error}</Text>}
      {ep && fontsLoaded && (
        <>
          <Text style={styles.title}>{ep.name}</Text>
          <View style={styles.boxContainer}>
            <DetailBox icon="date-range" label="Release Date" value={ep.air_date} />
            <DetailBox icon="visibility" label="Season" value={ep.episode} />
          </View>
          <View style={styles.center}>
            <Icon  name="person" size={30} color="white" />
          </View>
          <Text style={styles.text}>Featured characters: </Text>
          <View style={styles.scroll}>
            {ep.characters.map((character, index) => (
              <EpilocPhoto key={index} link={character} />
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4E4E4E",
    display: "flex",
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "column",
    gap: 20,
  },
  title: {
    fontFamily: "Inter_900Black",
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  boxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  text: {
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "normal",
    color: "white",
    marginBottom: 10,
  },
  scroll: {
    gap: 10,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  center: {
    alignItems: "center"
  }
});
