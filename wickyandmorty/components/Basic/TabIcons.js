import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabIcon({ name, focused }) {
  return (
    <Ionicons
      name={`${name}-outline`}
      size={24}
      color={focused ? "blue" : "grey"}
    />
  );
}