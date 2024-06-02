import { FlatList, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import CharacterCard from "../../../components/Card/CharacterCard";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Button from "../../../components/Basic/Button";
import SearchBar from "../../../components/Barras/SearchBar";

const Tab = createMaterialTopTabNavigator();

export default function CharacterScreen() {
  const [filter, setFilter] = useState(
    "https://rickandmortyapi.com/api/character/?page=1"
  );
  const [data, setData] = useState(null);
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState(``);
  const charList = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`${filter}&name=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataList = await response.json();
      setPrev(dataList.info.prev);
      setNext(dataList.info.next);
      setData(dataList.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    charList();
  }, [filter, searchTerm]);

  return (
    <View style={styles.container}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <CharacterCard
              image={item.image}
              character={item.name}
              status={item.status}
              charID={item.id}
            />
          </View>
        )}
        numColumns={2}
        columnWrapperStyle={styles.charList}
      />

      <View style={styles.buttonContainer}>
        {prev && (
          <Button title="Previous" variable={prev} statechange={setFilter} />
        )}

        {next && (
          <Button title="Next" variable={next} statechange={setFilter} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 10,
    paddingHorizontal: 10,
    gap: 10,
    backgroundColor: "#333333",
  },
  charList: {
    justifyContent: "space-around",
    marginHorizontal: 15,
  },
  cardWrapper: {
    flex: 1,
    alignItems: "center",
    margin: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});
