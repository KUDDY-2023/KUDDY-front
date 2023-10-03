import "./kakao-chat.scss";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoChat() {
  const history = useNavigate();

  const handleChatClick = () => {
    chatChannel();
  };

  const chatChannel = () => {
    if (window.Kakao) {
      window.Kakao.Channel.chat({
        channelPublicId: "_brFxdG",
      });
    } else {
      console.error("Kakao SDK is not loaded.");
    }
  };

  return (
    <div id="chat-channel-button" onClick={handleChatClick}>
      <img
        src="/images/consult_small_yellow_pc.png"
        alt="카카오톡 채널 채팅하기 버튼"
      />
    </div>
  );
}
