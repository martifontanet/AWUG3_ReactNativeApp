import {
    StyleSheet,
    Text,
    View,
  } from "react-native";
  
  export default function Publish() {
    
    return (
        <View style={styles.container}>
          <Text>Publish new Post</Text>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 10,
      gap: 10,
    }
  });
  