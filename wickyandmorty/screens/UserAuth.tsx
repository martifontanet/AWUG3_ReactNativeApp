import { Text, View, Alert, StyleSheet, Image } from "react-native";
import { useState } from "react";
import AuthForm from "../components/Barras/AuthForm";
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";
import { supabase } from "../utils/clientSupabase";
import useThemeColors from "../Hooks/useThemeColor";

export default function UserAuth() {
  const [loading, setLoading] = useState(false);
  const themeColors = useThemeColors();
  const styles = getThemedStylesheet(themeColors);

  const handleSignup = async (credentials: SignUpWithPasswordCredentials) => {
    if (!("email" in credentials)) return;
    setLoading(true);
    const { email, password, options } = credentials;
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options,
    });

    if (error) Alert.alert(error.message);

    console.log(data);
    setLoading(false);
  };

  const handleLogin = async (credentials: SignInWithPasswordCredentials) => {
    if (!("email" in credentials)) return;
    setLoading(true);
    const { email, password } = credentials;
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);

    console.log(data);
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logos} />
      <Text style={styles.title}>All your RICK & MORTY stuff in one place</Text>
      <AuthForm
        loading={loading}
        onLogin={handleLogin}
        onSignUp={handleSignup}
      />
    </View>
  );
}

function getThemedStylesheet(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      textAlign: "center",
      justifyContent: "center",
      margin: "auto",
      width: "100%",
      backgroundColor: colors.authPage,
    },
    tabBar: {
      backgroundColor: colors.surface,
    },
    logos: {
      marginBottom: 30,
    },
    title: {
      fontSize: 30,
      textAlign: "center",
      marginHorizontal: 30,
      marginBottom: 40,
      color: colors.textauth,
    },
  });
}
