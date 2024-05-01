import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Icon from "./Icons";

export default function LikeButton() {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {

    if (pressed) {
        setPressed(false);
        alert("Not Liked anymore !");
    }else{
        setPressed(true)
        alert("Liked !");
    }
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
      <Icon name="heart" focused={pressed} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  whenPressing: {
    transform: [{ scale: 0.9 }],
  },
});
