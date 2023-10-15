import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./kakao-chat.scss";
import { ReactComponent as KakaoQuestion } from "@assets/logo/chat_helper.svg";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoChat() {
  const location = useLocation();

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
      {location.pathname !== "/community/list" && <KakaoQuestion />}
    </div>
  );
}
