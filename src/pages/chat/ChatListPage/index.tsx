import "./chatlistpage.scss";
import BackNavBar from "@components/_common/BackNavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { chatListData } from "./chatListData";

import { useQuery } from "react-query";
import { useGetChatRooms } from "@services/hooks/chat";
import { chatRooms } from "@services/api/chat";
export default function ChatListPage() {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery("chatRooms", chatRooms, {
    select: data => data?.data.data, // 필요한 부분만 추출하여 사용
  });

  const onEnterChatRoom = (roomId: number) => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="chat-list-page">
      <BackNavBar middleTitle="Chat" isShare={false} />
      {isLoading ? <p>로딩</p> : <p>완료</p>}
      <div className="chat-list-container">
        {data?.map((room: IChatRoom) => {
          let chatStyle = room.unReadCount ? "unread" : "read";
          let sendAt = room.latestMessage.sendAt;

          const unixTimestamp = sendAt * 1000;
          // 현재 시간을 얻기
          const currentTime = new Date().getTime();
          // 두 시간 간의 차이 계산 (밀리초 단위)
          const timeDifference = currentTime - unixTimestamp;
          // 밀리초를 분으로 변환하고 절대값으로 처리
          const minutesDifference = Math.abs(
            Math.floor(timeDifference / (60 * 1000)),
          );

          return (
            <div
              className="chat-list"
              key={room.chatRoomId}
              onClick={() => onEnterChatRoom(room.chatRoomId)}
            >
              <div className="profile">
                <img src={room.participant.profile} alt="profile-img" />
                <p>{room.unReadCount}</p>
                {!!room.unReadCount && <span></span>}
              </div>
              <div className="info">
                <div id="name">{room.participant.nickname}</div>
                <div className="flex">
                  <p className={chatStyle}>{room.latestMessage.context}</p>
                  <p id="time">{minutesDifference} minute ago</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
