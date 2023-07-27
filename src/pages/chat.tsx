import {ReactElement, useEffect, useRef, useState} from 'react';
import {CompatClient, IMessage, Stomp, StompSubscription} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// import ChatInput from '@/components/chat/chatInput';
// import AdoptInfo from '@/components/chat/adoptInfo';
// import Header from '@/components/chat/header';
// import MessageArea from '@/components/chat/messageArea';
// import Divider from '@/components/chat/divider';
// import FlightMessageArea from '@/components/chat/flightMessageArea';
// import NewMessageArea from '@/components/chat/newMessageArea';

// import useRefreshToken from '@/utils/hooks/useRefreshToken';

export default function Chat({query}: {query: any}) {
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [message, setMessage] = useState<Chat[]>([]); // 채팅방의 채팅 내용들
	const [flightMessage, setFlightMessage] = useState<FlightChat[]>([]);
	const [adoptInfo, setAdoptInfo] = useState<AdoptDetail>();
	const [newMessage, setNewMessage] = useState<Chat[]>([]);

	// 💛 client 객체
	const client = useRef<CompatClient>();
	// 💛 subcribe 구독 객체?
	const subscribe = useRef<StompSubscription>();

	const isMine = useRef<boolean>(false);
	const newMessageRef = useRef<Chat[]>([]);

	const messageRef = useRef<Chat[]>([]); // 메세지 Ref

	const email = useRef<string>('');
	const refresh = useRefreshToken();

	// ✅ 받아온 채팅방 메세지들 처리하는 로직
	function handleMessage(msg: IMessage) {
		// 받아온 채팅 1개
		const body: Chat = JSON.parse(msg.body);

		// 어떠한... 조건...
		if (
			body.readCount === 0 &&
			(body.senderNo === Number(adoptInfo?.author.id)
				? isMine.current
				: !isMine.current)
		) {
			// 새 메시지 읽음여부 갱신 state 갱신은 뒤에서 같이 처리
			newMessageRef.current = newMessageRef.current.map((chat: Chat) => {
				return {...chat, readCount: 0};
			});

			// 기존 메시지 읽음여부 갱신
			messageRef.current = messageRef.current.map((chat: Chat) => {
				return {...chat, readCount: 0};
			});

			setMessage(messageRef.current);
		}

		// ✅ 채팅 notification ?? << 채팅을 봤다고 알려주는건가?..
		fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/chatroom/notification`, {
			headers: {'Content-Type': 'application/json'},
			method: 'POST',
			body: JSON.stringify({...body, senderEmail: email.current}),
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
				? `오전 ${DATE.getHours()
						.toString()
						.padStart(2, '0')}:${DATE.getMinutes().toString().padStart(2, '0')}`
				: `오후 ${(DATE.getHours() - 12)
						.toString()
						.padStart(2, '0')}:${DATE.getMinutes()
						.toString()
						.padStart(2, '0')}`;

		// 용도가 뭐지
		newMessageRef.current = [...newMessageRef.current, body];

		// 새로운 메세지..?
		setNewMessage(newMessageRef.current);
	}

	// ✅ 소켓 연결 성공 했을 때 실행할 콜백함수
	function onConnect() {
		if (client.current) {
			// onDisconnect : 서버와 연결 끊어졌을 때의 콜백함수
			// 다시 연결!하도록 한다.
			client.current.onDisconnect = () => {
				fetch(
					// 재연결 요청
					`${process.env.NEXT_PUBLIC_SERVER_URL}/chatroom/${query.id}?email=${email.current}`,
					{
						method: 'POST',
						keepalive: true,
					},
				);
			};

			// 구독 - 특정 채팅방의 메세지 내용 받아오기
			subscribe.current = client.current.subscribe(
				`/subscribe/public/${query.id}`,
				handleMessage, // 받아온 메세지를 처리하는 콜백함수
				{
					Authorization: window.localStorage.getItem('accessToken') as string,
				},
			);

			// 연결 완료 상태로 변경
			setIsConnected(true);
		}
	}

	// ✅ 소켓 연결 실패 했을 때 실행할 콜백함수
	// IMessage가 뭘까..
	function onError(e: IMessage) {
		alert(e.headers.message);
	}

	// 마운트 이후 1번만 실행
	// ⭐ 서버로부터 채팅 메시지를 가져와서 처리하는 로직
	useEffect(() => {
		// ✅ 메세지 가져오는 함수
		async function fetchMessage() {
			// 채팅 내용 가져오기
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/chatroom/${query.id}`,
				{
					headers: {
						Authorization: window.localStorage.getItem('accessToken') as string,
					},
				},
			);

			// 메세지들
			let result = await response.json();

			// 서버 응답 결과에 status가 존재하지 않거나 false인 경우 실행?
			// 정상적인 데이터가 오지 않은 경우 실행
			if (!result.status) {
				// 채팅 메시지들을 포함한 배열
				const msg: Chat[] = result.chatList || [];

				// 서버 응답 데이터 중 email 값을 email.current 변수에 저장
				email.current = result.email;

				// msg 배열 - 날짜, 시간 관련 계산
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

				// 채팅 메시지들은 컴포넌트 내에서 참조할 수 있게 됨
				messageRef.current = msg;
				setMessage(messageRef.current); // 화면에 렌더링
			}
		}

		if (window.localStorage.getItem('accessToken')) fetchMessage();
	}, []);

	// ⭐ 웹 소켓 연결을 설정하고 해제하는 로직
	// 컴포넌트 마운트되면 웹소켓 연결
	// 언마운트되면 웹 소켓 연결 해제
	useEffect(() => {
		// Stomp.over()로 client.current 객체 초기화
		// 이 객체는 Websokect을 관리, 메세지를 주고받는데 사용
		// SocketJS로 웹소켓 연결 구현
		client.current = Stomp.over(() => {
			return new SockJS(`${process.env.NEXT_PUBLIC_SERVER_URL}/chat`, null, {
				transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
			});
		});

		// connect() 메서드를 사용하여 클라이언트를 서버에 연결
		// 인증 헤더 + 채팅방 번호 전달
		// 연결 성공되면 onConnect 함수가 실행됨
		// 실패 시 onError 실행
		client.current.connect(
			{
				Authorization: window.localStorage.getItem('accessToken') as string,
				chatRoomNo: query.id,
			},
			onConnect,
			onError,
		);

		//  웹 소켓 연결을 해제하고, 서버에 재연결 요청을 보내는 함수
		function disconnectStomp() {
			fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/chatroom/${query.id}?email=${email.current}`,
				{
					method: 'POST',
					keepalive: true,
				},
			);
		}

		// beforeunload 이벤트가 발생할 때 (브라우저를 닫거나 페이지를 떠날 때) 호출되도록 등록됨
		// 연결을 해제하고 서버에 재연결 요청 보냄
		window.addEventListener('beforeunload', () => {
			disconnectStomp();
		});

		// 클린업(cleanup) 함수
		// 구독 취소 + 웹 소켓 연결 해제
		return () => {
			console.log('disconnected');

			// unsubscribe() 메서드를 사용하여 서버에서의 특정 주제(topic) 구독을 취소
			// 인증 헤더와 채팅방 번호 전달.
			subscribe.current?.unsubscribe({
				Authorization: window.localStorage.getItem('accessToken') as string,
				chatRoomNo: query.id,
			});

			// disconnect() 메서드를 사용하여 클라이언트와 서버의 웹 소켓 연결을 해제
			client.current?.disconnect();
		};
	}, []);

	return (
		<>
			{/* <AdoptInfo adoptInfo={adoptInfo} /> */}
			<section className="body" style={{zIndex: '101'}}>
				{/* <Header />
				<div style={{flexGrow: 1}}>
			
					<MessageArea message={message} />

					{newMessage.length !== 0 && (
						<>
							{message.length !== 0 && <Divider />}

							<NewMessageArea
								message={newMessage}
								mine={isMine.current}
								authorId={Number(adoptInfo?.author.id)}
							/>
						</>
					)}
					{flightMessage.length !== 0 && (
            <FlightMessageArea message={flightMessage} />
          )} 
				</div>
				{client.current && isConnected && (
					<ChatInput client={client} id={Number(query.id)} />
				)} 
        */}
			</section>
		</>
	);
}
