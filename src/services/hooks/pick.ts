import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { pickGetPick } from "@services/api/pick";
import { pickedTravel } from "@services/store/travel";

export const useGetPick = () => {
  const [pickList, setPickList] = useRecoilState(pickedTravel);
  const { data, isLoading } = useQuery(["pickedList", pickList], pickGetPick);
  const getPickList = async () => {
    try {
      const res = await pickGetPick();
      setPickList(res.data.data.spots);
    } catch (err) {
      console.log(err);
    }
  };
  return { data, isLoading, getPickList };
};
