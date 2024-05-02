import { View, StyleSheet, Text, ScrollView } from "react-native";
import {
    beth,
    jerry,
    morty,
    rick,
    summer,
    random1,
    random2,
  } from "../../assets/characterIMG/index"
import CharacterPhoto from "./CharacterPhoto";

export default function LocationDetail({name, type, dimension, characters}) {
  
    return (
        <View style={[ styles.container ]}>

        <Text style={styles.title} >{name}</Text>
        <Text style={styles.text} >Type : {type}</Text>
        <Text style={styles.text} >Dimension : {dimension}</Text>
        <Text style={styles.text} >Residents:</Text>
        <ScrollView horizontal={true} contentContainerStyle={styles.scroll} >
            {/* {char.map((personaje) => {
                <CharacterPhoto character={personaje} />
                console.log(personaje);

            } )} */}
                    
            <CharacterPhoto character={jerry} />
            <CharacterPhoto character={rick} />
            <CharacterPhoto character={morty} />
            <CharacterPhoto character={summer} />
            <CharacterPhoto character={beth} />
            <CharacterPhoto character={random1} />
            <CharacterPhoto character={random2} />
            <CharacterPhoto character={morty} />
            <CharacterPhoto character={rick} />

        </ScrollView>
 

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
    },
    scroll:{
        gap:10,
    },
  });