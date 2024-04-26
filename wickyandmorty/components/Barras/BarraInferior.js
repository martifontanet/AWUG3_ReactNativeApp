import { View, Text, StyleSheet, Image } from "react-native";
export default function Avatar({ name, image, color }) {
  //const props = {name: 'Paula Rodriguez', size: 32}
  //console.log("props:", props);
  //const { name } = props;

  if (image) {
    return <Image source={image} style={styles.container} />;
  } else {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("");
    //console.log("initials", initials);

    return (
      <View
        style={[
          styles.container,
          styles.initials,
          color && { backgroundColor: color },
        ]}
      >
        <Text style={styles.text}>{initials}</Text>
      </View>
    );
  }
}

const size = 50;
const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    borderRadius: size / 2,
  },
  initials: {
    backgroundColor: "#559CDE",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 17,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
