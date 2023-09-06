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
export const useNearLocation = async (x: number, y: number) => {
  try {
    const { data } = await spotGetNearLocation(x, y);
    console.log(data);
    return data;
  } catch {
    console.log("x");
  }
};
