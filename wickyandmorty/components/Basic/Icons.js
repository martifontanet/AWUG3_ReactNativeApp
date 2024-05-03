import Ionicons from "@expo/vector-icons/Ionicons";

export default function Icon({ name, focused }) {
  return (
    <Ionicons
      name={ focused ? `${name}` : `${name}-outline`}
      size={35}
      color= "#97CE4C"
    />
  );
}
