import { useCallback } from 'react'

const useCalendar = (curDate : Date, setCurDate: (curDate: Date) => void) => {
    //TODO : 이전 달 호출
    //FIXME : 데이터 갱신
    const handlePrev = useCallback(()=>{
      let year = curDate.getFullYear();
      let month = curDate.getMonth();
      if(month === 0){
        month = 11;
        year--;
      }else{
        month--;
      }
      setCurDate(new Date(year,month,1));
    },[curDate, setCurDate]);
  
    //TODO : 다음달 호출
    //FIXME : 데이터 갱신
    const handleNext = useCallback(()=>{
      let year = curDate.getFullYear();
      let month = curDate.getMonth();
      if(month === 11){
        month = 0;
        year++;
      }else{
        month++;
      }
      setCurDate(new Date(year,month,1));
    },[curDate, setCurDate])
  
    return {handlePrev, handleNext} 
}

export default useCalendar