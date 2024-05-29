import { useColorScheme } from "react-native";
import { colors } from "../utils/colors";

export default function useThemeColors() {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme] || colors.light; 
  return themeColors;
}
