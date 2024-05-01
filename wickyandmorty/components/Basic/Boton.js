import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button ({ title }) {
    const handlePress = () => {

       console.log("button pressed !");
      };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  button: {
    backgroundColor: '#97CE4C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


