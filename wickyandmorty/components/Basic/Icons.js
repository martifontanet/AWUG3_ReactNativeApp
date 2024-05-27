import Ionicons from "@expo/vector-icons/Ionicons";

export default function Icon({ name, focused, size }) {
  return (
    <Ionicons
      name={ focused ? `${name}` : `${name}-outline`}
      size={size}
      color= "#97CE4C"
    />
  );
}
