interface ISingleMessage {
  id: string | null;
  roomId: string;
  contentType: string;
  content: string;
  senderName: string;
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
    sendAt: number;
  };
  unReadCount: 0;
}
