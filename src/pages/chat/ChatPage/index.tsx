import "./chatpage.scss";
import PartnerHead from "@components/chat/PartnerHead";
import MessageInput from "@components/chat/MessageInput";
import Message from "@components/chat/Message";
import TodayBar from "@components/chat/TodayBar";
import SystemMessage from "@components/chat/SystemMessage";
import { url, mockMessage } from "./_mock";
export default function ChatPage() {
  return (
    <div className="chat-page-style">
      <PartnerHead userName="User name" profileImgUrl={url} />
      <div className="message-container">
        {mockMessage.map((m, idx) => {
          let type = "my";
          if (idx % 2 === 0) {
            type = "partner";
          }
          return <Message message={m} messageType={type} />;
        })}
        <TodayBar />
        <SystemMessage type="feedback" />
      </div>
      <MessageInput meetupBtnVisible={true} />
    </div>
  );
}
