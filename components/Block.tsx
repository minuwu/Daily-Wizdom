import { Pressable } from 'react-native';
import { memo } from 'react';
import { Wizdom } from '@/hooks/useQuote';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { styled } from 'nativewind';
import { Link } from 'expo-router';
import { monthIdx } from '@/hooks/useQuote';
const StyledPressable = styled(Pressable);
let time = new Date();


export const Block = memo( ({item}:{item: Wizdom}) => {
    return <ThemedView className="active:bg-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-white-100 rounded px-1 py-1 h-24 shadow-lg shadow-cyan-500/50 dark:shadow-lg rounded-sm">
            <Link push asChild href={{
              pathname: './selectedWizdom',
              params: {
                incomingDate: item.date,
                incomingMonth: item.month
              }
            }}> 
              <StyledPressable className={`${time.getDate()==item.date && monthIdx[time.getMonth()]==item.month && 'bg-blue-200'} transition-color duration-75 p-1 active:bg-red-100 rounded`}>
                <ThemedView className="flex-row w-100 h-full rounded-full">
                  <ThemedView className="flex-col bg-red-100 w-[20%] rounded shadow-xl border-black-500 shadow-inner justify-center align-center">
                    <ThemedText className="text-center font-bold text-xl dark:text-red-600">{item.date}</ThemedText>
                    <ThemedText className="text-center dark:text-red-600">{item.month.trim().slice(0,3)}</ThemedText>
                  </ThemedView>
                  <ThemedView className='flex-1 justify-center align-center rounded'>
                    <ThemedText type="subtitle" className="px-2 italic uppercase text-balance pl-3">{item.title}</ThemedText>
                  </ThemedView>
                </ThemedView>
              </StyledPressable>
            </Link>
          </ThemedView>
});
  