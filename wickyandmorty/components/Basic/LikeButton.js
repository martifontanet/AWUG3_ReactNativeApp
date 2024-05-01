import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
//import { favorites } from "../../favorites";
//import { observer } from "mobx-react-lite";

export default function LikeButton() {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {

    if (pressed) {
        setPressed(false);
    }else{
        setPressed(true)
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
      <Ionicons
        name={ pressed ? "heart" : "heart-outline"}
        size={50}
        color="green"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  whenPressing: {
    transform: [{ scale: 0.9 }],
  },
});
