import { error } from "console";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { spotGetNearLocation } from "@services/api/spot";
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
