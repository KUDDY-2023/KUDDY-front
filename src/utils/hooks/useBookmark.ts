import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// api Like, UnLike

const useBookmark = (isBookmarked: boolean, currentTravelId: number) => {
  const nav = useNavigate();
  const [state, setState] = useState<boolean>(isBookmarked);
  const [id, setId] = useState<number>(0);
  const [trigger, setTrigger] = useState<number>(0);
  const toggle = () => setTrigger(trigger + 1);

  useEffect(() => {
    setState(isBookmarked);
    setId(Number(currentTravelId));
  }, [isBookmarked]);

  useEffect(() => {
    if (trigger !== 0) {
      if (state === true) {
        setState(false);
        //   UnLike(id)
        //     .then(res => setState(false))
        //     .catch(err => {
        //       // console.log(err);
        //       if (err.response.status === 401) {
        //         alert("로그인 후 북마크 기능을 사용하실 수 있습니다.");
        //         nav("/auth/login");
        //       }
        //     });
      } else {
        setState(true);
        //   Like(id)
        //     .then(res => setState(true))
        //     .catch(err => {
        //       // console.log(err);
        //       if (err.response.status === 401) {
        //         alert("로그인 후 북마크 기능을 사용하실 수 있습니다.");
        //         nav("/auth/login");
        //       }
        //     });
      }
    }
  }, [trigger]);

  return { state, toggle };
};

export default useBookmark;
