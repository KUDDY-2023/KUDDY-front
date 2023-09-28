import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { spotGetDetailInfo } from "@services/api/spot";
import { pickGetPick } from "@services/api/pick";
import { pickedTravel } from "@services/store/travel";

export const useGetPick = () => {
  const [pickList, setPickList] = useRecoilState(pickedTravel);

  const getPickList = async () => {
    try {
      const res = await pickGetPick();
      setPickList(res.data.data.spots);
    } catch (err) {
      console.log(err);
    }
  };

  const { data, isFetching } = useQuery(["pickedList", pickList], pickGetPick);
  useEffect(() => {
    if (data) setPickList(data!.data.data.spots);
  }, [data]);

  return { data, isFetching, getPickList };
};
