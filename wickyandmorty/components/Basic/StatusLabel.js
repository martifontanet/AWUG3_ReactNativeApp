import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useFonts, Inter_700Bold } from '@expo-google-fonts/inter';

export default function StatusLabel({ showCircle, status }) {
  
  let [fontsLoaded] = useFonts({
    Inter_700Bold,
  });
  return (
    <>
      {fontsLoaded && (
      <View style={styles.button}>
        {showCircle &&
          (status === "Alive" ? (
            <View style={styles.alive} />
          ) : status === "Dead" ? (
            <View style={styles.dead} />
          ) : (
            <View style={styles.unknown} />
          ))}
        <Text style={styles.buttonText}>{status}</Text>
      </View>
        )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E0F0C9",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    fontFamily: "Inter_700Bold",
    color: "#000000",
    fontSize: 13,
  },
  alive: {
    borderRadius: 100,
    backgroundColor: "#97CE4C",
    width: 10,
    height: 10,
  },
  dead: {
    borderRadius: 100,
    backgroundColor: "#FF4B4B",
    width: 10,
    height: 10,
  },
  unknown: {
    borderRadius: 100,
    backgroundColor: "#FFD74B",
    width: 10,
    height: 10,
  },
});
