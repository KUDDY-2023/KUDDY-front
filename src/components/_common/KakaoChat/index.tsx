import "./kakao-chat.scss";

export default function KakaoChat() {
  return (
    <a id="chat-channel-button" href="javascript:chatChannel()">
      <img
        src="/images/consult_small_yellow_pc.png"
        alt="카카오톡 채널 채팅하기 버튼"
      />
    </a>
  );
}
