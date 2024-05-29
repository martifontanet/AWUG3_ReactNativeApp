import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Avatar from "../Basic/Avatar";
import Icon from "../Basic/Icons";
import { Profile, downloadAvatar } from "../../utils/SupabaseApi";
import { useUserInfo } from "../../utils/userContext";

interface ProfileFormProps {
  profile: Profile | null;
  onSave: (updatedProfile: Profile) => void;
  onLogout: () => void;
  loading: boolean;
}

export default function ProfileForm({
  profile,
  onSave,
  loading,
  onLogout,
}: ProfileFormProps) {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const { avatarUpdated, setAvatarUpdated } = useUserInfo();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profile?.username) {
      setUsername(profile.username);
    }
    if (profile?.avatar_url && !avatarUpdated) {
      downloadAvatar(profile.avatar_url).then(setAvatarUrl);
    }
  }, [profile]);

  const handleSubmit = () => {
    if (profile) {
      const updatedAvatarUrl = avatarUpdated ? avatarUrl : profile.avatar_url;
      onSave({ ...profile, username, avatar_url: updatedAvatarUrl });
      setIsEditing(false);
      //console.log(avatarUrl);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setAvatarUrl(result.assets[0].uri);
      setAvatarUpdated(true);
      setIsEditing(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.inputDiv}>
              <TouchableOpacity
                style={styles.avatarButton}
                onPress={handlePickImage}
              >
                <Avatar uri={avatarUrl} size={120} />
              </TouchableOpacity>
              {!isEditing ? (
                <View style={styles.inline}>
                  <Text style={styles.text}>{profile?.username}</Text>
                  <Pressable onPress={() => setIsEditing(true)}>
                    <Icon focused={false} size={27} color="#97CE4C" name={"create"} />
                  </Pressable>
                </View>
              ) : (
                <View style={styles.button}>
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre de usuario"
                    value={username}
                    onChangeText={setUsername}
                  />
                  <TouchableOpacity style={styles.save} onPress={handleSubmit}>
                    <Text style={styles.white}>Guardar cambios</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={styles.button}>
              <TouchableOpacity style={styles.logOut} onPress={onLogout}>
                <Text style={styles.white}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  inputDiv: {
    paddingVertical: 8,
  },
  avatarButton: {
    alignItems: "center",
    marginBottom: 16,
  },
  text: {
    fontSize: 22,
    marginBottom: 10,
    color: "white",
    marginRight: 10,
  },
  white: {
    color: "white",
  },
  avatar: {
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inline: {
    flexDirection: "row",
    alignSelf: "center",
  },
  button: {
    margin: 30,
  },
  logOut: {
    backgroundColor: "red",
    padding: 10,
    paddingHorizontal: 50,
    marginTop: 30,
    alignSelf: "center",
  },
  save: {
    backgroundColor: "green",
    padding: 10,
    paddingHorizontal: 50,
    alignSelf: "center",
  },
});
