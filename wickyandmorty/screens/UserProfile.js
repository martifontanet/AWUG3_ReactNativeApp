import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { useUserInfo } from '../utils/userContext';
import { supabase } from '../utils/clientSupabase';
import * as ImagePicker from 'expo-image-picker';
import Avatar from '../components/Basic/Avatar';

export default function UserProfile() {
  const { profile } = useUserInfo();
  const [avatarUrl, setAvatarUrl] = useState('');

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })
    if (!result.canceled) {
      setAvatarUrl(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.container}>
      {profile ? (
        <View>
          <TouchableOpacity 
            style={styles.avatar}
            onPress={handlePickImage}
          >
            <Avatar uri={avatarUrl}size={120}></Avatar>
          </TouchableOpacity>
            <Text style={styles.text}>Hi {profile?.username}!</Text>
        </View>
      ) : (
        <Text style={styles.text}>No user information available.</Text>
      )}
      <Button title="Cerrar sesión" onPress={() => supabase.auth.signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#333333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  avatar: {
    alignItems: "center",
    marginBottom: 16,
  }
});
