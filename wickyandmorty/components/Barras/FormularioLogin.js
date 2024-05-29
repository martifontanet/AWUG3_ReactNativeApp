import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

export default function Form({ placehold, keyType, autoCom, password }) {
  return (
    <View style={[styles.container]}>
      <TextInput
        placeholder={placehold}
        inputMode={keyType}
        secureTextEntry={password}
        style={[styles.searchInput]}
        autoComplete={autoCom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  searchInput: {
    backgroundColor: "#CBE7A5",
    fontSize: 20,
    padding: 15,
    paddingHorizontal: 25,
    flex: 1,
    borderRadius: 30,
  },
});
