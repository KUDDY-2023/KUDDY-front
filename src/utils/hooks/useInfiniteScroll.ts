import { useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery } from "react-query";

type IntersectHandler = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
) => void;

type useInfiniteScrollProps = {
  // 쿼리키 : dependency(update trigger)가 필요없는 호출의 경우 queryName string만 넣은 배열 전달
  // filter 등 값 변경에 따라 새로 fetch 해야하는 호출의 경우 배열에 담아 전달
  queryKey: [string] | [string, any] | [string, any, any];

  // 처음으로 요청 보낼 페이지, 지정 안하면 0
  initialPage?: number;

  // api 폴더 내 파일에서 정의한 api 호출 함수
  // page를 제외하고 추가로 전달해줄 파라미터가 있다면 반드시 객체로 묶고,
  // page 단일 파라미터만 필요한 경우 number 타입의 파라미터를 전달 받도록 정의
  fetch: any;

  // page 외의 전달해줄 파라미터가 있다면 객체 형식으로 전달 (page는 생략)
  fetchParams?: object;

  // async (entry, observer) => { observer.unobserve(entry.target); if (hasNextPage && !isFetching) fetchNextPage(); }
  onIntersect: IntersectHandler;
};

const useInfiniteScroll = ({
  queryKey,
  initialPage,
  fetch,
  fetchParams,
  onIntersect,
}: useInfiniteScrollProps) => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    queryKey,
    ({ pageParam = initialPage ? initialPage : 0 }) =>
      fetchParams
        ? fetch({ page: pageParam, ...fetchParams })
        : fetch(pageParam),
    {
      getNextPageParam: data => {
        const pageInfo = data.data.data.pageInfo;
        return pageInfo.page < pageInfo.totalPages
          ? pageInfo.page + 1
          : undefined;
      },
      retry: 5,
    },
  );

  // 페이지 마지막 아이템이 뷰포트 내에 있는지 감지
  const pageLastItemRef = useRef<HTMLDivElement>(null);
  const options = { rootMargin: "100px", threshold: 0.3 };
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect],
  );
  useEffect(() => {
    if (!pageLastItemRef.current) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(pageLastItemRef.current);
    return () => observer.disconnect();
  }, [pageLastItemRef, options, callback]);

  // 사용할 수 있는 값 모두 리턴
  // 커스텀훅 사용 시 필수로 사용해야 하는 값 - pageLastItemRef, data, isFetching, hasNextPage, fetchNextPage
  return {
    pageLastItemRef,
    data,
    isLoading,
    isFetching,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  };
};

export default useInfiniteScroll;
