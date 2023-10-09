import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import useInfiniteScroll from "@utils/hooks/useInfiniteScroll";
import {
  spotGetDetailInfo,
  spotGetDetailNearby,
  spotGetByFilter,
  spotGetNearLocation,
  spotGetOnlyKeyWord,
} from "@services/api/spot";

// detail
export const useDetailSpot = (id: number) => {
  const { data, isLoading, isFetching, isError, refetch } = useQuery(
    ["travelDetail", id],
    () => spotGetDetailInfo(id),
  );
  const { data: nearbyData } = useQuery(
    ["travelNearby", id],
    () => spotGetDetailNearby(id, data?.data.data.mapX, data?.data.data.mapY),
    { enabled: !!data, retry: 5 },
  );

  const [matesPreview, setMatesPreview] = useState<string[]>();
  const getMatesPreview = (data: any) => {
    if (data.data.data.kuddyList.concat(data.data.data.travelerList).length > 5)
      setMatesPreview(
        data.data.data.kuddyList
          .concat(data.data.data.travelerList)
          .sort(() => Math.random() - 0.5)
          .slice(0, 5)
          .map((row: PickedMatesType) => row.profileImageUrl),
      );
    else
      setMatesPreview(
        data.data.data.kuddyList
          .concat(data.data.data.travelerList)
          .sort(() => Math.random() - 0.5)
          .map((row: PickedMatesType) => row.profileImageUrl),
      );
  };
  useEffect(() => {
    if (!data) return;
    getMatesPreview(data);
  }, [data]);

  return {
    data,
    isLoading,
    isFetching,
    isError,
    nearbyData,
    matesPreview,
    refetch,
  };
};

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
  const {
    pageLastItemRef,
    data,
    isFetching,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteScroll({
    queryKey: ["allSpot", pos],
    initialPage: 1,
    fetch: spotGetNearLocation,
    fetchParams: { pos: pos },
    onIntersect: async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) fetchNextPage();
    },
  });
  return { pageLastItemRef, hasNextPage, data, isFetching, error };
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
