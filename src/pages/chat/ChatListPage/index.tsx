import "./chatlistpage.scss";
import BackNavBar from "@components/_common/BackNavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { chatListData } from "./chatListData";

import { useQuery } from "react-query";
import { useGetChatRooms } from "@services/hooks/chat";
import { chatRooms } from "@services/api/chat";
import calculateTimeDifference from "./calculateTimeDifference";

export default function ChatListPage() {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery("chatRooms", chatRooms, {
    select: data =>
      data?.data.data.sort((a: any, b: any) => b.regDate - a.regDate), // 최신순으로 정렬
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
          let sendAt = room.latestMessage?.sendAt;

          const { beforeTime, dateUnit } = calculateTimeDifference(sendAt);

          return (
            <div
              className="chat-list"
              key={room.chatRoomId}
              onClick={() => onEnterChatRoom(room.chatRoomId)}
            >
              <div className="profile">
                <img src={room.participant.profile} alt="profile-img" />

                {!!room.unReadCount && <span></span>}
              </div>
              <div className="info">
                <div id="name">{room.participant.nickname}</div>
                <div className="flex">
                  <p className={chatStyle}>{room.latestMessage?.context}</p>
                  <p id="time">
                    {beforeTime} {dateUnit} ago
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
