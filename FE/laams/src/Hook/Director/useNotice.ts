import { useCallback } from 'react'
import useApi from '../useApi'
import { Notice } from '../../Models/Notice';

// TODO : 감독관 홈, 센터매니저 홈에서 공지사항 읽어오는 커스텀 훅


const useNotice = (setNoticeListData: (notice : Notice[]) => void) => {
    const api = useApi();
    //TODO : 공지사항 (상위 6개) 얻어오는 API
    const getNotice = useCallback(()=>{
    api.get('/notice/list?count=6&page=1')
    .then(({data})=>{
        setNoticeListData(data.data)
    })
    .catch((err)=>{
        console.log(err)
    })
    },[api,setNoticeListData])

    return getNotice
}

export default useNotice
  
  


 
