import { View, StyleSheet, Text, Image } from "react-native";

export default function ProfilePicture({image, user}) {
  
    return (
        <View style={[ styles.container ]}>
        <Image source={image} style={styles.icon} />
        <Text style={styles.text} >{user}</Text>
        </View>
    );
  };

  const size= 100;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        gap:15,
        backgroundColor: "#97CE4C",
    },
    icon: {
        width: size,
        height: size,
        resizeMode: "contain",
        borderRadius:100,
    },
    text: {
        fontSize: 25,
        fontWeight:"bold",
        marginLeft: 10,
        marginRight: 10,
    }
  });