import { View, StyleSheet, Text, Image } from "react-native";
import StatusLabel from "../Basic/StatusLabel";
import CharacterPhoto from "./CharacterPhoto";

export default function CharacterCard({image, character, status}) {
  
    return (
        <View style={[ styles.charContainer ]}>

        <CharacterPhoto character={image} />
        <Text style={styles.character} >{character}</Text>
        <StatusLabel showCircle={true} status={status} /> 

        </View>
    );
  };

  const size= 70;
const styles = StyleSheet.create({ 
    charContainer: {
        display:"flex",
        flexDirection: "column",
        justifyContent:"space-between",
        alignItems: "center",
        padding:10,
        backgroundColor: "#4E4E4E",
        width:150,
        height: 150,
        borderRadius:10,
        gap:10,
    },
    img: {
        width: size,
        height: size,
        borderRadius:10,
    },
    character: {
        fontSize: 12,
        fontWeight:"bold",
        color:"white",
        marginLeft: 10,
        marginRight: 10,
    }
  });