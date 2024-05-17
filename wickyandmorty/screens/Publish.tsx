import { FlatList, StyleSheet, Text, View, } from "react-native";
import PostInput from "../components/Barras/PostInput";
import { supabase } from "../utils/clientSupabase";
import { useEffect, useState } from "react";


export default function Publish() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const {data, error} = await supabase.from("posts").select('*').order('created_at', {ascending: false,});

      if (error) {
        console.log(error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, [])
  
  console.log(posts);

  const handleSubmit = async (content: string) => {
    const { data, error } = await supabase
    .from('posts')
    .insert({ content })
    .select();
    if (error) {
      console.log(error);
    } else {
      setPosts([data[0], ...posts]);
    }
  }
    
  return (
      <View style={styles.container}>
        <Text>Publish new Post</Text>
        <FlatList 
          data={posts} 
          keyExtractor={item => item.id} 
          renderItem={({ item }) => <Text>{item.content}</Text>} 
          />
        <PostInput onSubmit={handleSubmit} />
      </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  input: {
    borderColor: 'green',
    borderWidth: 1,
    padding: 8,
  }
});
  