import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (text) => {
    setSearchTerm(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search character"
        value={searchTerm}
        onChangeText={handleChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0F0C9",
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: "#97CE4C",
    borderRadius: 5,
    borderWidth: 3,
    paddingHorizontal: 10,
    color: "#333333",
  },
});

export default SearchBar;
