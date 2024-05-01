import Constants from "expo-constants";
import { StyleSheet, View, Text } from "react-native";
import Header from "./components/Barras/Header";
import FormLogin from "./components/Barras/FormularioLogin";

function ShowComponent({ name, children }) {
  return (
    <View style={styles.showContainer}>
      <Text style={styles.showTitle}>{name}</Text>
      <View style={styles.showRow}>{children}</View>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <ShowComponent name="Componente Header Página">
        <Header showLeftIcon={true}
                verTitulo={true}
                showRightIcon={true}
                tituloPGina="Headeeerrr"
                 />
      </ShowComponent>
      <ShowComponent name="Input Form">
        <FormLogin  style={styles.form}
                    placehold="Email"
                    keyType="email"
                    autoCom="email" />
        
        <FormLogin  style={styles.form}
                    placehold="Constraseña"
                    password={true}
                    keyType="text"
                    autoCom="current-password" />
      </ShowComponent>
      {/* <ShowComponent name="Componente 2">
        <Mark unread={true} />
        <Mark unread={false} />
        <Mark double={true} />
        <Mark unread={true} size={32} />
        <Mark unread={false} size={32} />
        <Mark double={true} size={32} />
      </ShowComponent> */}
    </View>
  );
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
