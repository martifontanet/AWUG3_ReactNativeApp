import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabIcon({ name, focused }) {
  return (
    <Ionicons
      name={`${name}-outline`}
      size={35}
      color={focused ? "#97CE4C" : "white"}
    />
  );
}