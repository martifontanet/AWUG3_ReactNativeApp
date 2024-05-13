import {
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Home() {
  
  return (
      <View style={styles.container}>
        <Text>HOME</Text>
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
  background: {
    
  },
  imageBackground: {
    opacity: 0.2,
  },
});
