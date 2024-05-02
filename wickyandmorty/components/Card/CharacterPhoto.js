import { View, StyleSheet, Image } from "react-native";

export default function CharacterPhoto({character}) {
    return (
        <View style={[ styles.container ]}>

            <Image source={character} style={styles.img}/>

        </View>
    );
  };

const styles = StyleSheet.create({
    container :{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexShrink:0,
    },
    img:{
        borderRadius:10,
        width:70,
        height:70,
    }
  });