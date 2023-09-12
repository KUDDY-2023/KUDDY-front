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
  const [profile, setProfile] = useRecoilState(userInfoState); // 전역

  const [myEmail, setMyEmail] = useState<string>("");
  const [myNickname, setMyNickname] = useState<string>("");

  const [isOpenBottomModal, setIsOpenBottomModal] = useState(false);

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

  const { roomId } = useParams();

  // 메세지 목록
  const [MessageArr, setMessageArr] = useState<IGetMessage[]>([]);
  const [FlightMessageArr, setFlightMessageArr] = useState<IGetMessage[]>([]);

  // 스크롤 관련
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const initialRenderRef = useRef(true);
  useEffect(() => {
    if (initialRenderRef.current && messageEndRef.current) {
      initialRenderRef.current = false;
      messageEndRef.current.scrollIntoView({
        behavior: "instant" as ScrollBehavior,
      });
      return;
    }

    if (messageEndRef.current)
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [FlightMessageArr]);

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

  useEffect(() => {
    console.log("ㅍ로필이 왜 자꾸 바뀌는걸까 ", profile);
  }, [profile]);

  useEffect(() => {
    console.log("채팅 리스트 저장", MessageArr);
  }, [MessageArr]);

  // 기존 메세지 내역 가져오기
  useEffect(() => {
    if (data) {
      setMessageArr(data);
    }
  }, [data]);

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

  const _handleCloseModal = () => {
    setIsOpenBottomModal(false);
  };
  const _handleOpenBottomModal = () => {
    setIsOpenBottomModal(true);
    console.log("열기");
  };

  const client = useRef<CompatClient>();
  const subscribe = useRef<StompSubscription>();

  const token = window.localStorage.getItem("accessToken") as string;

  // 구독 이벤트로 발생한 메세지 추가
  const handleMessage = (newmsg: IMessage) => {
    let body = JSON.parse(newmsg.body);
    console.log("구독 후 받아온 거 >>", body);
    body = {
      ...body,
      mine: body.senderEmail === myEmail,
    };

    // 상대방한테서 온 이벤트면 저장
    if (body.senderEmail !== myEmail) {
      console.log(body.senderEmail, "??", myEmail);
      setFlightMessageArr(prevMessageArr => [...prevMessageArr, body]);
    }
  };

  // 내 메세지 바로 화면에 반영하기
  const handleMyMessage = (newmsg: any) => {
    newmsg = {
      ...newmsg,
      mine: newmsg.senderEmail === myEmail,
    };

    setFlightMessageArr(prevMessageArr => [...prevMessageArr, newmsg]);
  };

  useEffect(() => {
    console.log("✅", FlightMessageArr);
  }, [FlightMessageArr]);

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

  // 소켓 연결과 프로필 가져오기
  useEffect(() => {
    getProfile(); // 이메일과 내 닉네임 가져오기

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

  // useEffect(() => {
  //   const preventGoBack = () => {
  //     //window.history.go(1);
  //     console.log("prevent go back!");
  //   };

  //   // window.history.pushState(null, "", window.location.href);
  //   window.addEventListener("popstate", preventGoBack);

  //   return () => window.removeEventListener("popstate", preventGoBack);
  // }, []);

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
      />
      <PartnerHead userName="User name" profileImgUrl={url} />

      <div className="message-container">
        {/* <ConfirmedRequestMessage info={tempInfo} />
        <RequestMessage info={tempInfo2} />
        <TodayBar />
        <button onClick={updateMessage}>상태 변화 테스트</button>
        <SystemMessage type="feedback" /> */}

        {MessageArr?.map((msg: IGetMessage) => {
          if (msg.contentType === "TEXT" && msg.mine)
            return <Message message={msg} messageType={"my"} />;
          if (msg.contentType === "TEXT" && !msg.mine)
            return <Message message={msg} messageType={"partner"} />;
          if (msg.contentType === "MEETUP")
            return <RequestMessage info={tempInfo2} />;
        })}

        <hr />
        {FlightMessageArr?.map((msg: IGetMessage) => {
          if (msg.contentType === "TEXT" && msg.mine)
            return <Message message={msg} messageType={"my"} />;
          if (msg.contentType === "TEXT" && !msg.mine)
            return <Message message={msg} messageType={"partner"} />;
          if (msg.contentType === "MEETUP")
            return <RequestMessage info={tempInfo2} />;
        })}
      </div>

      <div ref={messageEndRef}></div>

      <MessageInput
        client={client}
        meetupBtnVisible={true}
        onMakeMeetUp={_handleOpenBottomModal}
        roomId={roomId || ""}
        myEmail={myEmail}
        myNickname={myNickname}
        handleMyMessage={handleMyMessage}
      />
    </div>
  );
}
