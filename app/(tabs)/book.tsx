
import { Image, StyleSheet, Platform, Pressable, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { data } from '@/constants/Data';
import { styled } from 'nativewind';
import { Wizdom } from '@/hooks/useQuote';
import { memo } from 'react';

const StyledPressable = styled(Pressable);
const ITEM_HEIGHT = 50;

const getDayOfYear = (): number => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dayOfYear= Math.floor(( today.getTime() - startOfYear.getTime() )/ (1000* 60* 60* 24) );
  console.log(dayOfYear);
  return dayOfYear;
}

const Block = memo( ({item}:{item: Wizdom}) => {
  return <ThemedView className="h-50 active:bg-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-white-100 rounded px-1 py-1 h-24 -mx-4  shadow-lg shadow-cyan-500/50 dark:shadow-lg">
          <Link push asChild href={{
            pathname: './selectedWizdom',
            params: {
              incomingDate: item.date,
              incomingMonth: item.month
            }
          }}>
            <StyledPressable className="bg-blue-600 transition-color duration-75 active:bg-red-800">
              <ThemedView className="flex-row w-100 h-full">
                <ThemedView className="flex-col bg-red-100 w-[20%] rounded shadow-xl border-black-500 shadow-inner justify-center align-center">
                  <ThemedText className="text-center font-bold text-xl dark:text-red-600">{item.date}</ThemedText>
                  <ThemedText className="text-center dark:text-red-600">{item.month.trim().slice(0,3)}</ThemedText>
                </ThemedView>
                <ThemedView className='flex-1 justify-center align-center'>
                  <ThemedText type="subtitle" className="px-2 italic uppercase text-balance pl-3">{item.title}</ThemedText>
                </ThemedView>
              </ThemedView>
            </StyledPressable>
          </Link>
        </ThemedView>
});

export default function TabOneScreen() {

  return ( <ThemedView className="mt-4 mx-4 pt-8">
    
    {/* // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    //   headerImage={
    //     <Image
    //       source={require('@/assets/images/partial-react-logo.png')}
    //       style={styles.reactLogo}
    //     />
    //   }>

    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type="title">Welcome!</ThemedText>
    //     <HelloWave />
    //   </ThemedView> */}
      <FlatList
        showsHorizontalScrollIndicator = { false }
        showsVerticalScrollIndicator = { false }
        // initialNumToRender={366}
        // maxToRenderPerBatch={50}
        // windowSize={5}
        initialScrollIndex={ getDayOfYear() }
        data = {data}
        keyExtractor={(item) => `${item.month}_${item.date}`}
        renderItem = {({item}) =>{
          return <Block item={item}/>
        }}
        getItemLayout={(data, index) => (
          { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
        )}
      />
      </ThemedView>
    // </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
