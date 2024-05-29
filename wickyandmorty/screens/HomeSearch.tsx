import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';
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
      <TextInput
        style={styles.input}
        placeholder="Search posts"
        value={query}
        onChangeText={setQuery}
        multiline numberOfLines={4}
      />
      <Button title="Go to Wiki" onPress={goToWikiTab} color='#97CE4C'  />
      <Button title="Search" onPress={handleSearch} color='#97CE4C' />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostDefault post={item} />}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#333333',
    gap:15,
  },
  input: {
    backgroundColor:'#D4EAD0',
    borderWidth: 3,
    borderColor:'#97CE4C',
    borderRadius:2,
    padding: 8,
    marginVertical: 8,
  },
  flatListContent: {
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  
});
