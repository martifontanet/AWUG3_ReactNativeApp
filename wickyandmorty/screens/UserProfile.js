import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useUserInfo } from '../utils/userContext';
import { supabase } from '../utils/clientSupabase';

export default function UserProfile() {
  const { profile } = useUserInfo();

  return (
    <View style={styles.container}>
      {profile ? (
        <View>
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
});
