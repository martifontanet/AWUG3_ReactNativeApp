import { View, StyleSheet, Text, Image, Pressable, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CharacterDetailsEpisodeList from "./CharacterDetailsEpisodeList";

export default function CharacterDetail({ route }) {
  const navigation = useNavigation();
  const { id } = route.params;
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const charDetail = async () => {
    console.log(id);
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
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
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  useEffect(() => {
    charDetail();
  }, [id]);

  const renderHeader = () => (
    <>
      {loading && <Text>Detail loading....</Text>}
      {error && <Text>{error}</Text>}
      {char && (
        <View style={styles.headerContainer}>
          <Image source={{ uri: char.image }} style={styles.img} />
          <Text style={styles.title}>{char.name}</Text>
          <Text style={styles.text}>Species: {char.species}</Text>
          <Text style={styles.text}>Status: {char.status}</Text>
          <Text style={styles.text}>Gender: {char.gender}</Text>
          <Pressable
            onPress={() => {
              const locationId = extractIdFromUrl(char.location.url);
              navigation.navigate('LocationDetail', { id: locationId });
            }}
          >
            <Text style={styles.link}>Current Location: {char.location.name}</Text>
          </Pressable>
          <Text style={styles.text}>Appearing Episodes:</Text>
        </View>
      )}
    </>
  );


  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={char ? char.episode : []}
      ListHeaderComponent={renderHeader()}
      renderItem={({ item }) => <CharacterDetailsEpisodeList link={item} />}
      numColumns={2}
      columnWrapperStyle={styles.charList}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const size = 225;
const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#333333",
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  img: {
    width: size,
    height: size,
    borderRadius: 10,
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
    fontSize: 14,
    fontWeight: "normal",
    color: "white",
  },
  link: {
    fontFamily: "Inter",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "normal",
    color: "#97CE4C",
  },
  charList: {
    display: 'flex',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    gap: 10,
    flexWrap: 'wrap',
    margin: 5,
  },
});
