import { View, StyleSheet, Text, Image } from "react-native";
import { useEffect } from "react";
import useCharacter from "../../Hooks/useCharacter";

export default function CharacterDetail({ id }) {


  const {char, loading, error, searchCharacter} = useCharacter();
  console.log(char);
  
  useEffect(() => {
    searchCharacter(id);
  }, [])
  

  return (
    <View style={[ styles.container ]}>
        {loading && <Text>Card loading.....</Text>  }
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
        ) }
        
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