import React, {useRef, useState} from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

interface Props {
    onSubmit: (content: string) => void;
}

export default function PostInput({ onSubmit }: Props)  {

  const [content, setContent] = useState('');
  //const inputRef = useRef();
  //const [selectedFile, setSelectedFile] = useState(null);

  return (
    <View>
      <TextInput style={styles.input} value={content} onChangeText={setContent} />
      <Button title="Publicar" onPress={() => {
        onSubmit(content)
        setContent('')
      }} />

      {/* Hidden file input element 
      <input type="file" ref={inputRef} style={{ display: "none" }} />

      {/* Button to trigger the file input dialog  
      <button className="file-btn"> <Text> Upload File</Text> </button>

      <div className="selected-file">
          <Text>File Name Here</Text>

      
          <button>
              <Text>delete</Text> 
          </button>
      </div>*/}
    </View>

  ); 
};
 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 10,
      gap: 10,
    },
    input: {
      borderColor: 'green',
      borderWidth: 1,
      padding: 8,
    }
  });