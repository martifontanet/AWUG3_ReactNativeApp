import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import CharacterPhoto from "./CharacterPhoto";
import {
    beth,
    jerry,
    morty,
    rick,
    summer,
    random1,
    random2,
  } from "../../assets/characterIMG/index"

export default function EpisodeDetail({ route }) {
    const { id } = route.params;
    const [loc, setLoc] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const char = [beth,jerry,morty,rick,summer,random1,random2,beth,jerry,rick,morty,summer];

    const epDetail = async () => {
        console.log(id);
        setError(null);
        setLoading(true);
        try {
          const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const dataList = await response.json();
          setLoc(dataList);
          console.log("data : ",dataList);
          console.log("ep data : ", loc);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        //searchCharacter(id);
        epDetail();

      }, [])

    return (
        <View style={[ styles.container ]}>

        <Text style={styles.title} >{loc.name}</Text>
        <Text style={styles.text} >Location type : {loc.type}</Text>
        <Text style={styles.text} >Dimension : {loc.dimension}</Text>

        <Text style={styles.text} >Appearing characters: </Text>

        <ScrollView horizontal={true} contentContainerStyle={styles.scroll} >
            {/* {char.map((personaje) => {
                <CharacterPhoto character={personaje} />
                console.log(personaje);

            } )} */}
                    
            {/* <CharacterPhoto character={jerry} />
            <CharacterPhoto character={rick} />
            <CharacterPhoto character={morty} />
            <CharacterPhoto character={summer} />
            <CharacterPhoto character={beth} />
            <CharacterPhoto character={random1} />
            <CharacterPhoto character={random2} />
            <CharacterPhoto character={morty} />
            <CharacterPhoto character={rick} /> */}

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