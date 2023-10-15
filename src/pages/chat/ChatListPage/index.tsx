import "./chatlistpage.scss";
import BackNavBar from "@components/_common/BackNavBar";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { chatRooms } from "@services/api/chat";
import calculateTimeDifference from "./calculateTimeDifference";

import Loading from "@components/_common/Loading";
import { useEffect } from "react";

export default function ChatListPage() {
  const navigate = useNavigate();

  // 채팅방 내역 가져오기
  const { data, error, isLoading } = useQuery("chatRooms", chatRooms, {
    refetchOnWindowFocus: true,
    select: data => {
      const list = data?.data.data.sort(
        (a: any, b: any) =>
          b.latestMessage?.sendTime - a.latestMessage?.sendTime,
      );

      return list ? list : [];
    },
    cacheTime: 0,
  });

  const onEnterChatRoom = (roomId: number) => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="chat-list-page">
      <BackNavBar middleTitle="Chat" isShare={false} />
      {isLoading ? (
        <Loading
          backColor="rgba(0, 0, 0, 0)"
          spinnerColor="#FFF798"
          size="80px"
        />
      ) : (
        <div className="chat-list-container">
          {data?.length === 0 && (
            <p className="no-chatroom">No chat rooms available</p>
          )}

          {data?.map((room: IChatRoom) => {
            let chatStyle = room.unReadCount ? "unread" : "read";
            let sendTime = room.latestMessage?.sendTime;

            const timeAgo = calculateTimeDifference(sendTime);

            const latestMessage =
              room.latestMessage?.context === "동행"
                ? "Let's make an appointment!"
                : room.latestMessage?.context.slice(0, 15);

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
                    <p className={chatStyle}>{latestMessage}</p>
                    <p id="time">{timeAgo}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
