import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Pressable, Appearance } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);
 
  useEffect(()=>{
    const loadTheme = async () => {
          if(theme == 'dark'){
            Appearance.setColorScheme('dark');
            await AsyncStorage.setItem('appTheme', 'dark');
          }else{
            Appearance.setColorScheme('light');
            await AsyncStorage.setItem('appTheme', 'light');
          }
      }
      loadTheme();
      console.log("theme changed at explore");
      Appearance.setColorScheme(theme);
  }, [theme]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText>
          <Link href="../reminder"> set reminder </Link>
        </ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText type="default" className="text-xl bold mt-2">Change Theme</ThemedText>
        <ThemedView className="flex flex-row justify-between my-4 h-8">
          <Pressable className="w-[30%] bg-slate-200 rounded-md border border-lg flex-col justify-center items-center dark:bg-gray-800 shadow-md shadow-black dark:shadow-white" onPress={()=>{setTheme('light')}}>

            <ThemedText>
              <Ionicons name={theme=="light"? "sunny" : "sunny-outline"} className="px-4"/>
              LIGHT
            </ThemedText>
          </Pressable>
          <Pressable className="w-[30%] bg-slate-200 rounded-md border border-lg flex-col justify-center items-center dark:bg-gray-800 shadow-md shadow-black dark:shadow-white" onPress={()=>{setTheme(null)}}>
            <ThemedText>
              DEFAULT
            </ThemedText>
          </Pressable>
          <Pressable className="w-[30%] bg-slate-200 rounded-md border border-lg flex-col justify-center items-center dark:bg-gray-800 shadow-md shadow-black dark:shadow-white" onPress={()=>{setTheme('dark')}}>
            <ThemedText>
              <ThemedText className="text-bold">DARK</ThemedText>
              <Ionicons name={theme=="dark"? "moon" : "moon-outline"} style={{marginLeft: 4}}/>
            </ThemedText>
          </Pressable>
         </ThemedView>
      </ThemedView>

      <ThemedView>
        <ThemedText type="default" className="text-xl bold mt-2">Developed By</ThemedText>
        <ThemedView className="flex flex-row justify-between my-4 h-8">
          <Pressable className="w-[100%] bg-slate-200 rounded-md border border-lg flex-col justify-center items-center dark:bg-gray-800 shadow-md shadow-black dark:shadow-white" onPress={()=>{setTheme('light')}}>

            <ThemedText>
            <Ionicons name="logo-github" size={20}/> Mohammad Minhazul Abedin
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
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
