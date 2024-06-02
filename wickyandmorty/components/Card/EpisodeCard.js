import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import StatusLabel from "../Basic/StatusLabel";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function EpisodeCard({ name, labelName, epID }) {
  const navigation = useNavigation();

  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    //console.log("Click!");
    navigation.navigate("EpisodeDetail", { id: epID });
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <View style={[styles.epilocContainer]}>
        <Text style={styles.character}>{name}</Text>
        <StatusLabel status={labelName} showCircle={false} />
      </View>
    </Pressable>
  );
}

const size = 70;
const styles = StyleSheet.create({
  epilocContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#4E4E4E",
    width: 150,
    borderRadius: 10,
    gap: 10,
  },
  img: {
    width: size,
    height: size,
    borderRadius: 10,
  },
  character: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
    marginRight: 10,
  },
});
