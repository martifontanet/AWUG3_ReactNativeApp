import { useColorScheme } from 'react-native';
import { colors } from '../utils/colors';

export default function useThemeColors() {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme] || colors.light; // Default to light if colorScheme is null
  return themeColors;
}
