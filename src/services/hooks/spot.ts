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
  const { pageLastItemRef, data, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteScroll({
      queryKey: ["allSpot", filter],
      initialPage: 1,
      fetch: spotGetByFilter,
      fetchParams: { size: 20, filter: filter },
      onIntersect: async (entry, observer) => {
        observer.unobserve(entry.target);
        if (hasNextPage && !isFetching) fetchNextPage();
      },
    });
  return { pageLastItemRef, hasNextPage, data };
};

// near my location
export const useNearLocation = (pos: Position) => {
  const { pageLastItemRef, data, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteScroll({
      queryKey: ["allSpot", pos],
      initialPage: 1,
      fetch: spotGetNearLocation,
      fetchParams: { pos: pos },
      onIntersect: async (entry, observer) => {
        observer.unobserve(entry.target);
        if (hasNextPage && !isFetching) fetchNextPage();
      },
    });
  return { pageLastItemRef, hasNextPage, data, isFetching };
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
