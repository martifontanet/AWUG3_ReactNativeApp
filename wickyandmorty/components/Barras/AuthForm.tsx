import { useState } from 'react';
import { StyleSheet, Button, Text, TextInput, View, Alert } from 'react-native';
import useThemeColors from "../../Hooks/useThemeColor";

import type {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';

interface AuthFormProps {
  onSignUp: (credentials: SignUpWithPasswordCredentials) => void;
  onLogin: (credentials: SignInWithPasswordCredentials) => void;
  loading: boolean;
}

export default function AuthForm({
  onSignUp,
  onLogin,
  loading,
}: AuthFormProps) {
  const [mode, setMode] = useState<'login' | 'signUp'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const themeColors = useThemeColors();
  const styles = getThemedStylesheet(themeColors);

  const handleSubmit = () => {
    if (mode === 'login') {
      onLogin({ email, password });
    } else {
      onSignUp({ email, password, options: { data: { username } } });
      Alert.alert('Verificación', 'Por favor, revise su correo electrónico para verificar su cuenta.');
      setMode('login');
      resetFields();
    }
  };

  const resetFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleModeChange = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'login' ? 'signUp' : 'login';
      resetFields();
      return newMode;
    });
  };

  return (
    <View style={styles.container}>
      {mode === 'signUp' && (
        <TextInput
          style={styles.inputBox}
          placeholder="Nombre de usuario"
          placeholderTextColor="#323941"
          value={username}
          onChangeText={setUsername}
        />
      )}
      <TextInput
        style={styles.inputBox}
        placeholder="Correo"
        placeholderTextColor="#323941"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Contraseña"
        placeholderTextColor="#323941"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <View style={styles.button}>
        <Button
          color="green"
          title={mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
          onPress={handleSubmit}
          disabled={loading || !email || !password}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>
          {mode === 'login' ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
        </Text>
        <Button
          color="darkgreen"
          title={mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
          onPress={handleModeChange}
        />
      </View>
    </View>
  );
}

function getThemedStylesheet(colors) {
  return StyleSheet.create({
    container: {
      margin: 8,
      width: '75%'
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 24,
      marginTop: 16,
    },
    inputBox: {
      borderWidth: 1,
      padding: 10,
      paddingLeft: 30,
      margin: 8,
      backgroundColor: '#CBE7A5',
      borderRadius: 25,
    },
    footer: {
      paddingTop: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: "50%",
      alignSelf: 'center',
      margin: 5
    },
    text: {
      marginBottom: 8,
      color: colors.textauth
    }
  });
}
