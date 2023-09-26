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

type DetailPickedMatesOption = "ALL" | "KUDDY" | "TRAVELER";
export const useDetailPickedMates = (
  contentId: number,
  option: DetailPickedMatesOption,
) => {
  const [heart, setHeart] = useState<number>(0);
  const [matesPreview, setMatesPreview] = useState<string[]>();
  const [kMatesList, setKMatesList] = useState<PickedMatesType[]>();
  const [tMatesList, setTMatesList] = useState<PickedMatesType[]>();
  const [trigger, setTrigger] = useState<number>(0);

  useEffect(() => {
    getPickedMates();
  }, [trigger]);

  const getPickedMates = async () => {
    try {
      const res = await spotGetDetailInfo(contentId);
      if (option === "ALL") {
        setHeart(res.data.data.heart);
        if (
          res.data.data.kuddyList.concat(res.data.data.travelerList).length > 5
        )
          setMatesPreview(
            res.data.data.kuddyList
              .concat(res.data.data.travelerList)
              .sort(() => Math.random() - 0.5)
              .slice(0, 5)
              .map((row: PickedMatesType) => row.profileImageUrl),
          );
        else
          setMatesPreview(
            res.data.data.kuddyList
              .concat(res.data.data.travelerList)
              .sort(() => Math.random() - 0.5)
              .map((row: PickedMatesType) => row.profileImageUrl),
          );
      } else if (option === "KUDDY") {
        setKMatesList(res.data.data.kuddyList);
      } else if (option === "TRAVELER") {
        setTMatesList(res.data.data.travelerList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { heart, matesPreview, kMatesList, tMatesList, setTrigger };
};
