import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Icon from "./Icons";

export default function CheckBox() {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {

    if (pressed) {
        setPressed(false);
        alert("Conditions not accepted !");
    }else{
        setPressed(true)
        alert("Conditions accepted!");
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
      <Icon size={20} name="square" focused={pressed} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  whenPressing: {
    transform: [{ scale: 0.9 }],
  },
});
