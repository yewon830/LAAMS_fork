import { useCallback, useState } from 'react'
import useApi from '../useApi'
import { useSelector } from 'react-redux';
import { RootState } from '../../Models/ReduxRootState';
import { Exam, MonthlyExamList } from '../../Models/Exam';


const useDirectorExam = (curDate : Date) :[MonthlyExamList, Exam[],() => Promise<number | undefined>,() => Promise<void>,() => Promise<void>]=> {
    const [examList, setExamList] = useState<MonthlyExamList>([]);
    const [todayExamList, setTodayExamList] = useState<Exam[]>([]);
    const userId :string = useSelector((state: RootState)=>state.User.memberId);
    const api = useApi();

    //TODO : 감독관 NO 얻어오는 요청 API
    const getDirectorInfo = useCallback<() => Promise<number | undefined>>(async()=>{
        if(!userId || !api){
          return
        }
        const response = await api.get(`member/info/${userId}`);
        return response.data.data.memberNo;
      },[api,userId])


    // TODO : 오늘자의 감독관 담당 시험(5개) 조회
    const getTodayExamList = useCallback<() => Promise<void>>(async()=>{
      const directorUserNo = await getDirectorInfo();
      const today = new Date();
      api.get(`director/${directorUserNo}/exams?year=${today.getFullYear()}&month=${today.getMonth()+1}&day=${today.getDate()}`)
      .then(({data})=>{
        setTodayExamList(data.data.slice(0,5))
      }).catch((err)=>{console.log(err)})
      
    },[api,getDirectorInfo])

    // TODO : 해당 감독관의 시험 일정 월별 조회.
    const getExamList = useCallback<() => Promise<void>>(async()=>{
      const directorUserNo = await getDirectorInfo();
      await api.get(`director/${directorUserNo}/exams?year=${curDate.getFullYear()}&month=${curDate.getMonth()+1}`)
      .then(({data})=>{
        const res :MonthlyExamList = {};
        data.data.forEach((e : Exam)=>{
          const date = new Date(e.examDate);
          if(res[date.getDate()]){
            res[date.getDate()].push({
              centerName : e.centerName,
              centerRegion : e.centerRegion,
              examDate : new Date(e.examDate),
              endExamDate : new Date(e.endExamDate),
              examType : e.examType,
              examLanguage : e.examLanguage,
              examNo: e.examNo
            });
          }else{
            res[date.getDate()]=[{
              centerName : e.centerName,
              centerRegion : e.centerRegion,
              examDate : new Date(e.examDate),
              endExamDate : new Date(e.endExamDate),
              examType : e.examType,
              examLanguage : e.examLanguage,
              examNo: e.examNo
            }];
          }
        });
        setExamList(res);
      }).catch(err=>console.log(err.response));
    },[api,getDirectorInfo,curDate,setExamList]);
  
    return [examList, todayExamList, getDirectorInfo, getTodayExamList,getExamList];
}

export default useDirectorExam