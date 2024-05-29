import React, { useEffect, useState } from 'react';
import {  View, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { supabase } from '../utils/clientSupabase';
import LikeButton from '../components/Basic/LikeButton';
import LikeFavIcon from '../components/Basic/LikeFavIcon';
import { useUserInfo } from '../utils/userContext';
import { useNavigation } from '@react-navigation/native';


export default function PostDetailScreen({ route }) {
  const { post } = route.params;
  const [username, setUsername] = useState('');
  const [likes, setLikes] = useState(0);
  const user = useUserInfo();

  useEffect(() => {
    const fetchUsername = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', post.user_id);

      if (error) {
        console.log(error);
        return;
      }

      if (data && data.length > 0) {
        setUsername(data[0].username);
      }
    };

    fetchUsername(); 
  }, [post.user_id]);

  const toggleLike = async () => {
    if(!user.profile) return;
    const { error } = await supabase.from('post_likes').insert({
        post_id: post.id,
        user_id: user?.profile?.id
    });
    if (error) {
        Alert.alert("Server Error", error.message);
      } else {
        setLikes(likes + 1);
      }
  }

  return (
    <ScrollView style={styles.container}>
        <View style={styles.post}>
          <Text style={styles.author}>{username}</Text>

          {post.image && (
            
              <Image source={{ uri: post.image }} style={styles.image} />
          )}

          <Text style={styles.text}>{post.content}</Text>
          
          <View style={styles.icons}>
              <LikeButton route={route} onPress={toggleLike} style={styles.icon} />
              {/* <LikeFavIcon style={styles.icon} /> */}
          </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#333333', // Cambia esto al color de fondo deseado
  },
  text: {
    fontSize: 18,
    color: 'white'
  },
  image: {
    height: 300, // Ajusta la altura de la imagen según sea necesario
    borderRadius: 10,
  },
  icons: {
    flexDirection:"row",
    gap:20,
  },
  post: {
    gap:10,
    marginTop:10,
  },
  author:{
    fontSize: 20,
    color: 'white',
    fontWeight:'bold',
  }
});
