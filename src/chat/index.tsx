import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { useRef, useState } from 'react';

// 채팅 하나의 타입
interface IChatDetail {
  type: string;
  roomId: string;
  sender: string;
  message: string;
}

export default function Chat() {
  let token = '';

  // 이게 채팅 내용인 것 같은데
  const [chatMessageList, setChatMessageList] = useState<IChatDetail[]>([]);

  const client = useRef<CompatClient>(); // 렌더링 최적화를 위해 client를 ref로 설정

  // ✅  connect와 subscribe를 묶은 connectHandler 함수를 방을 클릭해 방에 입장할때 onClick 이벤트 안에 넣어줬다.
  const connectHandler = (mockId: string, mockName: string) => {
    client.current = Stomp.over(() => {
      const sock = new SockJS('http://localhost:8080/ws-stomp'); // 'http://localhost:8080/{백에서 설정한 end point}'
      return sock;
    });

    // setChatMessageList([]);

    client.current.connect(
      {
        Authorization: 'token', // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음.
      },
      () => {
        // callback 함수 설정, 대부분 여기에 sub 함수 씀

        // subscribe 함수는 (주소, 콜백함수 ()=>{}, {헤더}) 로 구성
        // 콜백함수에는 구독한 방에서 publish(발행)한 메세지에 대한 처리를 해주는 곳인데 나는 따로 메세지를 관리하는 state에 넣어줬다.
        /*
        {
            type: string;  // TALK(메세지) or ENTER(입장할 때)
            roomId: string;  // 방의 주소
            sender: string;  // 보낸 사람
            message: string;  // 메세지
        }
        */

        // (messageList: IChatDetail[]) => {

        // ✅ 구독
        client.current!.subscribe(
          `/sub/chat/room/${mockId}`, // `/백엔드와 협의한 api주소/{구독하고 싶은 방의 id}`,
          message => {
            //setChatMessage(JSON.parse(message.body));
          },
          { Authorization: token ? token : '', simpDestination: mockId },
        );
      },
    );

    //setChatName(mockName);
    //setRoomId(mockId);
    //setIsChat(true);
  };

  // ✅ Publish 함수는 (주소, {헤더}, 메세지)로 구성된다.
  // ❗️최근에는 publish대신 send를 사용한다고 한다.
  /**
   * 메세지 형식은 백엔드와 협의해서 정하면 되는데 우리는 위에 말한 타입으로 줬고
    roomId를 확인해서 백에서 해당 room에 메세지를 뿌려주는 형식이다.
   */

  // 이 sendHandler함수를 메세지 보내기 버튼에 onClick이벤트 안에 넣어줬다.
  const sendHandler = () => {
    //console.log("room Id:" + roomId);
    client.current!.send(
      '/백엔드와 협의한 api주소', //  "/pub/chat/message",
      { header: '헤더' },
      JSON.stringify({
        type: 'TALK',
        roomId: 'roomId',
        sender: 'user.name',
        message: 'inputMessage',
      }),
    );

    //handleDeleteInputMessage();
  };

  return <div></div>;
}
