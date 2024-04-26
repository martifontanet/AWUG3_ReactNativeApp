import Constants from "expo-constants";
import { StyleSheet, View, Text } from "react-native";
import Avatar from "./components/Avatar";
import Mark from "./components/Mark";

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
      <ShowComponent name="Componente 1">
        <Avatar name="Paula Rodriguez" />
        <Avatar name="Joan Roca" color="#B255DE" />
      </ShowComponent>
      <ShowComponent name="Componente 2">
        <Mark unread={true} />
        <Mark unread={false} />
        <Mark double={true} />
        <Mark unread={true} size={32} />
        <Mark unread={false} size={32} />
        <Mark double={true} size={32} />
      </ShowComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#f1f1f1",
    gap: 10,
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
