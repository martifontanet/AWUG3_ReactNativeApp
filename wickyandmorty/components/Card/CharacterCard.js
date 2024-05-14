import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import StatusLabel from "../Basic/StatusLabel";
import CharacterPhoto from "./CharacterPhoto";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";


export default function CharacterCard({image, character, status, charID}) {
    const navigation = useNavigation();

    const [pressed, setPressed] = useState(false);
  
    const handlePress = () => {
      console.log("Click!");
      navigation.navigate("Detail", {id: charID});
    };

    // useEffect(() => {
    //     searchGif(gifId);
    //   }, []);

    return (

        <Pressable
        onPress={handlePress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        >
            <View style={[ styles.charContainer ]}>

                <CharacterPhoto character={image} />
                <Text style={styles.character} >{character}</Text>
                <StatusLabel showCircle={true} status={status} /> 


            </View>
        </Pressable>

        
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
        height:'auto',
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