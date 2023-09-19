import { useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";

import {
  nofiGetAll,
  nofiReadAll,
  nofiRead,
  nofiUnReadCount,
} from "@services/api/notification";

import { useQuery } from "react-query";

// ✅ 모든 알림 가져오기
export const useGetAllNoti = () => {
  const { data, error, isLoading } = useQuery("notifications", nofiGetAll, {
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
  });

  return { notiData: data, notiError: error, notiLoading: isLoading };
};

// ✅ 안읽은 알림 개수 가져오기
export const useGetNotiCount = () => {
  const { data, error, isLoading } = useQuery(
    "notificationsCount",
    nofiUnReadCount,
    {
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
  };
};

// ✅ 모든 알림 읽음 처리
export const useReadAllNoti = () => {
  const onReadAll = async () => {
    try {
      console.log("모두 읽음 처리 (요청은 안보냄)");
      //   const res = await nofiReadAll();
      //   console.log(res);
      //   return res;
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
      //   const res = await nofiRead(nofiNum);
      //   console.log(res);
      //   return res;
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
    // onRead(nofiNum);
    // 상세 페이지로 라우팅
    navigate(`/community/category/${postId}`);
  };

  return onGotoPost;
};
