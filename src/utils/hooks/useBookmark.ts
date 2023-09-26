import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pickPostPick, pickDeletePick } from "@services/api/pick";
import { useGetPick } from "@services/hooks/pick";
import { useRecoilValue } from "recoil";
import { isLoginState } from "@services/store/auth";

const useBookmark = (isBookmarked: boolean, currentTravelId: number) => {
  const nav = useNavigate();
  const isLogin = useRecoilValue<boolean>(isLoginState);
  const [state, setState] = useState<boolean>(isBookmarked);
  const [id, setId] = useState<number>(0);
  const [trigger, setTrigger] = useState<number>(0);
  const toggle = () => setTrigger(trigger + 1);
  const { getPickList } = useGetPick();

  useEffect(() => {
    getPickList();
  }, []);

  useEffect(() => {
    setState(isBookmarked);
    setId(Number(currentTravelId));
  }, [isBookmarked]);

  useEffect(() => {
    if (trigger !== 0) {
      if (isLogin) {
        if (state === true) {
          pickDeletePick(id)
            .then(res => {
              getPickList();
              setState(false);
            })
            .catch();
        } else {
          pickPostPick(id)
            .then(res => {
              getPickList();
              setState(true);
            })
            .catch();
        }
      } else {
        alert(`Login to use 'Pick'`);
        nav("/auth/register");
      }
    }
  }, [trigger]);

  return { state, toggle };
};

export default useBookmark;
