import React, {  useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import TabIcon from "../Basic/TabIcons";

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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Description"
      />
      <TouchableOpacity style={styles.buton} onPress={handlePickImage}>
        <Text style={styles.text}>UPLOAD IMAGE</Text>
      </TouchableOpacity>
      {image && (
        <ImageBackground source={{ uri: image }} style={styles.image}>
          <TouchableOpacity style={styles.cross} onPress={() => setImage("")}>
            <TabIcon name="close" tab={false} rounded={true} focused={false} />
          </TouchableOpacity>
        </ImageBackground>
      )}
      <Button
        title="PUBLISH"
        onPress={() => {
          onSubmit(content, image);
          setContent("");
          setImage("");
          alert('Post uploaded!');
        }}
        color='#97CE4C'
        disabled={!content && !image} // Deshabilitar el botón si no hay contenido ni imagen
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  input: {
    borderColor: "#97CE4C",
    borderWidth: 3,
    padding: 8,
    backgroundColor: '#D4EAD0',
  },
  buton: {
    alignItems: "center",
    backgroundColor: "#D4EAD0",
    padding: 10,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
  cross: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  image: {
    height: 200,
    width: 200,
    borderColor: "#97CE4C",
    borderWidth: 5,
    overflow: 'hidden'
  },
});
