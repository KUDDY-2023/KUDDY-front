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
