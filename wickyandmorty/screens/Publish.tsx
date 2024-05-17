import { Button, FlatList, StyleSheet, Text, View, } from "react-native";
import PostInput from "../components/Barras/PostInput";
import { supabase } from "../utils/clientSupabase";
import { useEffect, useState } from "react";
import { useUserInfo } from "../utils/userContext";


export default function Publish() {
  const [posts, setPosts] = useState([]);
  const { profile } = useUserInfo();

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
      <Text>Recent posts: </Text>
        <FlatList 
          data={posts} 
          keyExtractor={item => item.id} 
          renderItem={({ item }) => <Text>{item.content}</Text>} 
          ><Button title="Borrar"></Button></FlatList>
          <Text>________________________________</Text>
          <Text>Hey {profile?.username}, publish a new Post now!</Text>
          
        <PostInput onSubmit={handleSubmit} />
        <Button title="Cerrar sesión" onPress={() => supabase.auth.signOut()}></Button>
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
  