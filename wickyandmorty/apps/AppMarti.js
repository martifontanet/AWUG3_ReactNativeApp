import { StyleSheet, View, Text } from "react-native";
import Header from "../components/Barras/Header";
import FormLogin from "../components/Barras/FormularioLogin";
import BarraLogin from "../components/Barras/BarraLogin";
import Busqueda from "../components/Barras/BarraBusqueda";
import MenuInferior from "../components/Barras/BarraInferior"


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
    <View>
      <ShowComponent name="Componente Header Página">
        <Header showLeftIcon={true}
                verTitulo={true}
                showRightIcon={true}
                tituloPGina="Headeeerrr y mas header"
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
      <ShowComponent name="Identification Buttons">
        <View style={styles.buttonContainer}>
          <BarraLogin 
                      text="google"
                      icon="logo-google"/>
        </View>
        <View style={styles.buttonContainer}>
          <BarraLogin 
                      text="email"
                      icon="mail"/>
        </View>
      </ShowComponent>
      <ShowComponent name="Barra de Busqueda">
        
        <Busqueda  style={styles.form}
                    placehold="Buscar..."
                    keyType="search"
                    autoCom="off"
                    icon="search" />
      </ShowComponent>
      <ShowComponent name="Barra Menu Inferior">
        <MenuInferior></MenuInferior>
      </ShowComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    gap: 10,
  },
  form: {
    flex: 1
  },
  showRow: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 8,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 10, // Intentemos quitar esto
  },
});
