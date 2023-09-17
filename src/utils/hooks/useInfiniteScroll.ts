import { useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery } from "react-query";

type useInfiniteScrollProps = {
  queryName: string;
  fetch: any;
  filter: SpotGetByFilterType;
  onIntersect: IntersectHandler;
};
type IntersectHandler = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
) => void;

const useInfiniteScroll = ({
  queryName,
  fetch,
  filter,
  onIntersect,
}: useInfiniteScrollProps) => {
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

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryName, filter],
    ({ pageParam = 1 }) => fetch(pageParam, 20, filter),
    {
      keepPreviousData: true,
      getNextPageParam: data => {
        const pageInfo = data.data.data.pageInfo;
        return pageInfo.page < pageInfo.totalPages
          ? pageInfo.page + 1
          : undefined;
      },
    },
  );

  return {
    pageLastItemRef,
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
  };
};

export default useInfiniteScroll;
