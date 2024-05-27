import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useUserInfo } from '../utils/userContext';
import { supabase } from '../utils/clientSupabase';
import UserForm from '../components/Barras/UserForm';

export default function UserProfile() {
  const { profile, loading, saveProfile } = useUserInfo();

  return (
    <View style={styles.container}>
      <View>
        <UserForm
          profile={profile}
          loading={loading!}
          onSave={saveProfile!}
          onLogout={() => supabase.auth.signOut()} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#333333',
  }
});
