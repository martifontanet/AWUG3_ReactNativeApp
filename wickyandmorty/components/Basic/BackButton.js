import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <Pressable onPress={handlePress}>
      <Ionicons name="chevron-back-outline" size={26} color="blue" />
    </Pressable>
  );
}
