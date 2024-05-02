import React from 'react';
import {Text, StyleSheet, View } from 'react-native';

export default function StatusLabel ({showCircle, status }) {

  return (
    <View style={styles.button}>
      {showCircle && (
        status === "alive" ? <View style={styles.alive} /> : (status==="dead" ? <View style={styles.dead}/> : <View style={styles.unknown} /> )
      )}
      <Text style={styles.buttonText}>{status}</Text>
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
  },
  dead:{
    borderRadius: 100,
    backgroundColor: "#FF4B4B",
    width:10,
    height:10,
  },
  unknown:{
    borderRadius: 100,
    backgroundColor: "#FFD74B",
    width:10,
    height:10,
  }
});


