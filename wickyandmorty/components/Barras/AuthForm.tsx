import { useState } from 'react';
import { StyleSheet, Button, Text, TextInput, View } from 'react-native';

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

  const handleSubmit = () => {
    if (mode === 'login') {
      onLogin({ email, password });
    } else {
      onSignUp({ email, password, options: { data: { username } } });
    }
  };

  return (
    <View style={styles.container}>
      {mode === 'signUp' && (
          <TextInput
            style={styles.inputBox}
            placeholder="Nombre de usuario"
            value={username}
            onChangeText={setUsername}
          />
      )}
        <TextInput
          style={styles.inputBox}
          placeholder="Correo"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Button
          color="green"
          title={mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
          onPress={handleSubmit}
          disabled={loading || !email || !password}
        />
      <View style={styles.footer}>
        <Text style={{ marginBottom: 8 }}>
          {mode === 'login'
            ? '¿No tienes una cuenta?'
            : '¿Ya tienes una cuenta?'}
        </Text>
        <Button
          color="darkgreen"
          title={mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
          onPress={() => setMode(mode === 'login' ? 'signUp' : 'login')}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 8,
    justifyContent: "center"
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  inputBox: {
    borderColor: "green",
    borderWidth: 1,
    padding: 8,
    margin: 8,
  },
  footer: {
    paddingTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: "50%",
  }
});
