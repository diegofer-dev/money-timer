import { SplashScreen, Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { useFonts } from 'expo-font'
import { useEffect } from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();
// Los ficheros _layout son usados para definir que componentes de UI como headers, footers, tabs etc seran compartidos entre las diferentes rutas
export default function RootLayout() {

  const colorScheme = useColorScheme(); // React Hook que nos dice si el usuario prefiere Dark Mode o Light Mode
  const [fontLoaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf')
  });

  useEffect(() => {
    if (fontLoaded)
      SplashScreen.hideAsync(); // Escondemos la Splash Screen cuando carguemos las fuentes
  }, [fontLoaded])

  if (!fontLoaded)
    return null;

  return <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(home)" />
    </Stack>
  </ThemeProvider>;
}
