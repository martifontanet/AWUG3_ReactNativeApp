import { View, StyleSheet, Text, Image } from "react-native";
import StatusLabel from "../Basic/StatusLabel";

export default function EpiLocCard({name, labelName}) {
  
    return (
        <View style={[ styles.epilocContainer ]}>

        <Text style={styles.character} >{name}</Text>
        <StatusLabel showCircle={false} status={labelName}  /> 

        </View>
    );
  };

  const size= 70;
const styles = StyleSheet.create({ 
    epilocContainer: {
        display:"flex",
        flexDirection: "column",
        justifyContent:"space-between",
        alignItems: "center",
        padding:10,
        backgroundColor: "#4E4E4E",
        width:150,
        borderRadius:10,
        gap:10,
        margin: 5
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