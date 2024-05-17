import { Alert, Button, FlatList, StyleSheet, Text, View, } from "react-native";
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

  const handleSubmit = async (content: string, image: string) => {
    try{
      let publicUrl = '';
      if (image) {
        const fileExt = image.split(".").pop();
        const fileName = image.replace(/^.*[\\\/]/, "");
        const filePath = `${Date.now()}.${fileExt}`;

        const formData = new FormData();
        const photo = {
          uri: image,
          name: fileName,
          type: `image/${fileExt}`,
        } as unknown as Blob;
        formData.append("file", photo);

        const { error } = await supabase.storage
        .from("posts")
        .upload(filePath, formData);
        if (error) throw error;

        const { data } = supabase.storage.from('posts').getPublicUrl(filePath);
        publicUrl = data.publicUrl;
      }
      const { data, error } = await supabase
      .from('posts')
      .insert({ content, image: publicUrl })
      .select();
      if (error) {
        throw error;
      } else {
        setPosts([data[0], ...posts]);
      }
    } catch (error: any) {
    Alert.alert("Server error", error.message)
  }
};
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
  