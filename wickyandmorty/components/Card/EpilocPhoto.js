import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

export default function EpilocPhoto({link}) {
    const [pressed, setPressed] = useState(false);
    const [foto, setFoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const charPhoto = async () => {
        setError(null);
        setLoading(true);
        try {
          const response = await fetch(link);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setFoto(data);

        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      const handlePress = () => {
        console.log("Click!");
        navigation.navigate("CharacterDetail", {id: foto.id});
      };

      useEffect(() => {
        charPhoto()
        
      }, []);

    return (
        

        <Pressable
        onPress={handlePress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        >
            <View style={[ styles.container ]}>
                {loading && <Text>Photo loading....</Text>  }
                {error && <Text>{error}</Text>  }
                {foto && <Image source={{uri:foto.image}} style={styles.img}/>}
            </View>
        </Pressable>
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
        width:150,
        height:150,
    }
  });