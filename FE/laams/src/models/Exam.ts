export interface Exam{
    examNo : bigint,
    examDate : string,
    runningTime : number,
    endExamDate : string,
    examType : string,
    examLanguage : string,
    centerName : string,
    centerRegion : string
}


export interface CalendarExam{
    centerName : string,
    centerRegion : string,
    examDate : Date,
    endExamDate : Date,
    examType : string,
    examLanguage : string,
    examNo: bigint
}


export interface ExamResponse {
    data: Exam[];
    message: string;
    status: number;
}


export interface MonthlyExamList {
    [key: number] : CalendarExam[]
  }
  

