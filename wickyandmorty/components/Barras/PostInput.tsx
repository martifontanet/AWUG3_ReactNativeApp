import React, {useRef, useState} from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface Props {
    onSubmit: (content: string, image: string) => void;
}

export default function PostInput({ onSubmit }: Props)  {

  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  //const inputRef = useRef();
  //const [selectedFile, setSelectedFile] = useState(null);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container} >
      <TextInput style={styles.input} value={content} onChangeText={setContent} placeholder="Description" multiline numberOfLines={4} />
      <TouchableOpacity style={styles.buton} onPress={handlePickImage}>
        <Text style={styles.text} >UPLOAD IMAGE</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Publish" onPress={() => {
        onSubmit(content, image);
        setContent("");
        setImage("");
        alert('Post uploaded!');
      }}
      color='#97CE4C'
       />

    </View>
  ); 
};
 

const styles = StyleSheet.create({
    container: {
      gap: 15,
      alignContent:'center',
    },
    input: {
      backgroundColor:'#D4EAD0',
      borderWidth: 3,
      borderColor:'#97CE4C',
      borderRadius:2,
      padding: 8,
      marginVertical: 8,
    },
    buton: {
      alignItems: "center",
      marginBottom: 20,
      backgroundColor: '#97CE4C',
      padding: 10,
      borderRadius:2,
    },
    image: {
      height: 100,
      width: 100,
      borderColor: "#97CE4C",
      borderWidth: 3,
    },
    text:{
      fontWeight:'bold',
      color:'white',
    }
    
  });