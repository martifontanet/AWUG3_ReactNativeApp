import { View, StyleSheet, Text, Image } from "react-native";

export default function EpisodeDetail({title, release, season, characters}) {
  
    return (
        <View style={[ styles.container ]}>

        <Text style={styles.title} >{title}</Text>
        <Text style={styles.text} >Release date : {release}</Text>
        <Text style={styles.text} >Season : {season}</Text>
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