import "./chatpage.scss";
import PartnerHead from "@components/chat/PartnerHead";
import MessageInput from "@components/chat/MessageInput";
import Message from "@components/chat/Message";
import TodayBar from "@components/chat/TodayBar";
import SystemMessage from "@components/chat/SystemMessage";
import ConfirmedRequestMessage from "@components/chat/ConfirmedRequestMessage";
import RequestMessage from "@components/chat/RequestMessage";
import BottomUpModalLayout from "@components/chat/BottomUpModalLayout";
import { url, mockMessage } from "./_mock";
import { useState } from "react";
export default function ChatPage() {
  let tempInfo = {
    partnerName: "jane",
    place: "Gyeongbokgung Palace",
    placeId: 1,
    date: "2023.06.19  11:00am",
    pay: 18,
    meetStatus: 3,
  };

  let tempInfo2 = {
    partnerName: "jane",
    place: "Gyeongbokgung Palace",
    placeId: 1,
    date: "2023.06.19  11:00am",
    pay: 18,
  };

  const [isOpenBottomModal, setIsOpenBottomModal] = useState(false);
  const _handleOpenBottomModal = () => {
    setIsOpenBottomModal(!isOpenBottomModal);
  };
  return (
    <div className="chat-page-style">
      <BottomUpModalLayout isOpen={isOpenBottomModal} />
      <PartnerHead userName="User name" profileImgUrl={url} />
      <div className="message-container">
        {mockMessage.map((m, idx) => {
          let type = "my";
          if (idx % 2 === 0) {
            type = "partner";
          }
          return <Message message={m} messageType={type} />;
        })}
        <ConfirmedRequestMessage info={tempInfo} />

        <RequestMessage info={tempInfo2} />
        <TodayBar />

        <SystemMessage type="feedback" />
      </div>

      <MessageInput
        meetupBtnVisible={true}
        onMakeMeetUp={_handleOpenBottomModal}
      />
    </div>
  );
}
