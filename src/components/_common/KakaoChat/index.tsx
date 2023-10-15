import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./kakao-chat.scss";
import kakaoQuestion from "@assets/logo/question_large_yellow_mobile.png";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoChat() {
  const location = useLocation();

  // console.log(location);

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
      {location.pathname !== "/community/list" && (
        <img src={kakaoQuestion} alt="카카오톡 채널 채팅하기 버튼" />
      )}
    </div>
  );
}
