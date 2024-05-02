import { View, StyleSheet, Text, Image } from "react-native";

export default function LocationDetail({name, type, dimension, characters}) {
  
    return (
        <View style={[ styles.container ]}>

        <Text style={styles.title} >{name}</Text>
        <Text style={styles.text} >Type : {type}</Text>
        <Text style={styles.text} >Dimension : {dimension}</Text>
        <Text style={styles.text} >Characters: {characters}</Text>
 

        </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#4E4E4E",
        width:360,
        display:"flex",
        paddingHorizontal: 20,
        paddingVertical:20,
        flexDirection:"column",
        alignItems:"center",
        gap:20,
    },
    title: {
        fontFamily:"Inter",
        textAlign:"center",
        fontSize: 20,
        fontWeight:"bold",
        color:"white",
    },
    text :{
        fontFamily:"Inter",
        textAlign:"center",
        fontSize: 16,
        fontWeight:"normal",
        color:"white",
    }
  });