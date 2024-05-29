import React from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabIcon({ name, focused, rounded, tab }) {
  const iconSize = tab ? 35 : 20; // Tamaño grande si large es verdadero, de lo contrario tamaño normal

  return (
    <View style={[styles.iconContainer, rounded && styles.iconRounded]}>
      <Ionicons
        name={`${name}-outline`}
        size={iconSize}
        color={focused ? "#97CE4C" : "white"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    backgroundColor: "transparent", // Fondo transparente por defecto
    marginBottom: 5, // Espacio opcional entre los íconos
  },
  iconRounded: {
    //backgroundColor: "rgba(151, 206, 76, 0.3)",
    backgroundColor:'#97CE4C',
    borderRadius: 20, // Redondea el fondo del icono si la propiedad rounded es verdadera
  },
});
