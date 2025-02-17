import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() =>{
    
  }, [Appearance.getColorScheme()])

  useEffect(() => {
    const loadTheme = async () => {
      try{
        let prevTheme = await AsyncStorage.getItem('appTheme');
        if (prevTheme ==='light') Appearance.setColorScheme('light');
        if (prevTheme ==='dark') Appearance.setColorScheme('dark');
        if (prevTheme == 'system') Appearance.setColorScheme(colorScheme);
      }
      catch(error){
        console.log(error);
      }
    }
    loadTheme();
    if (loaded) {
      setTimeout(()=>{
        SplashScreen.hideAsync();
      }, 1500);
      
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
