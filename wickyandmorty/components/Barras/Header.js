import React from "react";
import BotonAtras from "../../assets/BotonAtras.png";
import DotsThreeVertical from "../../assets/DotsThreeVertical.png";
import { View, StyleSheet, Text, Image } from "react-native";

export default function Header({ showRightIcon, verTitulo, tituloPGina, showLeftIcon }) {
      
  return (
    <View style={[ styles.container ]}>
      {showLeftIcon && <Image source={BotonAtras} style={[styles.icon, styles.atras]} />}
      {verTitulo && <Text  style={[ styles.text ]}>{tituloPGina}</Text>}
      {showRightIcon && <Image source={DotsThreeVertical} style={[styles.icon, styles.options]} />}
    </View>
        
  );
};

const size= 30;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#97CE4C",
    },
    icon: {
        width: size,
        height: size,
        resizeMode: "contain",
    },
    text: {
        fontSize: 25,
        textAlign: "center", 
        marginLeft: 10,
        marginRight: 10,
    }
  });