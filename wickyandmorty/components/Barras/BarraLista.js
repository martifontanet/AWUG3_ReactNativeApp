import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function BarraLista({ palabras, maxPalabrasSeleccionadas }) {
  const [selectedWords, setSelectedWords] = React.useState([]);

  const toggleWord = (word) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((selectedWord) => selectedWord !== word));
      console.log(selectedWords);
    } else {
      if (selectedWords.length < maxPalabrasSeleccionadas) {
        setSelectedWords([word]);
        console.log(selectedWords);
      }
    }
  };

  const isSelected = (word) => selectedWords.includes(word);

  return (
    <View style={styles.container}>
      {palabras.map((palabra, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.wordContainer,
            isSelected(palabra) && styles.selectedWord,
          ]}
          onPress={() => toggleWord(palabra)}
        >
          <Text style={styles.word}>{palabra}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#4E4E4E",
    padding: 10,
  },
  wordContainer: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#4E4E4E",
  },
  word: {
    fontSize: 16,
    color: "#fff",
  },
  selectedWord: {
    backgroundColor: "#97CE4C",
  },
});
