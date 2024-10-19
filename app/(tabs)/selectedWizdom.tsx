
import  useQuote, { monthIdx }  from '@/hooks/useQuote';
import { useLocalSearchParams } from 'expo-router';
import BlockView from '@/components/BlockView';

export default function selectedWizdom(){
  let month: string; let day: number; let date : Date = new Date();
  let params = useLocalSearchParams();
  if( Object.keys(params).length != 0){
    let { incomingMonth,incomingDate }= params;
    month = Array.isArray(incomingMonth) ? incomingMonth[0]:incomingMonth;
    day = parseInt(Array.isArray(incomingDate) ? incomingDate[0]: incomingDate); 
  }else{
    month = monthIdx[date.getMonth()];
    day = (date.getDate());
  }

  let wizdom = [];
  wizdom.push(useQuote( false, day, month ));

  return <BlockView wizdom={wizdom[0]}/>
}