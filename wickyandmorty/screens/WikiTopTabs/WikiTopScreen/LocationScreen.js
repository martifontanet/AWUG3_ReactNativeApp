import {
    FlatList,
      StyleSheet,
      Text,
      View,
    } from "react-native";
import { useState, useEffect } from "react";
import CharacterCard from "../../../components/Card/CharacterCard";
import LocationCard from "../../../components/Card/LocationCard";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Button from "../../../components/Basic/Button";
  
  const Tab = createMaterialTopTabNavigator();
    
    export default function LocationScreen() {
  
  
  
      const [filter, setFilter] = useState('https://rickandmortyapi.com/api/location');
      const [data, setData] = useState(null);
      const [prev, setPrev] = useState('');
      const [next, setNext] = useState('');
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      // const {data:list, loading, error, fechData} = useFetcher();
      
      // const charList = async () => {
      //   fechData(getAllCharacter)
      // }
  
      const epList = async () => {
        setError(null);
        setLoading(true);
        try {
          const response = await fetch(`${filter}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const dataList = await response.json();
          setData(dataList.results);
          setNext(dataList.info.next);
          setPrev(dataList.info.prev);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      
      useEffect(() => {
        epList();
      }, [data]);
  
  
      
  
      return (
          <View style={styles.container}>
  
              <FlatList 
              data={data}
              renderItem={({item}) => <LocationCard  name={item.name} labelName={item.type} locID={item.id} />}
  
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
    