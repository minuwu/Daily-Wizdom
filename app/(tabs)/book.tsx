import { FlatList } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { data } from '@/constants/Data';
import { Block } from '@/components/Block';

const ITEM_HEIGHT = 92;

const getDayOfYear = (): number => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  today.setFullYear(2024); startOfYear.setFullYear(2024);
  const dayOfYear= Math.floor(( today.getTime() - startOfYear.getTime() )/ (1000* 60* 60* 24) );
  return dayOfYear;
}


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