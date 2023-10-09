interface ISingleMessage {
  id: string | null;
  roomId: string;
  senderName: string;
  contentType: string;
  content: string;
  spotContentId: number | null;
  appointmentTime: string | null;
  price: number | null;
  spotName: string | null;
  senderId: number;
  sendTime: number;
  meetStatus: string | null;
  senderEmail: string;
  readCount: number;
  isUpdated: number;
}

interface IGetMessage {
  id: string;
  roomId: number;
  senderName: string;
  contentType: "TEXT" | "MEETUP" | "NOTI" | "TODAY";
  content: string;
  sendDate: number;
  sendTime: number;
  readCount: 0 | 1;
  mine: boolean;
  // 이 밑으론 동행 메세지만
  appointmentTime: string | null; // 2021-11-05 13:47:13.248 이런 형식
  price: null | string;
  meetStatus:
    | null
    | "NOT_ACCEPT"
    | "TRAVELER_CANCEL"
    | "KUDDY_CANCEL"
    | "PAYED"
    | "COMPLETED"
    | "UNKNOWN";

  spotContentId: number | null;
  spotName: string | null;
}

interface ISubNewMessage {
  id: string;
  roomId: number;
  senderName: string;
  contentType: "TEXT" | "MEETUP" | "NOTI";
  content: string;
  readCount: 0 | 1;
  isUpdated: number;
  sendTime: number;
  senderEmail: string;
  // 이 밑으론 동행 메세지만
  appointmentTime: string | null; // 2021-11-05 13:47:13.248 이런 형식
  price: null | string;
  meetStatus:
    | null
    | "TRAVELER_CANCEL"
    | "KUDDY_CANCEL"
    | "PAYED"
    | "COMPLETED"
    | "UNKNOWN";
  spotContentId: number | null;
  spotName: string | null;
}

interface IChatRoom {
  chatRoomId: number;
  createMember: string;
  joinMember: string;
  regDate: number;
  participant: {
    nickname: string;
    profile: string;
  };
  latestMessage: {
    context: string;
    sendTime: number;
  };
  unReadCount: 0;
}
