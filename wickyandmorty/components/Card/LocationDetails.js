import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import EpilocPhoto from "./EpilocPhoto";

export default function EpisodeDetail({ route }) {
    const { id } = route.params;
    const [loc, setLoc] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const locDetail = async () => {
        console.log(id);
        setError(null);
        setLoading(true);
        try {
          const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const dataList = await response.json();
          setLoc(dataList);

        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        locDetail();

      }, [id])

    return (
        <View style={[ styles.container ]}>
        {loading && <Text>Location loading....</Text>  }
        {error && <Text>{error}</Text>  }
        {loc && (
          <>
            <Text style={styles.title} >{loc.name}</Text>
            <Text style={styles.text} >Location type : {loc.type}</Text>
            <Text style={styles.text} >Dimension : {loc.dimension}</Text>

            <Text style={styles.text} >Residents: </Text>

            <ScrollView contentContainerStyle={styles.scroll} >
              {loc.residents.map((character, index) =>( 
              <EpilocPhoto  key={index} link={character} /> ) )}

            </ScrollView>
          </>
        )}

        

        </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#4E4E4E",
        display:"flex",
        flex:1,
        paddingHorizontal: 20,
        paddingVertical:20,
        flexDirection:"column",
        gap:20,
    },
    title: {
        fontFamily:"Inter",
        textAlign:"center",
        fontSize: 20,
        fontWeight:"bold",
        color:"white",
    },
    text :{
        fontFamily:"Inter",
        textAlign:"center",
        fontSize: 16,
        fontWeight:"normal",
        color:"white",
    },
    scroll:{
      gap:10,
      display:'flex',
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'center',
    },
  });