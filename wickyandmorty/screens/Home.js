import {
  StyleSheet,
  Dimensions,
  Text,
  View,
} from "react-native";
import BarraBusqueda from "../components/Barras/BarraBusqueda"

export default function Home() {
  
  return (
      <View style={styles.container}>
        <BarraBusqueda></BarraBusqueda>
        <Text style={styles.text}>HOME</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    gap: 10,
    backgroundColor: "#333333",
  },
  text: {
    color: "white",
  }
});
