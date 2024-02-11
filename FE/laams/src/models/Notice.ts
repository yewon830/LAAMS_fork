export interface Notice {
    noticeNo: bigint;
    managerNo: bigint;
    title: string;
    createdAt: string;
    updatedAt: string;
  }
  
export interface NoticeResponse {
    data: Notice[];
    message: string;
    status: number;
}