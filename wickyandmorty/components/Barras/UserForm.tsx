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

interface ProfileFormProps {
  profile: Profile | null;
  onSave: (updatedProfile: Profile, avatarUpdated: boolean) => void;
  onLogout: () => void;
}

export default function ProfileForm({
  profile,
  onSave,
  onLogout,
}: ProfileFormProps) {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarUpdated, setAvatarUpdated ] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

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
      onSave({ ...profile, username, avatar_url: avatarUrl }, avatarUpdated);
      setIsEditing(false);
      setAvatarUpdated(false);
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
    <SafeAreaView >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container} >
            <View style={styles.dots}>
              <Pressable onPress={() => setShowOptions(!showOptions)}>
                <Icon
                  name="ellipsis-vertical"
                  size={25}
                  color="#97CE4C"
                  focused={false}
                />
                {showOptions && (
              <View style={styles.menuOptions}>
                <Pressable  onPress={handleSubmit}>
                  <View style={styles.inline}>
                    <Text style={styles.white}>Cerrar sesión</Text>
                    <Icon name="exit" size={25} color="white" focused={false} />
                  </View>
                </Pressable>
              </View>
            )}
              </Pressable>
            </View>
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
                      <View>
                        <TextInput
                          style={styles.input}
                          placeholder="Nombre de usuario"
                          value={username}
                          onChangeText={setUsername}
                        />
                        <TouchableOpacity style={styles.save} onPress={handleSubmit}>
                          <Text style={styles.white}>Save changes</Text>
                        </TouchableOpacity>
                      </View>
                    )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap:10,
  },
  inputDiv: {
    gap:5,
  },
  dots: {
    alignItems: "flex-end",
    marginRight: 40
  },
  avatarButton: {
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    color: "white",
    marginRight: 10,
  },
  white: {
    color: "white",
  },
  avatar: {
    alignItems: "center",
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
  logOut: {
    backgroundColor: "red",
    padding: 10,
    paddingHorizontal: 50,
    alignSelf: "center",
    borderRadius:3,
  },
  save: {
    backgroundColor: "#97CE4C",
    padding: 10,
    paddingHorizontal: 50,
    alignSelf: "center",
    borderRadius:3,
  },
  menuOptions: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    position: "absolute",
    top: 35,
    right: 10,
    zIndex: 1,
    minWidth: 150,
  },
});
