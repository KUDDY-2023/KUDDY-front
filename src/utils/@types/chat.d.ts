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
