import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Pressable, Appearance, Linking } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteDisplay from '@/components/NoteDisplay';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);
  const [activeTheme, setActiveTheme] = useState('light');

  useEffect(() => {
    const loadTheme = async () => {
      try {
        let activeTheme = await AsyncStorage.getItem('appTheme');
        setActiveTheme(activeTheme || 'dark');
      } catch (error) {
        console.log(error);
      }

      if (theme == null) {
        Appearance.setColorScheme(colorScheme);
        setActiveTheme("system");
        await AsyncStorage.setItem('appTheme', 'system');
      }
      if (theme == 'dark') {
        Appearance.setColorScheme('dark');
        setActiveTheme("dark");
        await AsyncStorage.setItem('appTheme', 'dark');
      }
      if (theme == 'light') {
        Appearance.setColorScheme('light');
        setActiveTheme("light");
        await AsyncStorage.setItem('appTheme', 'light');
      }
    }
    loadTheme();
  }, [theme]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={370} name="logo-github" style={styles.headerImage} />}>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText>
          <Link href="../reminder"> set reminder </Link>
        </ThemedText>
      </ThemedView>

      {/* Note Section */}
      <ThemedView>
        <NoteDisplay />
      </ThemedView>

      <ThemedView>
        <ThemedText type="default" className="text-xl bold mt-2">Change Theme</ThemedText>
        <ThemedView className="flex flex-row justify-between my-4 h-8">
          <Pressable className="w-[30%] bg-slate-200 rounded-md border border-lg flex-col justify-center items-center dark:bg-gray-800 shadow-md shadow-black dark:shadow-white" onPress={() => { setTheme('light') }}>

            <ThemedText>
              <Ionicons name={activeTheme == "light" ? "sunny" : "sunny-outline"} className="px-4" />
              LIGHT
            </ThemedText>
          </Pressable>
          <Pressable className="w-[30%] bg-slate-200 rounded-md border border-lg flex-col justify-center items-center dark:bg-gray-800 shadow-md shadow-black dark:shadow-white" onPress={() => { setTheme(null) }}>
            <ThemedText>
              <ThemedText className="text-bold">SYSTEM</ThemedText>
              <Ionicons name={activeTheme == "system" ? "sync-circle" : "sync-circle-outline"} style={{ marginLeft: 4 }} />
            </ThemedText>
          </Pressable>
          <Pressable className="w-[30%] bg-slate-200 rounded-md border border-lg flex-col justify-center items-center dark:bg-gray-800 shadow-md shadow-black dark:shadow-white" onPress={() => { setTheme('dark') }}>
            <ThemedText>
              <ThemedText className="text-bold">DARK</ThemedText>
              <Ionicons name={activeTheme == "dark" ? "moon" : "moon-outline"} style={{ marginLeft: 4 }} />
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>

      <ThemedView>
        <ThemedText type="default" className="text-xl bold mt-2">Developed By</ThemedText>
        <ThemedView className="flex flex-row justify-between my-4 h-8">
          <Pressable
            className="w-[100%] bg-slate-200 rounded-md border border-lg flex-col justify-center items-center dark:bg-gray-800 shadow-md shadow-black dark:shadow-white"
            onPress={() => Linking.openURL('https://github.com/minuwu')}
          >
            <ThemedText>
              <Ionicons name="logo-github" size={20} /> Mohammad Minhazul Abedin
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
      <ThemedView>
        <ThemedText className='text-xl italic'>
          About Section
        </ThemedText>
        <ThemedText>
          This project intends to give a digital experience of the original book. This project upholds the very core flavor of visuals and taste.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#0504aa',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});