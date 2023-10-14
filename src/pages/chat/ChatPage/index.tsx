import "./chatpage.scss";
import PartnerHead from "@components/Chat/PartnerHead";
import MessageInput from "@components/Chat/MessageInput";
import Message from "@components/Chat/Message";
import TodayBar from "@components/Chat/TodayBar";
import SystemMessage from "@components/Chat/SystemMessage";
import ConfirmedRequestMessage from "@components/Chat/ConfirmedRequestMessage";
import RequestMessage from "@components/Chat/RequestMessage";
import MakeMeetUpModal from "@components/MeetUp/MakeMeetUpModal";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import {
  CompatClient,
  IMessage,
  Stomp,
  StompSubscription,
} from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { useQuery } from "react-query";
import { chatGetAllMessage } from "@services/api/chat";

import { useRecoilState } from "recoil";
import { userInfoState } from "@services/store/auth";

import { profileGetProfile } from "@services/api/profile";
import { useUpdateDefaultProfile } from "@services/hooks/profile";

export default function ChatPage() {
  const [profile, setProfile] = useRecoilState(userInfoState); // 전역 프로필 recoil
  const token = window.localStorage.getItem("accessToken") as string; // 토큰

  const [isOpenBottomModal, setIsOpenBottomModal] = useState(false);

  const [partnerInfo, setPartnerInfo] = useState({
    nickname: "",
    profileImageUrl: "",
  });

  const client = useRef<CompatClient>();
  const subscribe = useRef<StompSubscription>();

  const { roomId } = useParams();

  // 메세지 목록
  const [MessageArr, setMessageArr] = useState<IGetMessage[]>([]);
  const [FlightMessageArr, setFlightMessageArr] = useState<IGetMessage[]>([]);

  // 스크롤 관련
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const initialRenderRef = useRef(true);

  // ⭐ 채팅 내역 가져오는 쿼리
  const { data } = useQuery("messages", () => chatGetAllMessage(roomId || ""), {
    select: data => data?.data.data,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });

  function addDateHistoryToChatList(chatList: any) {
    const todayDate = new Date();
    const todayFormattedDate = `${todayDate.getFullYear()}.${
      todayDate.getMonth() + 1
    }.${todayDate.getDate()}`;

    const newChatList = [];

    for (let i = 0; i < chatList.length; i++) {
      // 이번 채팅
      const currentChat = chatList[i];
      const currentDate = new Date(currentChat.sendTime);
      const formattedDate = `${currentDate.getFullYear()}.${
        currentDate.getMonth() + 1
      }.${currentDate.getDate()}`;

      if (i === chatList.length - 1) {
        // 마지막 요소 - 만약 오늘보다 이전이면
        if (todayFormattedDate != formattedDate) {
          newChatList.push(currentChat);
          newChatList.push({ contentType: "TODAY" });
        } else {
          newChatList.push(currentChat);
        }
        break;
      }

      // 다음 채팅
      const nextChat = chatList[i + 1];
      const nextDate = new Date(nextChat.sendTime);
      const nextFormattedDate = `${nextDate.getFullYear()}.${
        nextDate.getMonth() + 1
      }.${nextDate.getDate()}`;

      // 둘이 비교
      if (formattedDate !== nextFormattedDate) {
        // 날짜 다르면
        newChatList.push(currentChat);
        // 혹시 today는 아닌지 확인하기
        if (todayFormattedDate === nextFormattedDate) {
          newChatList.push({ contentType: "TODAY" });
        } else {
          newChatList.push({ contentType: "DATE", date: nextFormattedDate });
        }
      } else {
        // 같으면
        newChatList.push(currentChat);
      }
    }

    return newChatList;
  }

  // 받아온 메세지 내역 저장
  useEffect(() => {
    if (data) {
      let chatList = data.chatList;
      let receiverInfo = data.receiverInfo;

      const newChatList = addDateHistoryToChatList(chatList);

      setMessageArr(newChatList);
      setPartnerInfo(receiverInfo);
    }
  }, [data]);

  // ⭐ 내 프로필 정보 가져오는 쿼리
  const profileData = useQuery("profile", profileGetProfile, {
    refetchOnWindowFocus: false,
    retry: true,
  });

  const onSave = useUpdateDefaultProfile();

  // 전역 상태 - 내 프로필 정보 저장
  useEffect(() => {
    if (profileData.isSuccess) {
      const res = profileData.data?.data.data;

      let email = res.memberInfo.email;
      let nickname = res.memberInfo.nickname;
      let profileImageUrl = res.memberInfo.profileImageUrl;
      let memberId = res.memberInfo.memberId;
      let role = res.role;

      localStorage.setItem("myEmail", email);

      onSave({
        email: email,
        nickname: nickname,
        profileImageUrl: profileImageUrl,
        memberId: memberId,
        role: role,
      });
    }
  }, [profileData.isSuccess]);

  // 새 메세지 왔을 때의 스크롤
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }
  }, [FlightMessageArr]);

  // 최초 접속 시의 스크롤
  useEffect(() => {
    setTimeout(() => {
      if (initialRenderRef.current && messageEndRef.current) {
        initialRenderRef.current = false;
        messageEndRef.current.scrollIntoView({
          behavior: "smooth",
        });
        return;
      }
    }, 1000);
  }, [MessageArr]);

  // 동행 만드는 모달 닫는 버튼
  const _handleCloseModal = () => {
    setIsOpenBottomModal(false);
  };

  // 동행 만드는 모달 열기 버튼
  const _handleOpenBottomModal = () => {
    setIsOpenBottomModal(true);
  };

  // ✅ 구독) new message 이벤트로 발생한 메세지 반영
  const handleMessage = (newmsg: IMessage) => {
    let body = JSON.parse(newmsg.body);
    const myEmail = localStorage.getItem("myEmail");
    body = {
      ...body,
      mine: body.senderEmail === myEmail,
    };
    // 상대방한테서 온 메세지
    if (body.senderEmail !== myEmail) {
      setFlightMessageArr(prevMessageArr => [...prevMessageArr, body]);
    }
  };

  // new Flight 메세지 바로 화면에 반영하기
  const handleMyMessage = (newmsg: any) => {
    const myEmail = localStorage.getItem("myEmail");

    newmsg = {
      ...newmsg,
      mine: newmsg.senderEmail === myEmail,
    };

    setFlightMessageArr(prevMessageArr => [...prevMessageArr, newmsg]);
  };

  // ✅ 구독) update 이벤트로 발생한 메세지 반영하기
  const handleUpdatedMessage = (updatedMsg: IMessage) => {
    let newMsg = JSON.parse(updatedMsg.body);
    let flag = true;
    // 이미 찾았다면
    MessageArr.forEach(msg => {
      if (msg.id === newMsg.id) flag = false;
    });

    setMessageArr(prevMessageArr => {
      const updatedArr = prevMessageArr.map(msg => {
        if (msg.id === newMsg.id) {
          return newMsg;
        } else {
          return msg;
        }
      });
      return updatedArr;
    });

    if (flag) {
      // 위에서 이미 찾았다면 실행하지 않음
      setFlightMessageArr(prevFlightMessageArr => {
        const updatedFlightArr = prevFlightMessageArr.map(msg => {
          if (msg.id === newMsg.id) {
            return newMsg;
          } else {
            return msg;
          }
        });
        return updatedFlightArr;
      });
    }
  };

  function onConnect() {
    if (client.current) {
      // 구독 - 특정 채팅방의 메세지 내용 받아오기
      subscribe.current = client.current.subscribe(
        `/topic/group/${roomId}`,
        msg => handleMessage(msg),
        {
          Authorization: `Bearer ${token}`,
        },
      );

      // 구독 - 메세지 업데이트 사항 받아오기
      client.current.subscribe(
        `/topic/updates/${roomId}`,
        msg => handleUpdatedMessage(msg),
        {
          Authorization: `Bearer ${token}`,
        },
      );
    }
  }

  function onError() {
    console.log("onError 연결 실패 ");
  }

  // 나갈 때 요청 끊기
  function disconnectStomp(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = "";

    alert("???");
    const email = localStorage.getItem("email"); // 아 이거 별론디..
    fetch(
      `${process.env.REACT_APP_API_HOST}/chat/v1/chatrooms/${roomId}?email=${email}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        keepalive: true,
      },
    );
    if (client.current) {
      client.current.disconnect();
      client.current.deactivate();
    }
    // if (subscribe.current) {
    //   subscribe.current.unsubscribe(); // 구독 끊기
    // }
  }

  // 소켓 연결과 프로필 가져오기
  useEffect(() => {
    // Stomp.over()로 client.current 객체 초기화
    // SocketJS로 웹소켓 연결 구현
    client.current = Stomp.over(() => {
      return new SockJS(`${process.env.REACT_APP_API_HOST}/chat`, null, {
        transports: ["websocket", "xhr-streaming", "xhr-polling"],
      });
    });

    // 소켓 연결
    client.current.connect(
      {
        Authorization: `Bearer ${token}`,
        roomId: roomId,
      },
      onConnect,
      onError,
    );

    // beforeunload 이벤트가 발생할 때 (브라우저를 닫거나 페이지를 떠날 때) 호출되도록 등록
    window.addEventListener("beforeunload", disconnectStomp);
    // document.addEventListener("visibilitychange", disconnectStomp);
    window.addEventListener("popstate", disconnectStomp);

    return () => {
      // 로컬스토리지의 이메일 지우기
      removeEmail();
      // 페이지를 나갈 때 이벤트 리스너 제거
      window.removeEventListener("beforeunload", disconnectStomp);
      //document.removeEventListener("visibilitychange", disconnectStomp);
      window.removeEventListener("popstate", disconnectStomp);

      if (client.current) {
        client.current.disconnect();
        client.current.deactivate();
        client.current.unsubscribe(`/topic/group/${roomId}`);
        client.current.unsubscribe(`/topic/updates/${roomId}`);
      }

      // if (subscribe.current) {
      //   subscribe.current.unsubscribe(); // 구독 끊기
      // }
    };
  }, []);

  /* 연결 끊겼을 때 다시 연결하기 위함 */
  const handleVisibilityChange = () => {
    // if (!document.hidden) {
    //   console.log("다시 돌아옴");
    // }
    // // 대충..가져온 코드
    // if (document.visibilityState === "visible") {
    //   // 웹 앱이 포그라운드로 돌아왔을 때 소켓 재연결 요청
    //   //connectClient(roomId, onNewMessage);
    // }
  };

  const removeEmail = () => {
    // localStorage 비우기
    localStorage.removeItem("myEmail");
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("unload", removeEmail);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("unload", removeEmail);
    };
  }, []);

  return (
    <div className="chat-page-style">
      <MakeMeetUpModal
        isModalOpen={isOpenBottomModal}
        onClose={_handleCloseModal}
        client={client}
        roomId={roomId || ""}
        myEmail={profile.email}
        myNickname={profile.nickname}
        memberId={profile.memberId}
        handleMyMessage={handleMyMessage}
      />
      <PartnerHead
        userName={partnerInfo.nickname}
        profileImgUrl={partnerInfo.profileImageUrl}
      />

      <div className="message-container">
        {/* 기존 메세지 렌더링 */}
        {MessageArr?.map((msg: IGetMessage) => {
          if (msg.contentType === "TEXT") {
            return (
              <Message
                message={msg}
                messageType={msg.mine ? "my" : "partner"}
              />
            );
          } else if (msg.contentType === "MEETUP") {
            if (msg.meetStatus === "NOT_ACCEPT") {
              if (profile.role === "KUDDY") {
                return (
                  <RequestMessage
                    client={client}
                    info={msg}
                    myEmail={profile.email}
                    statusType={"KUDDY_NOT_ACCEPT"}
                  />
                );
              } else if (profile.role === "TRAVELER") {
                return (
                  <RequestMessage
                    client={client}
                    info={msg}
                    myEmail={profile.email}
                    statusType={"TRAVELER_NOT_ACCEPT"}
                  />
                );
              }
            } else if (
              msg.meetStatus === "PAYED" ||
              msg.meetStatus === "COMPLETED" ||
              msg.meetStatus === "KUDDY_CANCEL" ||
              msg.meetStatus === "TRAVELER_CANCEL"
            ) {
              return (
                <ConfirmedRequestMessage
                  info={msg}
                  statusType={msg.meetStatus}
                />
              );
            }
          } else if (
            msg.contentType === "DATE" ||
            msg.contentType === "TODAY"
          ) {
            // 여기 바꾸기
            return <TodayBar date={msg.date} />;
          }
        })}

        {/* 새로운 메세지 */}
        {FlightMessageArr?.map((msg: IGetMessage) => {
          if (msg.contentType === "TEXT") {
            return (
              <Message
                message={msg}
                messageType={msg.mine ? "my" : "partner"}
              />
            );
          }
          if (msg.contentType === "MEETUP") {
            if (msg.meetStatus === "NOT_ACCEPT") {
              if (profile.role === "KUDDY") {
                return (
                  <RequestMessage
                    client={client}
                    info={msg}
                    myEmail={profile.email}
                    statusType={"KUDDY_NOT_ACCEPT"}
                  />
                );
              } else if (profile.role === "TRAVELER") {
                return (
                  <RequestMessage
                    client={client}
                    info={msg}
                    myEmail={profile.email}
                    statusType={"TRAVELER_NOT_ACCEPT"}
                  />
                );
              }
            } else if (
              msg.meetStatus === "PAYED" ||
              msg.meetStatus === "COMPLETED" ||
              msg.meetStatus === "KUDDY_CANCEL"
            ) {
              return (
                <ConfirmedRequestMessage
                  info={msg}
                  statusType={msg.meetStatus}
                />
              );
            }
          }
          return null;
        })}
      </div>

      <div ref={messageEndRef}></div>

      <MessageInput
        client={client}
        meetupBtnVisible={profile.role === "KUDDY"}
        onMakeMeetUp={_handleOpenBottomModal}
        roomId={roomId || ""}
        myEmail={profile.email}
        myNickname={profile.nickname}
        myId={profile.memberId}
        handleMyMessage={handleMyMessage}
      />
    </div>
  );
}
