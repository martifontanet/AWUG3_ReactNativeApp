import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function PostDefault({ title, text, showPhoto }) {
  return (
    <View
      style={[
        styles.container,
        !showPhoto && {
          backgroundColor: "#D4EAD0",
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          !showPhoto && {
            color: "#000",
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.text,
          !showPhoto && {
            color: "#000",
          },
        ]}
      >
        {text}
      </Text>
      {showPhoto && (
        <Image
          source={require("../../assets/foto.jpg")}
          style={styles.photo}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#4E4E4E",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
  photo: {
    marginTop: 10,
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 5,
  },
});
