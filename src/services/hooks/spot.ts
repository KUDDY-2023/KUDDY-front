import { error } from "console";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { spotGetNearLocation, spotGetOnlyKeyWord } from "@services/api/spot";
// useQuery : get
// useMutation : post, delete, patch, put

/*
react-query 또는 recoil 관련 등 api 호출 후의 로직 포함  
함수 이름은 use로 시작 
*/

// near my location
export const useNearLocation = (page: number, x: number, y: number) => {
  useEffect(() => {
    GetLocation();
  }, []);

  const GetLocation = async () => {
    try {
      const { data } = await spotGetNearLocation(page, x, y);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
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
