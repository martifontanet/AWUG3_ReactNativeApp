// App.js

import Constants from "expo-constants";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Header from "./components/Barras/Header";
import FormLogin from "./components/Barras/FormularioLogin";
import BarraLista from "./components/Barras/BarraLista";
import PostDefault from "./components/Posts/PostDefault";
import Comentario from "./components/Posts/Comentario";

export default function App() {
  return (
    <View style={styles.container}>
      <ShowComponent name="Componente Header Página">
        <Header
          showLeftIcon={true}
          verTitulo={true}
          showRightIcon={true}
          tituloPGina="Headeeerrr"
        />
      </ShowComponent>
      <ShowComponent name="Input Form">
        <FormLogin
          style={styles.form}
          placehold="Email"
          keyType="email"
          autoCom="email"
        />

        <FormLogin
          style={styles.form}
          placehold="Constraseña"
          password={true}
          keyType="text"
          autoCom="current-password"
        />
      </ShowComponent>

      <ShowComponent name="Barra Lista">
        <BarraLista 
          palabras={["Personajes", "Episodios","Lugares"]}
          maxPalabrasSeleccionadas={3}
        />
      </ShowComponent>

      <ShowComponent>
        <BarraLista 
          palabras={["Registrar", "Entrar"]}
          maxPalabrasSeleccionadas={2}
        />
      </ShowComponent>

      <ShowComponent>
        <BarraLista 
          palabras={["For you", "Popular","Recent"]}
          maxPalabrasSeleccionadas={3}
        />
      </ShowComponent>

      <ShowComponent>
        <BarraLista 
          palabras={["Posts", "Guardados"]}
          maxPalabrasSeleccionadas={2}
        />
      </ShowComponent>
      
      <ShowComponent name="PostDefault">
        <PostDefault
          title="Título"
          text="Lorem Ipsum Dolor"
          showPhoto = {false}
        />
      </ShowComponent>

      <ShowComponent name="Comentario">
        <Comentario
          nombreUsuario="Usuario"
          texto="Lorem Ipsum Dolor"
          numLikes={10}
        />
      </ShowComponent>

    </View>

    
  );
}

const ShowComponent = ({ name, children }) => (
  <View style={styles.showContainer}>
    <Text style={styles.showTitle}>{name}</Text>
    <View style={styles.showRow}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#f1f1f1",
    padding: 10,
  },
  form: {
    flex: 1,
    marginBottom: 10,
  },
  showContainer: {
    marginBottom: 10,
  },
  showTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  showRow: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 8,
    borderRadius: 5,
  },
});
