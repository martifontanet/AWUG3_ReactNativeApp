import { StyleSheet, View, Text } from "react-native";
import CharacterDetail from "../components/Card/CharacterDetails";
import perfil from "../assets/FotoPerfil.jpg";
import CharIMG from "../assets/morty.jpg";
import ProfilePicture from "../components/Basic/FotoPerfil";
import LikeButton from "../components/Basic/LikeButton";
import FavoriteButton from "../components/Basic/LikeFavIcon";
import Button from "../components/Basic/Boton";
import Dropdown from "../components/Basic/BotonDesplegable";
import StatusLabel from "../components/Basic/StatusLabel";
import CharacterCard from "../components/Card/CharacterCard";
import EpisodeDetail from "../components/Card/EpiLocDetails";


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
        <Dropdown
          const data = {[
            { label: 'Season 1', value: '1' },
            { label: 'Season 2', value: '2' },
            { label: 'Season 3', value: '3' },
            { label: 'Season 4', value: '4' },
            { label: 'Season 5', value: '5' },
          ]}
        />
      </ShowComponent>

      <ShowComponent name="Componente etiqueta de estado">
        <StatusLabel title = "alive" status="alive" />
      </ShowComponent>

      <Text style={styles.showTitle}>Componente tarjeta de personaje</Text>
      <CharacterCard image={CharIMG} character="Morty" status="Alive" />

      <Text style={styles.showTitle}>Componente tarjeta de episodios y localidad</Text>
      <CharacterCard character="Lawnmower Dog"/>

      <ShowComponent name="Componente detalle de episodio">
        <EpisodeDetail  
          title="Lawnmower Dog"
          release="December 12, 2013"
          season="S01E02"
          characters="aqui poner la lista de personajes"
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
