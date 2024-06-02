import React, { useContext } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import PostInput from '../components/Barras/PostInput';
import { supabase } from '../utils/clientSupabase';
import { useUserInfo } from '../utils/userContext';
import { PostsContext } from '../utils/postContext';
import { RootStackParamList } from '../utils/types';


export default function Publish() {
  const { addPost } = useContext(PostsContext);
  const { profile } = useUserInfo();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); 

  const handleSubmit = async (content: string, image: string) => {
    try {
      let publicUrl = '';
      if (image) {
        const fileExt = image.split('.').pop();
        const fileName = image.replace(/^.*[\\\/]/, '');
        const filePath = `${Date.now()}.${fileExt}`;

        const formData = new FormData();
        const photo = {
          uri: image,
          name: fileName,
          type: `image/${fileExt}`,
        } as unknown as Blob;
        formData.append('file', photo);

        const { error } = await supabase.storage
          .from('posts')
          .upload(filePath, formData);
        if (error) throw error;

        const { data } = supabase.storage.from('posts').getPublicUrl(filePath);
        publicUrl = data.publicUrl;
      }
      const { data, error } = await supabase
        .from('posts')
        .insert({ content, image: publicUrl, user_id: profile?.id })
        .select();
      if (error) {
        throw error;
      } else {
        const newPost = { ...data[0], profile: { username: profile?.username } };
        addPost(newPost);
        navigation.navigate('PostDetailScreen', { post: newPost }); 
      }
    } catch (error: any) {
      Alert.alert('Server error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text} >Hey {profile?.username}, publish a new Post now!</Text>
      <PostInput onSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 10,
    paddingHorizontal: 10,
    gap: 15,
    backgroundColor:'#333333'
  },
  text:{
    textAlign:'center',
    color:'#97CE4C',
    fontSize:18,
  }
});
