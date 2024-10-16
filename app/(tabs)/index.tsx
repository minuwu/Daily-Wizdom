
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import  useQuote  from '@/hooks/useQuote';
import { SafeAreaView, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { schedulePushNotification } from '../reminder';

export default function Home(){
  let month: string; let day: number; let date : Date = new Date();
  let params = useLocalSearchParams();
  if( Object.keys(params).length != 0){
    let { incomingMonth,incomingDate }= params;
    month = Array.isArray(incomingMonth) ? incomingMonth[0]:incomingMonth;
    day = parseInt(Array.isArray(incomingDate) ? incomingDate[0]: incomingDate); 
  }else{
    date.setMonth(0);
    date.setDate(5);
    month = date.toLocaleString('en-US',{month: 'long'}).toUpperCase();
    day = (date.getDate());
  }
  
  console.log(day, month);
  let wizdom = [];
  wizdom.push(useQuote( false, day, month ));

  return <SafeAreaView className="justify-center items-center">
      <ThemedView className="p-4 rounded text-center shadow-lg shadow-cyan-500/50">
        <ThemedView className="mt-8 text-center">
          <ThemedText type='default' className="text-center">
            {date.toLocaleDateString('en-US',{ month: 'long', day: 'numeric', year:'numeric', hour: '2-digit', minute:'2-digit', second: '2-digit' })}
          </ThemedText> 
        </ThemedView>
        <ThemedView>      
          <ThemedText type='subtitle' className="text-center italic my-2">{wizdom[0].title}</ThemedText>
        </ThemedView>
        {wizdom[0].quote.body.trim() && 
        <ThemedView>      
          <ThemedText type='default' className="my-1 italic text-sm text-center text-gray-500">{wizdom[0].quote.body} - "{wizdom[0].quote.name}"</ThemedText>
        </ThemedView>
        }
        <ScrollView className="flex-1 bg-gray-200 dark:bg-gray-900 rounded-md">  
          <ThemedView className="bg-gray-200 dark:bg-gray-900 h-full justify-center content-center my-auto mx-2 mt-4 rounded-md">
            <ThemedText type='default' className="bg-inherit min-h-full m-2 my-auto text-sm text-justify break-words text-wrap text-pretty">{wizdom[0].story}</ThemedText>
          </ThemedView>    
        </ScrollView>
        <ThemedView>      
          <ThemedText type='defaultSemiBold' className="text text-center bold mt-2 text-balance">Daily Law: {wizdom[0].dailyLaw}</ThemedText>
        </ThemedView>
        <ThemedView>      
          <ThemedText type='default' className="text-sm text-center italic text-xs">{wizdom[0].source}</ThemedText>
        </ThemedView>
      </ThemedView>
  </SafeAreaView>
}