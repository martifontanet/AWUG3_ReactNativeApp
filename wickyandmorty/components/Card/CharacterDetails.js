import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { useEffect } from "react";
import useCharacter from "../../Hooks/useCharacter";
import CharacterPhoto from "./CharacterPhoto";
import { rick } from "../../assets/characterIMG";

export default function CharacterDetail({ character, name, species,gender, status, location }) {


  const {char, loading, error, searchCharacter} = useCharacter();
  
  // useEffect(() => {
  //   searchCharacter(id);
  // }, [])
  

  return (
    <View style={[ styles.container ]}>
        {/* {loading && <Text>Card loading.....</Text>  }
        {error && <Text>{error}</Text>  }
        {char && (
            <>
                <Image source = {char.image} resizeMode="contain" />
                <Text>{char.name}</Text>
                <Text>Species : {char.species}</Text>
                <Text>Status : {char.status}</Text>
                <Text>Gender : {char.gender}</Text>
                <Text>Location : {char.location.name}</Text>
            </>
        ) } */}
        <Image source={character} style={styles.img} />
        <Text style={styles.title} >{name}</Text>
        <Text style={styles.text} >Species : {species}</Text>
        <Text style={styles.text} >Gender : {gender}</Text>
        <Text style={styles.text} >Status: {status}</Text>

        <Pressable onPress={() => {
          alert(`Redirecting to ${location}`);
        }} >
          <Text style={styles.link} >Location : {location}</Text>
        </Pressable>

    </View>
        
  );
};

const size= 268;
const styles = StyleSheet.create({
    container: {
        display:"flex",
        width:"360",
        padding:10,
        flexDirection:"column",
        alignItems:"center",
        gap:10,
        backgroundColor: "#333333",
    },
    img: {
        width: size,
        height: size,
        borderRadius:10,
    },
    title: {
      fontFamily:"Inter",
      textAlign:"center",
      fontSize: 20,
      fontWeight:"bold",
      color:"white",
    },
    text:{
      fontFamily:"Inter",
        textAlign:"center",
        fontSize: 16,
        fontWeight:"normal",
        color:"white",
    },
    link:{
      fontFamily:"Inter",
        textAlign:"center",
        fontSize: 16,
        fontWeight:"normal",
      color: "#97CE4C"
    }
  });