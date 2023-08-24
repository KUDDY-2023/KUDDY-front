import "./chatpage.scss";
import PartnerHead from "@components/chat/PartnerHead";
import MessageInput from "@components/chat/MessageInput";
import Message from "@components/chat/Message";
import TodayBar from "@components/chat/TodayBar";
import { url, mockMessage } from "./_mock";
export default function ChatPage() {
  return (
    <div className="chat-page-style">
      <PartnerHead userName="User name" profileImgUrl={url} />
      <div className="message-container">
        {mockMessage.map((m, idx) => {
          let type = "my";
          console.log(idx);
          if (idx % 2 === 0) {
            type = "partner";
          }
          return <Message message={m} messageType={type} />;
        })}

        <TodayBar />
      </div>
      <MessageInput meetupBtnVisible={true} />
    </div>
  );
}
