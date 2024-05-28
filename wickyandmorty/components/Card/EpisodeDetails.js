import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import CharacterPhoto from "./CharacterPhoto";
import {
  beth,
  jerry,
  morty,
  rick,
  summer,
  random1,
  random2,
} from "../../assets/characterIMG/index";
import EpilocPhoto from "./EpilocPhoto";

export default function EpisodeDetail({ route }) {
  const { id } = route.params;
  const [ep, setEp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const char = [
    beth,
    jerry,
    morty,
    rick,
    summer,
    random1,
    random2,
    beth,
    jerry,
    rick,
    morty,
    summer,
  ];

  const epDetail = async () => {
    console.log(id);
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
      console.log("data : ", dataList);
      console.log("ep data fetched : ", ep);
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
    <View style={[styles.container]}>
      {loading && <Text>Detail loading....</Text>}
      {error && <Text>{error}</Text>}
      {ep && (
        <>
          <Text style={styles.title}>{ep.name}</Text>
          <Text style={styles.text}>Release date : {ep.air_date}</Text>
          <Text style={styles.text}>Season : {ep.episode}</Text>

          <Text style={styles.text}>Appearing characters: </Text>

          <ScrollView contentContainerStyle={styles.scroll}>
            {/* <CharacterPhoto character={jerry} />
                <CharacterPhoto character={rick} />
                <CharacterPhoto character={morty} />
                <CharacterPhoto character={summer} />
                <CharacterPhoto character={beth} />
                <CharacterPhoto character={random1} />
                <CharacterPhoto character={random2} />
                <CharacterPhoto character={morty} />
                <CharacterPhoto character={rick} /> */}

            {ep.characters.map((character, index) => (
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
    fontFamily: "Inter",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    fontFamily: "Inter",
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
});
