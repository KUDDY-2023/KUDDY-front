import "./chatpage.scss";
import PartnerHead from "@components/Chat/PartnerHead";
import MessageInput from "@components/Chat/MessageInput";
import Message from "@components/Chat/Message";
import TodayBar from "@components/Chat/TodayBar";
import SystemMessage from "@components/Chat/SystemMessage";
import ConfirmedRequestMessage from "@components/Chat/ConfirmedRequestMessage";
import RequestMessage from "@components/Chat/RequestMessage";
import MakeMeetUpModal from "@components/MeetUp/MakeMeetUpModal";
import { url, mockMessage } from "./_mock";

import { useState, useEffect, useRef } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { apiClient } from "@services/api";

import {
  CompatClient,
  IMessage,
  Stomp,
  StompSubscription,
} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { profileGetSocialProfile } from "@services/api/profile";

import { useQuery } from "react-query";
import { chatGetAllMessage } from "@services/api/chat";

import { useRecoilState } from "recoil";
import { userInfoState } from "@services/store/auth";
export default function ChatPage() {
  const [profile, setProfile] = useRecoilState(userInfoState); // 전역 프로필 recoil
  const token = window.localStorage.getItem("accessToken") as string; // 토큰

  const [myEmail, setMyEmail] = useState<string>(""); // 현재 유저의 이메일
  const [myNickname, setMyNickname] = useState<string>(""); // 현재 유저의 닉네임
  const [myRole, setMyRole] = useState<"KBUDDY" | "TRAVELER">("TRAVELER"); // 현재 유저의 Role
  const [isOpenBottomModal, setIsOpenBottomModal] = useState(false);

  const client = useRef<CompatClient>();
  const subscribe = useRef<StompSubscription>();

  const { roomId } = useParams();

  // 메세지 목록
  const [MessageArr, setMessageArr] = useState<IGetMessage[]>([]);
  const [FlightMessageArr, setFlightMessageArr] = useState<IGetMessage[]>([]);

  // 스크롤 관련
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const initialRenderRef = useRef(true);

  useEffect(() => {
    console.log("전역 상태!", profile);
  }, []);

  let updateMsg = {
    id: "64fb179e4a4e36075eb150ab",
    roomId: "3",
    contentType: "MEETUP",
    content: "동행",
    senderName: "maru",
    spotContentId: 1,
    appointmentTime: "2021-11-05 13:47:13.248",
    price: 10,
    spotName: "롯데타워",
    senderId: 15,
    sendTime: 16823942839,
    meetStatus: "TRAVELER_CANCEL",
    senderEmail: "dy6578ekdbs@naver.com",
    readCount: 1,
    isUpdated: 1,
  };

  // 유저 정보 가져오기
  const getProfile = async () => {
    const res = await profileGetSocialProfile();

    console.log("요청 좀 해봐 시🔥🔥🔥🔥", res);
    setMyEmail(res.data.data.email);
    setMyNickname(res.data.data.nickname);

    // 전역
    // setProfile(res.data.data);
    // setProfile({ ...profile, nickname: res.data.data.nickname });

    localStorage.setItem("email", res.data.data.email);
  };

  // 채팅 내역 가져오는 쿼리
  const { data, error, isLoading } = useQuery(
    "messages",
    () => chatGetAllMessage(roomId || ""),
    {
      select: data => data?.data.data.chatList,
      refetchOnMount: false,
      refetchOnWindowFocus: false, // 너엿구나 하..
    },
  );

  // 기존 메세지 내역 가져오기
  useEffect(() => {
    if (data) {
      setMessageArr(data);
      console.log("채팅내역", data);
    }
  }, [data]);

  // 스크롤
  useEffect(() => {
    // 최초 접속 시 로딩 속도가 느려서 못내려가는 건가 싶어서 넣어봄
    setTimeout(() => {
      if (initialRenderRef.current && messageEndRef.current) {
        initialRenderRef.current = false;
        messageEndRef.current.scrollIntoView({
          behavior: "smooth",
        });
        return;
      }
    }, 500);

    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }
  }, [FlightMessageArr]);

  // 동행 만드는 모달 닫는 버튼
  const _handleCloseModal = () => {
    setIsOpenBottomModal(false);
  };

  // 동행 만드는 모달 열기 버튼
  const _handleOpenBottomModal = () => {
    setIsOpenBottomModal(true);
  };

  // 구독 이벤트로 발생한 메세지 추가
  const handleMessage = (newmsg: IMessage) => {
    let body = JSON.parse(newmsg.body);
    console.log("구독 후 받아온 거 >>", body);

    body = {
      ...body,
      mine: body.senderEmail === profile.email,
    };
    console.log(">>>>⭐", body);

    // 상대방한테서 온 메세지
    if (body.senderEmail !== profile.email) {
      console.log(body.senderEmail, "??", profile.email); // 🔥 여기서 자꾸 myEmail이 사라져..
      setFlightMessageArr(prevMessageArr => [...prevMessageArr, body]);
    }
  };

  // 내 메세지 바로 화면에 반영하기
  const handleMyMessage = (newmsg: any) => {
    newmsg = {
      ...newmsg,
      mine: newmsg.senderEmail === profile.email,
    };

    setFlightMessageArr(prevMessageArr => [...prevMessageArr, newmsg]);
  };

  function onConnect() {
    if (client.current) {
      console.log("onConnect 연결 성공");

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
        msg => {
          console.log("업데이트 발생");
          // const body = JSON.parse(msg.body);
          // console.log("메세지 업데이트 발생 ! >>>", body);

          // let newMessageArr = [...MessageArr, body];
          // setMessageArr(newMessageArr);
        }, // 받아온 메세지를 처리하는 콜백함수
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
    console.log("실행됨, 현재 이메일은", myEmail);
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

  // useEffect(() => {
  //   getProfile(); // 이메일과 내 닉네임 가져오기
  // }, []);

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

    //getProfile();

    // beforeunload 이벤트가 발생할 때 (브라우저를 닫거나 페이지를 떠날 때) 호출되도록 등록
    window.addEventListener("beforeunload", disconnectStomp);
    // document.addEventListener("visibilitychange", disconnectStomp);
    window.addEventListener("popstate", disconnectStomp);

    return () => {
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

  const updateMessage = () => {
    if (client.current) {
      console.log("업데이트");
      try {
        // ✅ 메세지 상태 업데이트하기
        client.current.send(
          "/app/updateMessage",
          { Authorization: `Bearer ${token}` },
          JSON.stringify(updateMsg),
        );
      } catch (e) {
        alert(e);
      } finally {
        // setIsMapOpen(false);
      }
    }
  };

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
      <PartnerHead userName="User name" profileImgUrl={url} />

      <div className="message-container">
        {/* <ConfirmedRequestMessage info={tempInfo} />
        <RequestMessage info={tempInfo2} />
        <TodayBar />
        <button onClick={updateMessage}>상태 변화 테스트</button>
        <SystemMessage type="feedback" /> */}

        {/* 기존 메세지 렌더링 */}
        {MessageArr?.map((msg: IGetMessage) => {
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
              if (myRole === "KBUDDY") {
                return (
                  <RequestMessage info={msg} statusType={"KUDDY_NOT_ACCEPT"} />
                );
              } else if (myRole === "TRAVELER") {
                return (
                  <RequestMessage
                    info={msg}
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

        <hr />

        {/* 접속 후 받아온 새로운 메세지 */}
        {FlightMessageArr?.map((msg: IGetMessage) => {
          if (msg.contentType === "TEXT" && msg.mine)
            return <Message message={msg} messageType={"my"} />;
          if (msg.contentType === "TEXT" && !msg.mine)
            return <Message message={msg} messageType={"partner"} />;
          if (msg.contentType === "MEETUP")
            return (
              <RequestMessage info={msg} statusType={"KUDDY_NOT_ACCEPT"} />
            );
        })}
      </div>

      <div ref={messageEndRef}></div>

      <MessageInput
        client={client}
        meetupBtnVisible={true}
        onMakeMeetUp={_handleOpenBottomModal}
        roomId={roomId || ""}
        myEmail={profile.email}
        myNickname={profile.nickname}
        handleMyMessage={handleMyMessage}
      />
    </div>
  );
}
