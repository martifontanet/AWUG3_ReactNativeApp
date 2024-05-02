import React from 'react';
import {Text, StyleSheet, View } from 'react-native';

export default function StatusLabel ({ title, status }) {

  return (
    <View style={styles.button}>
      <View style={styles.alive} />
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E0F0C9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection:"row",
    gap:10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  alive:{
    borderRadius: 100,
    backgroundColor: "#97CE4C",
    width:10,
    height:10,
  }
});


