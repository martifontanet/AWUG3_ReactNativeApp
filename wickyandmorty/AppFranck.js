import { StyleSheet, View, Text } from "react-native";
import CharacterDetail from "../components/Card/CharacterDetails";
import perfil from "../assets/FotoPerfil.jpg";
import ProfilePicture from "../components/Basic/FotoPerfil";
import LikeButton from "../components/Basic/LikeButton";
import FavoriteButton from "../components/Basic/LikeFavIcon";
import Button from "../components/Basic/Boton";


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
       <ShowComponent name="Componente Detalle personaje">
        <CharacterDetail id = "1"/>
      </ShowComponent>

      <ShowComponent name="Componente Foto perfil">
        <ProfilePicture image = {perfil} user = "Zuko" />
      </ShowComponent>

      <ShowComponent name="Componente boton like">
        <LikeButton />

      </ShowComponent>
      <ShowComponent name="Componente boton favorito">
        <FavoriteButton />
      </ShowComponent>

      <ShowComponent name="Componente boton predeterminado">
        <Button title ="publish" />
      </ShowComponent>

      <ShowComponent name="Componente boton desplegable predeterminado">
        <Button title ="Select season" 
        options= 
        {[
            {title:"season 1"},{title:"season 2"},{title:"season 3"}
        ]}
        />
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
