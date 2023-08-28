import "./chatpage.scss";
import PartnerHead from "@components/Chat/PartnerHead";
import MessageInput from "@components/Chat/MessageInput";
import Message from "@components/Chat/Message";
import TodayBar from "@components/Chat/TodayBar";
import SystemMessage from "@components/Chat/SystemMessage";
import ConfirmedRequestMessage from "@components/Chat/ConfirmedRequestMessage";
import RequestMessage from "@components/Chat/RequestMessage";
import BottomUpModalLayout from "@components/MeetUp/BottomUpModalLayout";
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
      <BottomUpModalLayout
        isOpen={isOpenBottomModal}
        onClose={_handleOpenBottomModal}
      />
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

        {mockMessage.map((m, idx) => {
          let type = "my";
          if (idx % 2 === 0) {
            type = "partner";
          }
          return <Message message={m} messageType={type} />;
        })}
      </div>

      <MessageInput
        meetupBtnVisible={true}
        onMakeMeetUp={_handleOpenBottomModal}
      />
    </div>
  );
}
