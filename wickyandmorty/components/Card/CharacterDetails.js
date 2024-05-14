import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import useCharacter from "../../Hooks/useCharacter";
import { useEffect, useState } from "react";


export default function CharacterDetail({ route }) {
  const { id } = route.params;
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // character, name, species,gender, status, location

  //const {char, loading, error, searchCharacter} = useCharacter();
  
  const charDetail = async () => {
    console.log(id);
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const dataList = await response.json();
      setChar(dataList);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //searchCharacter(id);
    charDetail();
  }, [])
  

  return (
    <View style={[ styles.container ]}>
        {loading && <Text>Card loading.....</Text>  }
        {error && <Text>{error}</Text>  }
        {char && (
            <>
                <Image source={{uri:char.image}} style={styles.img} />
                <Text>{char.name}</Text>
                <Text>Species : {char.species}</Text>
                <Text>Status : {char.status}</Text>
                <Text>Gender : {char.gender}</Text>
                
                <Pressable onPress={() => {
                  alert(`Redirecting to ${char.location.name}`);
                }} >
                  <Text style={styles.link} >Location : {char.location.name}</Text>
                </Pressable>
            </>
        ) }
        {/* <Image source={{uri:character}} style={styles.img} />
        <Text style={styles.title} >{name}</Text>
        <Text style={styles.text} >Species : {species}</Text>
        <Text style={styles.text} >Gender : {gender}</Text>
        <Text style={styles.text} >Status: {status}</Text> */}
        

        

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