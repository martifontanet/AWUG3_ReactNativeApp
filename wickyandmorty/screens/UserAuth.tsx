import { StyleSheet, Text, View, Alert } from 'react-native';
import { useState } from "react";
import AuthForm from '../components/Barras/AuthForm';
import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { supabase } from '../utils/clientSupabase';

export default function UserAuth() {
    const [loading, setLoading] = useState(false)

    const handleSignup = async (credentials: SignUpWithPasswordCredentials) => {
      if (!('email' in credentials)) return;
      setLoading(true);
      const { email, password, options } = credentials;
      const { error, data } = await supabase.auth.signUp({ email, password, options});

      if (error) Alert.alert(error.message);

      console.log(data);
      setLoading(false);

    }

    const handleLogin = async (credentials: SignInWithPasswordCredentials) => {
      if (!('email' in credentials)) return;
      setLoading(true);
      const { email, password } = credentials;
      const { error, data } = await supabase.auth.signInWithPassword({ email, password});

      if (error) Alert.alert(error.message);

      console.log(data);
      setLoading(false);
    }
  return (
    <View>
      <Text>UserAuth</Text>
      <AuthForm loading={loading} onLogin={handleLogin} onSignUp={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({})