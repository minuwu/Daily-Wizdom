
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Wizdom }  from '@/hooks/useQuote';
import { SafeAreaView, ScrollView } from 'react-native';

export default function BlockView({wizdom} : {wizdom: Wizdom}){
    return <SafeAreaView className="justify-center items-center">
      <ThemedView className="p-4 rounded text-center shadow-lg shadow-cyan-500/50">
        <ThemedView className="mt-8 text-center">
          <ThemedText type='default' className="text-center">
            {wizdom.month+" "+wizdom.date}  
          </ThemedText> 
        </ThemedView>
        <ThemedView>      
          <ThemedText type='subtitle' className="text-center italic my-2">{wizdom.title}</ThemedText>
        </ThemedView>
        {wizdom.quote.body.trim() && 
        <ThemedView>      
          <ThemedText type='default' className="my-1 italic text-sm text-center text-gray-500">{wizdom.quote.body} - "{wizdom.quote.name}"</ThemedText>
        </ThemedView>
        }
        <ScrollView className="flex-1 bg-gray-200 dark:bg-gray-900 rounded-md">  
          <ThemedView className="bg-gray-200 dark:bg-gray-900 h-full justify-center content-center my-auto mx-2 mt-4 rounded-md">
            <ThemedText type='default' className="bg-inherit min-h-full m-2 my-auto text-sm text-justify break-words text-wrap text-pretty">{wizdom.story}</ThemedText>
          </ThemedView>    
        </ScrollView>
        <ThemedView>      
          <ThemedText type='defaultSemiBold' className="text text-center bold mt-2 text-balance">Daily Law: {wizdom.dailyLaw}</ThemedText>
        </ThemedView>
        <ThemedView>      
          <ThemedText type='default' className="text-sm text-center italic text-xs">{wizdom.source}</ThemedText>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
}
  