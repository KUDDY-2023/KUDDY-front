import StompJs from '@stomp/stompjs';

// client 객체
const client = new StompJs.Client({
  brokerURL: 'ws://local.corsmarket.ml/api/ws', // brokerURL이 http 일경우 ws를 https일 경우 wss를 붙여서 사용하시면 됩니다
  connectHeaders: {
    login: 'user',
    passcode: 'password',
  },
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000, //자동 재 연결
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

// 연결 했을 때의 실행 함수
client.onConnect = function (frame) {
  // Do something, all subscribes must be done is this callback
  // This is needed because this will be executed after a (re)connect
};

// 에러 처리 함수
client.onStompError = function (frame) {
  // Will be invoked in case of error encountered at Broker
  // Bad login/passcode typically will cause an error
  // Complaint brokers will set `message` header with a brief message. Body may contain details.
  // Compliant brokers will terminate the connection after any error
  console.log('Broker reported error: ' + frame.headers['message']);
  console.log('Additional details: ' + frame.body);
};

/*
client.activate();
client.deactivate();
*/

// 메세지 보내기
client.publish({
  destination: '/topic/general', // 메세지 보낼 곳
  body: 'Hello world', // 메세지 내용
  headers: { priority: '9' },
});

// 구독한 대상한테서 메세지 받기
const subscription = client.subscribe('/queue/test', () => {}); // callback

/*
*v5부턴 바이너리 메세지 전송도 지원된다고 하네요! (header에 'content-type': 'application/octet-stream')로 contentType을 써줍니다.)

const binaryData = generateBinaryData();
client.publish({
  destination: '/topic/special',
  binaryBody: binaryData,
  headers: { 'content-type': 'application/octet-stream' },
});

*/

/*
if (typeof WebSocket !== 'function') {
  client.webSocketFactory = function () {
    return new SockJS('http://localhost:15674/stomp');
  };
}
이건 소켓 미지원 브라우저 
*/

/*
✅✅ 다른 레퍼런스 일부 

function handleMessage(msg: IMessage) {
  const body: Chat = JSON.parse(msg.body);
  const opponentRead =
    body.readCount === 0 &&
    (body.senderNo === Number(adoptInfo?.author.id)
      ? isMine.current
      : !isMine.current);

  if (
    body.readCount === 0 &&
    (body.senderNo === Number(adoptInfo?.author.id)
      ? isMine.current
      : !isMine.current)
  ) {
    // 새 메시지 읽음여부 갱신 state 갱신은 뒤에서 같이 처리
    newMessageRef.current = newMessageRef.current.map((chat: Chat) => {
      return { ...chat, readCount: 0 };
    });

    // 기존 메시지 읽음여부 갱신
    messageRef.current = messageRef.current.map((chat: Chat) => {
      return { ...chat, readCount: 0 };
    });

    setMessage(messageRef.current);
  }

  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/chatroom/notification`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ ...body, senderEmail: email.current }),
  });

  const DATE = new Date(
    ((body.sendDate || body.sendTime) as number) -
      new Date().getTimezoneOffset() * 60 * 1000,
  );

  body.dateString = `${(DATE.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${DATE.getDate().toString().padStart(2, '0')}`;
  body.timeString =
    DATE.getHours() < 12
      ? `오전 ${DATE.getHours().toString().padStart(2, '0')}:${DATE.getMinutes()
          .toString()
          .padStart(2, '0')}`
      : `오후 ${(DATE.getHours() - 12)
          .toString()
          .padStart(2, '0')}:${DATE.getMinutes().toString().padStart(2, '0')}`;
  newMessageRef.current = [...newMessageRef.current, body];
  setNewMessage(newMessageRef.current);
}

function onConnect() {
  if (client.current) {
    client.current.onDisconnect = () => {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/chatroom/${query.id}?email=${email.current}`,
        {
          method: 'POST',
          keepalive: true,
        },
      );
    };
    subscribe.current = client.current.subscribe(
      `/subscribe/public/${query.id}`,
      handleMessage,
      {
        Authorization: window.localStorage.getItem('accessToken') as string,
      },
    );
    setIsConnected(true);
  }
}

function onError(e: IMessage) {
  alert(e.headers.message);
}

useEffect(() => {
  async function fetchMessage() {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/chatroom/${query.id}`,
      {
        headers: {
          Authorization: window.localStorage.getItem('accessToken') as string,
        },
      },
    );

    let result = await response.json();
    if (!result.status) {
      const msg: Chat[] = result.chatList || [];
      email.current = result.email;
      msg.forEach((message: Chat) => {
        const DATE = new Date(
          ((message.sendDate || message.sendTime) as number) -
            new Date().getTimezoneOffset() * 60 * 1000,
        );

        message.dateString = `${(DATE.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${DATE.getDate().toString().padStart(2, '0')}`;
        message.timeString =
          DATE.getHours() < 12
            ? `오전 ${DATE.getHours()
                .toString()
                .padStart(2, '0')}:${DATE.getMinutes()
                .toString()
                .padStart(2, '0')}`
            : `오후 ${(DATE.getHours() - 12)
                .toString()
                .padStart(2, '0')}:${DATE.getMinutes()
                .toString()
                .padStart(2, '0')}`;
      });
      messageRef.current = msg;
      setMessage(messageRef.current);
    }
  }

  if (window.localStorage.getItem('accessToken')) fetchMessage();
}, []);

useEffect(() => {
  client.current = Stomp.over(() => {
    return new SockJS(`${process.env.NEXT_PUBLIC_SERVER_URL}/chat`, null, {
      transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
    });
  });
  client.current.connect(
    {
      Authorization: window.localStorage.getItem('accessToken') as string,
      chatRoomNo: query.id,
    },
    onConnect,
    onError,
  );

  function disconnectStomp() {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/chatroom/${query.id}?email=${email.current}`,
      {
        method: 'POST',
        keepalive: true,
      },
    );
  }
  window.addEventListener('beforeunload', () => {
    disconnectStomp();
  });

  return () => {
    console.log('disconnected');
    subscribe.current?.unsubscribe({
      Authorization: window.localStorage.getItem('accessToken') as string,
      chatRoomNo: query.id,
    });
    client.current?.disconnect();
  };
}, []);

useEffect(() => {
  async function fetchAdoptDetail() {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/adopt/${query.adoptId}`,
      {
        headers: {
          Authorization: window.localStorage.getItem('accessToken') as string,
        },
      },
    );
    let result = await response.json();
    if (!result.status) {
      setAdoptInfo(result);
      isMine.current = result.mine;
    } else if (result.status === 401) {
      await refresh();
    } else {
      alert(`error : ${result.status}`);
    }
  }
  fetchAdoptDetail();
}, []);

*/
