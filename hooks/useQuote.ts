import { data } from '@/constants/Data';

export interface Wizdom {
    "month": string,
    "date": number,
    "title": string,
    "quote": {
      "body": string,
      "name": string
    },
    "story": string,
    "dailyLaw": string,
    "source": string
};

export default function useQuote( random?: boolean, day?: number, month?: string ): Wizdom {
    if(random){
        let randomNumber = () : number => { return Math.floor(Math.random()*366+1) };
        let randomIndex: number = (randomNumber() + randomNumber()  * randomNumber()) % 9 + 1 ;
        console.log(randomIndex);
        return data[randomIndex];
    }else{
        let wizdom = data.filter((_)=>{
            if(_.date==day && _.month.trim().toUpperCase()==month){
             return true;
            }
          })
        if (wizdom.length == 0 ){
            wizdom = data;
        }
        return wizdom[0];
    }
}

