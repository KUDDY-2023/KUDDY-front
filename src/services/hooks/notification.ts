import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useMutation } from "react-query";

import {
  nofiGetAll,
  nofiReadAll,
  nofiRead,
  nofiUnReadCount,
  nofiUnReadChat,
  nofiMakeMail,
} from "@services/api/notification";

import { useQuery } from "react-query";

// SSE
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

// ✅ 모든 알림 가져오기
export const useGetAllNoti = () => {
  const { data, error, isLoading, refetch } = useQuery(
    ["notifications"],
    nofiGetAll,
    {
      refetchOnWindowFocus: false,
      select: data =>
        data.data.data.notificationResDtos.sort((a: any, b: any) => {
          // time 필드를 비교하여 최신순으로 정렬
          const timeA = new Date(a.time);
          const timeB = new Date(b.time);
          if (timeA > timeB) return -1;
          if (timeA < timeB) return 1;
          // 모든 조건이 같으면 순서를 변경하지 않음
          return 0;
        }),
      cacheTime: 0,
    },
  );

  return {
    notiData: data,
    notiError: error,
    notiLoading: isLoading,
    refetchNotiData: refetch,
  };
};

// ✅ 안읽은 댓글 알림 개수 가져오기
export const useGetCommentNotiCount = () => {
  const isLogin = !!localStorage.getItem("accessToken");

  const { data, error, isLoading, refetch } = useQuery(
    "notificationsCount",
    nofiUnReadCount,
    {
      enabled: isLogin, // 로그인 한 경우에만 요청
      refetchOnWindowFocus: false,
      select: data => {
        let str = data.data.data;
        let i = str.length - 1;
        let extractedNumber = "";
        while (i >= 0 && !isNaN(parseInt(str[i]))) {
          extractedNumber = str[i] + extractedNumber;
          i--;
        }
        const number = parseInt(extractedNumber, 10);
        return number;
      },
      cacheTime: 0,
    },
  );

  return {
    notiCount: data,
    notiCountError: error,
    notiCountLoading: isLoading,
    refetchNotiCount: refetch,
  };
};

// ✅ 모든 알림 읽음 처리
export const useReadAllNoti = () => {
  const onReadAll = async () => {
    try {
      // console.log("모두 읽음 처리");
      const res = await nofiReadAll();
      // console.log(res);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return onReadAll;
};

// ✅ 단일 알림 읽음 처리
export const useReadNoti = () => {
  const onRead = async (nofiNum: number) => {
    try {
      // console.log("단일 읽음 처리 (요청은 안보냄)");
      const res = await nofiRead(nofiNum);
      // console.log(res);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return onRead;
};

// ✅ 알림을 통해 포스트로 이동하기
export const useGotoPost = () => {
  const navigate = useNavigate();
  const onRead = useReadNoti();

  const onGotoPost = (postId: number, nofiNum: number) => {
    // 읽음 처리 요청도 보내야함
    onRead(nofiNum);
    // 상세 페이지로 라우팅
    navigate(`/community/${postId}`);
  };

  return onGotoPost;
};

// ✅ 안읽은 채팅 알림 개수 가져오기
export const useGetChatNotiCount = () => {
  const isLogin = !!localStorage.getItem("accessToken");
  const { data, error, isLoading, refetch } = useQuery(
    "nofiUnReadChat",
    nofiUnReadChat,
    {
      enabled: isLogin, // 로그인 한 경우에만 요청
      refetchOnWindowFocus: false,
      select: data => data.data.data.totalUnReadMessages,
      cacheTime: 0,
      retry: 1,
    },
  );

  return {
    notiChatCount: data,
    notiChatCountError: error,
    notiChatCountLoading: isLoading,
    refetchNotiChatCount: refetch,
  };
};

// ✅ SSE & 알림 개수 초기 세팅 hook
export const useSSE = () => {
  const [newNotification, isNewNotification] = useState<{
    alarm: boolean;
    chat: boolean;
  }>({ alarm: false, chat: false }); // 새로운 댓글 & 채팅이 있을 때

  const [listeningComment, setListeningComment] = useState(false);
  const [listeningChat, setListeningChat] = useState(false);

  const EventSource = EventSourcePolyfill || NativeEventSource;
  const token = localStorage.getItem("accessToken");
  const eventSource1Ref = useRef<EventSource | null>(null);
  const eventSource2Ref = useRef<EventSource | null>(null);

  const { notiCount } = useGetCommentNotiCount(); // 댓글 알림 개수 가져오기
  const { notiChatCount } = useGetChatNotiCount(); // 채팅 알림 개수 가져오기

  // api로 알림 상태 초기화
  useEffect(() => {
    if (notiCount) isNewNotification({ ...newNotification, alarm: true });
    if (notiChatCount) isNewNotification({ ...newNotification, chat: true });
  }, [notiCount, notiChatCount]);

  useEffect(() => {
    if (!listeningComment && token) {
      // 로그인 한 경우만 요청
      setListeningComment(true);
      try {
        eventSource1Ref.current = new EventSource(
          `https://api.kuddy.co.kr/api/v1/notifications/subscribe`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        );

        // 연결 됐을 때
        eventSource1Ref.current.onopen = async event => {
          // console.log("Comment 연결 성공", event);
        };

        // 이벤트 왔을 때
        eventSource1Ref.current.onmessage = async event => {
          if (!event.data.startsWith("EventStream")) {
            // 이벤트일때만 JSON.parse 실행
            try {
              const eventData = JSON.parse(event.data);
              const eventType = eventData.notificationType;

              if (eventType === "COMMENT") {
                isNewNotification(prevState => {
                  // Create a new state based on the previous state
                  let newState = { ...prevState, alarm: true };
                  // Preserve the chat state
                  if (prevState.chat) {
                    newState.chat = true;
                  }
                  return newState; // Return the updated state
                });
              }
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        };

        // 에러 발생 & 연결 끊겼을 때
        eventSource1Ref.current.onerror = (event: any) => {
          // console.log("Comment 알림 에러 발생");
          if (event.readyState == EventSource.CLOSED) {
            console.log("Comment CLOSED");
          }
        };
      } catch (err) {
        setListeningComment(false);
        alert("Comment 알림 연결 실패");
      }
    }

    // 정리 함수 정의 (컴포넌트 언마운트 시 호출됨)
    return () => {
      // console.log("🔥알림 언마운트 : ", eventSource1Ref.current);

      if (eventSource1Ref.current) {
        //console.log("🔥 알림 연결을 끊었습니다.");
        eventSource1Ref.current.close();
        eventSource1Ref.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!listeningChat && token) {
      // 로그인 한 경우만 요청
      setListeningChat(true);
      try {
        eventSource2Ref.current = new EventSource(
          `https://api.kuddy.co.kr/chat/v1/notification/subscribe`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        );

        // 연결 됐을 때
        eventSource2Ref.current.onopen = async event => {
          //  console.log("Chat 알림 연결 성공", event);
        };

        // 이벤트 왔을 때
        eventSource2Ref.current.onmessage = async event => {
          if (!event.data.startsWith("EventStream")) {
            // 이벤트일때만 JSON.parse 실행
            try {
              const eventData = JSON.parse(event.data);
              const eventType = eventData.notificationType;

              if (eventType === "CHAT") {
                isNewNotification(prevState => {
                  // Create a new state based on the previous state
                  let newState = { ...prevState, chat: true };
                  // Preserve the chat state
                  if (prevState.alarm) {
                    newState.alarm = true;
                  }
                  return newState; // Return the updated state
                });
              } else {
                console.log("Unknown event type:", eventType);
              }
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        };

        // 에러 발생 & 연결 끊겼을 때
        eventSource2Ref.current.onerror = (event: any) => {
          //  console.log("Chat 알림 에러 발생");
          if (event.readyState == EventSource.CLOSED) {
            console.log("Chat CLOSED");
          }
        };
      } catch (err) {
        setListeningChat(false);
        alert("Chat 알림 연결 실패");
      }
    }

    // 정리 함수 정의 (컴포넌트 언마운트 시 호출됨)
    return () => {
      //console.log("🔥채팅 언마운트 : ", eventSource2Ref.current);

      if (eventSource2Ref.current) {
        //console.log("🔥채팅 연결을 끊었습니다.");
        eventSource2Ref.current.close();
        eventSource2Ref.current = null;
      }
    };
  }, []);

  useEffect(() => {
    //console.log("💙존재 여부 >>", newNotification);
  }, [newNotification]);
  return { newNotification };
};

// 🔥 이메일 전송 요청
export const useSendMail = (chatId: string) => {
  const { mutate: requestSendMail } = useMutation(nofiMakeMail, {
    onSuccess: res => {
      console.log("이메일 요청 완료", res);
    },
    onError: err => {
      console.log("이메일 요청 실패", err);
    },
  });

  const onReqSendMail = () => {
    requestSendMail(chatId);
  };

  return { onReqSendMail };
};
