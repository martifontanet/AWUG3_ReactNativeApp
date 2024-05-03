import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import useCharacter from "../../Hooks/useCharacter";


export default function CharacterDetail({ character, name, species,gender, status, location }) {


  const {char, loading, error, searchCharacter} = useCharacter();
  
  // useEffect(() => {
  //   searchCharacter(id);
  // }, [])
  

  return (
    <View style={[ styles.container ]}>
        
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