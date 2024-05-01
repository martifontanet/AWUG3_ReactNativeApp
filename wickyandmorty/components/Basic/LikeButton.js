import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { favorites } from "./favorites";
import { observer } from "mobx-react-lite";

export default observer (function LikeButton({route}) {
  //const [selected, setSelected] = useState(false);
  const [pressed, setPressed] = useState(false);

  const { gifId } = route.params;

  const handlePress = () => {
    //setSelected(!selected);
    // console.log(!selected);
    setPressed(false);
    favorites.toggle(gifId);
  };

  const handlePressIn = () => {
    setPressed(true);
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      style={pressed && styles.whenPressing}
    >
      <Ionicons
        name={favorites.isFavorite(gifId) ? "heart" : "heart-outline"}
        size={26}
        color="blue"
      />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  whenPressing: {
    transform: [{ scale: 0.9 }],
  },
});
