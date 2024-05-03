import Constants from "expo-constants";
import { StyleSheet, ScrollView } from "react-native";
import AppMarti from "./apps/AppMarti"
import AppFranck from "./apps/AppFranck"
import AppAdrian from "./apps/AppAdrian"
import AppAlberto from "./apps/AppAlberto"
import { useFonts } from "expo-font";


export default function App() {

  const [fontLoaded] = useFonts({
    'Inter': require('./assets/fonts/Inter-VariableFont.ttf')
  });

  if (fontLoaded) {
  return (
    <ScrollView style={styles.container}>
      <AppFranck></AppFranck>
      <AppMarti></AppMarti>
      <AppAdrian></AppAdrian>
      <AppAlberto></AppAlberto>
    </ScrollView>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#f1f1f1",
    gap: 10,
  },
  form: {
    flex: 1
  },
  showContainer: {},
  showTitle: {},
  showRow: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 8,
  },
});
