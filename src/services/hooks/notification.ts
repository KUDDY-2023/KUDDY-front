import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";

import {
  nofiGetAll,
  nofiReadAll,
  nofiRead,
  nofiUnReadCount,
  nofiUnReadChat,
} from "@services/api/notification";

import { useQuery } from "react-query";

// SSE
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

// ✅ 모든 알림 가져오기
export const useGetAllNoti = () => {
  const [test, setTest] = useState(false);

  // 바뀌면... 쿼리 요청을 다시 하고 싶은데
  useEffect(() => {}, [test]);

  const { data, error, isLoading, refetch } = useQuery(
    "notifications",
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
      console.log("모두 읽음 처리");
      const res = await nofiReadAll();
      console.log(res);
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
      console.log("단일 읽음 처리 (요청은 안보냄)");
      const res = await nofiRead(nofiNum);
      console.log(res);
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
    navigate(`/community/category/${postId}`);
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
        const eventSource = new EventSource(
          `https://api.kuddy.co.kr/api/v1/notifications/subscribe`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        );

        // 연결 됐을 때
        eventSource.onopen = async event => {
          //console.log("Comment 연결 성공", event);
        };

        // 이벤트 왔을 때
        eventSource.onmessage = async event => {
          if (!event.data.startsWith("EventStream")) {
            // 이벤트일때만 JSON.parse 실행
            try {
              const eventData = JSON.parse(event.data);
              const eventType = eventData.notificationType;

              if (eventType === "COMMENT") {
                //console.log("댓글 알림 발생");
                isNewNotification({ ...newNotification, alarm: true });
              }
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        };

        // 에러 발생 & 연결 끊겼을 때
        eventSource.onerror = (event: any) => {
          console.log("Comment 알림 에러 발생");
          if (event.readyState == EventSource.CLOSED) {
            console.log("Comment 에러 발생 : CLOSED");
          }
        };
      } catch (err) {
        setListeningComment(false);
        alert("Comment 알림 연결 실패");
      }
    }
  }, [listeningComment]);

  useEffect(() => {
    if (!listeningChat && token) {
      // 로그인 한 경우만 요청
      setListeningChat(true);
      try {
        const eventSource2 = new EventSource(
          `https://api.kuddy.co.kr/chat/v1/notification/subscribe`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        );

        // 연결 됐을 때
        eventSource2.onopen = async event => {
          //console.log("Chat 알림 연결 성공", event);
        };

        // 이벤트 왔을 때
        eventSource2.onmessage = async event => {
          if (!event.data.startsWith("EventStream")) {
            // 이벤트일때만 JSON.parse 실행
            try {
              const eventData = JSON.parse(event.data);
              const eventType = eventData.notificationType;

              if (eventType === "CHAT") {
                //console.log("채팅 알림 발생");
                isNewNotification({ ...newNotification, chat: true });
              } else {
                console.log("Unknown event type:", eventType);
              }
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        };

        // 에러 발생 & 연결 끊겼을 때
        eventSource2.onerror = (event: any) => {
          console.log("Chat 알림 에러 발생");
          if (event.readyState == EventSource.CLOSED) {
            console.log("Chat 에러 발생 : CLOSED");
          }
        };
      } catch (err) {
        setListeningChat(false);
        alert("Chat 알림 연결 실패");
      }
    }
  }, [listeningChat]);

  return { newNotification };
};
