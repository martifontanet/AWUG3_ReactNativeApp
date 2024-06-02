import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, Pressable } from 'react-native';
import { supabase } from '../utils/clientSupabase';
import { Post } from '../utils/SupabaseApi';
import PostDefault from '../components/Posts/PostDefault';
import { useLinkTo  } from '@react-navigation/native';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const linkTo = useLinkTo();

  const goToWikiTab = () => {
    linkTo('/WikiTab');
  };

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .ilike('content', `%${query}%`);

    if (error) {
      console.log(error);
      return;
    }
    setResults(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer} >
        <TextInput
        style={styles.input}
        placeholder="Search posts"
        value={query}
        onChangeText={setQuery}
        />
        <Pressable onPress={handleSearch} style={styles.button} >
          <Text style={styles.buttonText} >SEARCH</Text>
        </Pressable>
        {/* <Button title="Search" onPress={handleSearch} color="#97CE4C" /> */}
      </View>
      
      <Button title="Go to Wiki" onPress={goToWikiTab} color="#97CE4C" />
      
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostDefault post={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap:15,
    backgroundColor: '#333333',
  },
  input: {
    borderColor: '#97CE4C',
    borderWidth: 3,
    padding: 10,
    color: "#333333",
    backgroundColor:'#D4EAD0',
    flex:1,
  },
  searchContainer: {
    flexDirection:'row',
    // backgroundColor:'blue',
    alignItems:'center',
  },
  button:{
    backgroundColor:'#97CE4C',
    height:'100%',
    paddingHorizontal:10,
    paddingVertical:15,
    borderTopRightRadius:3,
    borderBottomEndRadius:3,
  },
  buttonText:{
    color:'white',
    fontSize:14,
    fontWeight:'bold',
  }
});
