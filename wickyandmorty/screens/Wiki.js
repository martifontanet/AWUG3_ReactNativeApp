import {
  FlatList,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import { useState, useEffect } from "react";
  import useFetcher from "../Hooks/useFetcher";
  import { getAllCharacter } from "../api";
import BarraLista from "../components/Barras/BarraLista";
import CharacterCard from "../components/Card/CharacterCard";
import EpiLocCard from "../components/Card/EpiLocCard";
  
  export default function Wiki() {

    const [filter, setFilter] = useState('character');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // const {data:list, loading, error, fechData} = useFetcher();
    
    // const charList = async () => {
    //   fechData(getAllCharacter)
    // }

    const charList = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/${filter}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const dataList = await response.json();
        setData(dataList.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    useEffect(() => {
      charList();
    }, [data]);


    

    return (
        <View style={styles.container}>
          <Text>WICKY AND MORTY</Text>
          <BarraLista 
          palabras={["Personajes", "Episodios","Lugares"]}
          maxPalabrasSeleccionadas={3}
        />

            {filter=='character' && <FlatList 
            data={data}
            renderItem={({item}) => <CharacterCard  image={item.image} character={item.name} status={item.status} charID={item.id} />}

            numColumns={2}
            columnWrapperStyle={styles.charList}
            />  
            }

            {filter=='episode' && <FlatList 
            data={data}
            renderItem={({item}) => <EpiLocCard  name={item.name} labelName={item.episode} epID={item.id} />}

            numColumns={2}
            columnWrapperStyle={styles.charList}
            />  
            }

            {filter=='location' && <FlatList 
            data={data}
            renderItem={({item}) => <EpiLocCard  name={item.name} labelName={item.type} locID={item.id} />}

            numColumns={2}
            columnWrapperStyle={styles.charList}
            />  
            }

          
          
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 10,
      gap: 10,
    },
    charList:{
      display: 'flex',
      alignItems:'flex-start',
      alignContent:'flex-start',
      gap:10,
      flexWrap:'wrap',
      margin:5,
    }
  });
  