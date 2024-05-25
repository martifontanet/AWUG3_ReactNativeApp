import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Button ({ text, icon }) {
    const handlePress = () => {

        alert("Button pressed !");

      };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
        <View style={styles.div}>
            <Ionicons
                name={`${icon}`}
                size={24}
                style={styles.icon}
                />
        <Text style={styles.buttonText}>Continue with {text}</Text>
      </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  button: {
    backgroundColor: '#97CE4C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  div: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    paddingRight: 10
  }
});


