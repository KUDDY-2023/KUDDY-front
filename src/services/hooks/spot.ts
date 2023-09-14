import { error } from "console";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { useRecoilState } from "recoil";
import { spotGetNearLocation, spotGetDetailInfo } from "@services/api/spot";
// useQuery : get
// useMutation : post, delete, patch, put

/*
react-query 또는 recoil 관련 등 api 호출 후의 로직 포함  
함수 이름은 use로 시작 
*/

// near my location
export const useNearLocation = (x: number, y: number) => {
  const GetLocation = async (page: number) => {
    try {
      const res = await spotGetNearLocation(page, x, y);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      "nearLocation",
      ({ pageParam = 0 }) => GetLocation(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = allPages.length + 1;
          // return lastPage.items.length !== 0 ? nextPage : undefined;
        },
      },
    );

  return { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage };
};

// spot detail info
export const useDetailInfo = (contentId: number) => {
  const GetDetailInfo = async () => {
    try {
      const res = await spotGetDetailInfo(contentId);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  return GetDetailInfo;
};
