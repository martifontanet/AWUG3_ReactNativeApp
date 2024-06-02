import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import EpilocPhoto from "./EpilocPhoto";
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import DetailBox from './CharacterDetailBox';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LocationDetail({ route }) {
  const { id } = route.params;
  const [loc, setLoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  const locDetail = async () => {
    //console.log(id);
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/location/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataList = await response.json();
      setLoc(dataList);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    locDetail();
  }, [id]);

  return (
    <View style={[styles.container]}>
      {loading && <Text>Location loading....</Text>}
      {error && <Text>{error}</Text>}
      {loc && fontsLoaded && (
        <>
          <Text style={styles.title}>{loc.name}</Text>
          <View style={styles.boxContainer}>
            <DetailBox icon="location-on" label="Location Type" value={loc.type} />
            <DetailBox icon="public" label="Dimension" value={loc.dimension} />
          </View>
          <View style={styles.center}>
            <Icon  name="person" size={30} color="white" />
          </View>
          <Text style={styles.text}>Residents: </Text>
          <ScrollView contentContainerStyle={styles.scroll}>
            {loc.residents.map((character, index) => (
              <EpilocPhoto key={index} link={character} />
            ))}
          </ScrollView>
        </>
      )}
    </View>
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
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
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
  },
  scroll: {
    gap: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
    marginBottom: -20
  }
});
