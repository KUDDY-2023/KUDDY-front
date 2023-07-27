interface ChatResponse {
  memberNo: number;
  chatList: Chat[];
}

interface Chat {
  id: string;
  contentType: 'text' | 'picture' | 'coords';
  chatRoomNo: number;
  senderNo: number;
  senderName: string;
  type: number | null;
  content: string;
  sendDate?: number;
  sendTime?: number;
  dateString?: string;
  timeString?: string;
  readCount: number;
  mine: boolean;
}

interface FlightChat {
  type: number | null;
  content: string;
}

interface ChatParticipant {
  username: string;
  profile: string;
}

interface ChatLatestMessage {
  context: string;
  sendAt: number;
}

interface ChatList {
  chatNo: number;
  createMember: number;
  joinMember: number;
  saleNo: number;
  regDate: number;
  participant: ChatParticipant;
  latestMessage: ChatLatestMessage;
  unReadCount: number;
}

interface ChatOnMy extends ChatList {
  saleTitle: string;
}
