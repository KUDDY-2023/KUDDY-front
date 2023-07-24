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
