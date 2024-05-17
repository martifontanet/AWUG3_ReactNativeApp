import {
    FlatList,
      StyleSheet,
      Text,
      View,
    } from "react-native";
import { useState, useEffect } from "react";
import EpiLocCard from "../../../components/Card/EpisodeCard";
import Button from "../../../components/Basic/Button";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
  
  const Tab = createMaterialTopTabNavigator();
    
    export default function EpisodeScreen() {
  
  
  
      const [filter, setFilter] = useState('https://rickandmortyapi.com/api/episode');
      const [data, setData] = useState(null);
      const [prev, setPrev] = useState('');
      const [next, setNext] = useState('');
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
          const response = await fetch(`${filter}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const dataList = await response.json();
          setData(dataList.results);
          setPrev(dataList.info.prev);
          setNext(dataList.info.next);
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

            <FlatList 
            data={data}
            renderItem={({item}) => <EpiLocCard  name={item.name} labelName={item.episode} epID={item.id} />}

            numColumns={2}
            columnWrapperStyle={styles.charList}
            />  

            <View style={styles.buttonContainer} >
                
              {prev && <Button title="Previous" variable={prev} statechange={setFilter} /> }
              
              {next && <Button title="Next" variable={next} statechange={setFilter} />
              }

            </View>  

          </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10,
        gap: 10,
        backgroundColor: "#333333"
      },
      charList:{
        display: 'flex',
        alignItems:'flex-start',
        alignContent:'flex-start',
        gap:10,
        flexWrap:'wrap',
        margin:5,
      },
      buttonContainer:{
        display: 'flex',
        flexDirection:'row',
        gap:10,
        alignContent:'center',
      }
    });
    