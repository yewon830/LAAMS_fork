import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Calendar from './Calendar'
import useApi from '../../../Hook/useApi';
import { useNavigate } from 'react-router-dom';
import { useGeoLocation } from '../../../Hook/useGeolocation';
import useCalendar from '../../../Hook/Director/useCalendar';
import useNotice from '../../../Hook/Director/useNotice';
import { Notice } from '../../../Models/Notice';
import useDirectorExam from '../../../Hook/Director/useDirectorExam';


const DirectorHome :React.FC = () => {

  const api = useApi();
  const navigate = useNavigate();
  const geolocation = useGeoLocation();
  const [curDate,setCurDate] = useState(new Date());
  const [noticeListData, setNoticeListData] = useState<Notice[]>([]);
  const {handlePrev, handleNext} = useCalendar(curDate,setCurDate);
  const getNotice = useNotice(setNoticeListData);

  const [examList, todayExamList, ,getTodayExamList,getExamList] = useDirectorExam(curDate);


  //TODO : 해당 감독관의 오늘 시험 일정 
  const showTodayExamList = useMemo(()=>{
    if(todayExamList.length===0){
      return <div>
              <div className='director-home-todo-box-items-text-none'>오늘의 일정이 없습니다</div>
            </div>

    }else{
      return todayExamList.map((e,index)=>{

        return <div className='director-home-todo-box-items' key={index}>
                <div className='director-home-todo-box-items-text'
                onClick={()=>navigate(`/director/exam/${e.examNo}`)}>[{e.examType}]{e.centerName}</div>
                <div className='director-home-todo-box-items-text-region'>({e.centerRegion})</div>
              </div>
      })
    }
  },[todayExamList,navigate])

  // TODO : 공지사항 리스트
  const showNotice = useMemo(()=>{
    if(!noticeListData){
      return <li>공지사항이 없습니다</li>
    }else{
      return noticeListData.map((notice, index) => {
        const createTime = new Date(notice.createdAt);
        const year = createTime.getFullYear();
        const month = createTime.getMonth()+1 <10? '0'+ (createTime.getMonth()+1):createTime.getMonth()+1;
        const day = createTime.getDate() <10? '0' + createTime.getDate():createTime.getDate();
        const hours = createTime.getHours() <10? '0'+createTime.getHours():createTime.getHours();
        const min = createTime.getMinutes() <10? '0'+createTime.getMinutes():createTime.getMinutes(); 
        
        return(
          <div className='director-home-notice-box-items'
          onClick={()=>{
            navigate(`/notice/detail/${notice.noticeNo}`)
          }}
          key={index}>
            <div className='director-home-notice-box-items-title'>{notice.title}</div>
            <div className='director-home-notice-box-items-time'>{year}-{month}-{day} {hours}:{min}</div>
          </div>
        )
    })
  }
  },[noticeListData,navigate])

  // TODO : 현재 위치 정보 얻어옴
  const getLocation = useCallback(async()=>{
    try{
      const location = await geolocation();
      return location
    }catch(err){
      if(err instanceof Error){
        alert(err.message);
      }
    }
  },[geolocation])

  // TODO : 감독관 센터 도착 요청 API 연동
  const handleDirectorAttend = useCallback(async()=>{
    const location = await getLocation();
    api.post('director/exams/attendance/home',
    {latitude: location['latitude'], longitude:location['longitude']})
    .then(()=>{
      alert('센터 도착이 완료되었습니다')
    })
    .catch((err)=>{
      if(err.response.data.message.includes('이미')){
        alert('해당 시험에 이미 출석을 했습니다')
      }else{
        alert(err.response.data.message)
      }

    })
  },[api,getLocation])
  
  useEffect(() => {
    if (!curDate) {
      return;
    }
    
    getExamList();
    getTodayExamList();
    getNotice();
  }, [getNotice, getExamList, getTodayExamList, curDate]);

  return (
    <section className='director-home'>
      <div className='director-home-container'>
        <article className='director-home-task'>
          <div className='director-home-task-title'>시험 일정</div>
          <div className='director-home-task-calendar'>
          <Calendar handleNext={handleNext} handlePrev={handlePrev} curDate={curDate} examList={examList}></Calendar>
          </div>
        </article>
        <article className='director-home-todo'>
          <div className='director-home-todo-title'>오늘 일정</div>
          <div className='director-home-todo-box'>
            <button className='director-home-todo-box-btn'
              onClick={()=>handleDirectorAttend()}>감독관 센터 도착 인증</button>
              {
                showTodayExamList
              }
          </div>
        </article>
        <article className='director-home-notice'>
          <div className='director-home-notice-flex'>
            <div className='director-home-notice-flex-title'>공지사항</div>
            <div className='director-home-notice-flex-additional'
            onClick={()=>{
              navigate('/notice')
            }}
            >+ 더보기</div>
          </div>
          <div className='director-home-notice-box'>
            {
              showNotice
            }  
          </div>
        </article>
        <button className='director-home-btn-hidden'>감독관 센터 도착 인증</button>
      </div>
    </section>
  )
}

export default DirectorHome
