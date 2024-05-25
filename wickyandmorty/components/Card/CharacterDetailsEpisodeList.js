import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import StatusLabel from "../Basic/StatusLabel";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

export default function CharacterDetailsEpisodeList({link}) {

    const navigation = useNavigation();
    const [eplink, setEplink] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [pressed, setPressed] = useState(false);
  
    const handlePress = () => {
      console.log("Click!");
      navigation.navigate("EpisodeDetail", {id: eplink.id});
    };

    const epDetail = async () => {
        setError(null);
        setLoading(true);
        try {
          const response = await fetch(link);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const dataList = await response.json();
          setEplink(dataList);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        epDetail();

      }, [link])
  
    return (
        

        <Pressable
        onPress={handlePress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        >
            {loading && <Text>Detail loading....</Text>}
            {error && <Text>{error}</Text>}
            
            {eplink && (
                <>
                    <View style={[ styles.epilocContainer ]}>
                    <Text style={styles.character} >{eplink.name}</Text>
                    <StatusLabel status={eplink.episode} showCircle={false} /> 
                    </View>
                </>
            )}
        </Pressable>
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
    },
    character: {
        fontSize: 12,
        fontWeight:"bold",
        color:"white",
        marginLeft: 10,
        marginRight: 10,
    }
  });