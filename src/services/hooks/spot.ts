import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import useInfiniteScroll from "@utils/hooks/useInfiniteScroll";
import {
  spotGetByFilter,
  spotGetNearLocation,
  spotGetOnlyKeyWord,
} from "@services/api/spot";

// multi filter
export const useAllSpot = (filter: SpotGetByFilterType) => {
  const {
    pageLastItemRef,
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteScroll({
    queryName: "allSpot",
    fetch: spotGetByFilter,
    filter: filter,
    onIntersect: async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
  });
  return { pageLastItemRef, hasNextPage, data };
};

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

// 키워드 하나로 검색해서 장소 결과 받아오기
export const useGetSpotKeyWord = () => {
  const onSearchSpot = async (keyword: string) => {
    try {
      const res = await spotGetOnlyKeyWord(keyword);
      return res.data.data;
    } catch (err) {
      console.log("검색 실패", err);
    }
  };

  return onSearchSpot;
};
