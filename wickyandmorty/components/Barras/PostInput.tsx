import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

interface Props {
  onSubmit: (content: string, image: string) => void;
}

export default function PostInput({ onSubmit }: Props) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Descripcion"
      />
      <TouchableOpacity style={styles.buton} onPress={handlePickImage}>
        <Text>Sube una imagen</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button
        title="Publicar"
        onPress={() => {
          onSubmit(content, image);
          setContent("");
          setImage("");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  input: {
    borderColor: "green",
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
  },
  buton: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderColor: "green",
    borderWidth: 5,
  },
});
