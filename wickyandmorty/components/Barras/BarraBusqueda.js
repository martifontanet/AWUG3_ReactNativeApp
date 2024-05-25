import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Busqueda({ placehold, keyType, autoCom, password, icon, updateSearch, searchTerm }) {
  const [text, setText] = useState(""); 
  const [showClearIcon, setShowClearIcon] = useState(false); 

  const handleClearText = () => {
    setText(""); // Esborra el text del input
    setShowClearIcon(false); // Oculta l'ícona
  };

  return (
    <View style={[styles.container]}>
      <Ionicons name={`search`} size={24} style={styles.icon} />
      <TextInput
        placeholder={placehold}
        inputMode={keyType}
        secureTextEntry={password}
        style={[styles.searchInput]}
        autoComplete={autoCom}
        value={text}
        onChangeText={(inputText) => {
          setText(inputText); // Actualitza el text del input
          updateSearch(inputText);
          setShowClearIcon(!!inputText); // Mostra o oculta l'icona de cancel·lar segons si hi ha input o no
        }}
      />
      {showClearIcon && ( // Ensenya el icona de cancel·lar només quan hi ha input
        <TouchableOpacity onPress={handleClearText}>
          <Ionicons name={`close`} size={24} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#CBE7A5",
    borderRadius: 50,
    maxHeight: 43,
  },
  searchInput: {
    fontSize: 20,
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
  icon: {
    padding: 10,
    paddingLeft: 15,
  },
});
