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
      />
      <Button title="Go to Wiki" onPress={goToWikiTab} color="#97CE4C" />
      <Button title="Search" onPress={handleSearch} color="#97CE4C" />
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
    marginBottom: 10,
    color: "white",
    backgroundColor:'#D4EAD0'
  },
});
