import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Icon from "./Icons";
//import { favorites } from "../../favorites";
//import { observer } from "mobx-react-lite";

export default function FavoriteButton() {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    if (pressed) {
      setPressed(false);
      alert("Not favorite anymore !");
    } else {
      setPressed(true);
      alert("Added to favorite !");
    }
    //setPressed(false);
    //favorites.toggle(gifId);
  };

  const handlePressIn = () => {
    setPressed(true);
  };

  return (
    <Pressable
      onPress={handlePress}
      //onPressIn={handlePressIn}
      style={pressed && styles.whenPressing}
    >
      <Icon name="star" size={40} focused={pressed} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  whenPressing: {
    transform: [{ scale: 0.9 }],
  },
});
