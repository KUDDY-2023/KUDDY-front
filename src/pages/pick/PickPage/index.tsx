import "./pick.scss";
import TopBar from "@components/_common/TopBar";
import BottomNavBar from "@components/_common/BottomNavBar";
import TravelBlock from "@components/Travel/TravelBlock";
import Loading from "@components/_common/Loading";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pickDeletePick } from "@services/api/pick";
import { useGetPick } from "@services/hooks/pick";
import { useRecoilValue } from "recoil";
import { isLoginState } from "@services/store/auth";
import { pickedTravel } from "@services/store/travel";
import Swal from "sweetalert2";

const Pick = () => {
  const nav = useNavigate();
  const isLogin = useRecoilValue<boolean>(isLoginState);
  const pickList = useRecoilValue<TravelPreviewType[]>(pickedTravel);
  const { data, isLoading, getPickList } = useGetPick();
  const onDelete = (id: number) => {
    Swal.fire({
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      iconColor: "#eeeeee",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(res => {
      if (res.isConfirmed)
        pickDeletePick(id)
          .then(res => getPickList())
          .catch(err => console.log(err));
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getPickList();
  }, []);
  return (
    <>
      <TopBar />
      <div className="pick-wrapper">
        <div className="inner-container">
          {isLogin ? (
            isLoading && pickList.length === 0 ? (
              <div className="loading-container">
                <Loading
                  backColor="transparent"
                  spinnerColor="#eee"
                  size="30px"
                />
              </div>
            ) : data && data.data.data.spots.length === 0 ? (
              <div className="empty">
                No picked travel yet. <br />
                <span>
                  Search for your pick&nbsp;
                  <div onClick={() => nav("/travel/list")} className="link">
                    here
                  </div>
                </span>
              </div>
            ) : (
              pickList.map((item: TravelPreviewType) => (
                <TravelBlock
                  {...item}
                  isPick={true}
                  onDelete={() => onDelete(item.contentId)}
                  key={item.contentId}
                />
              ))
            )
          ) : (
            <div className="empty">
              No picked travel yet. <br />
              <span>
                Search for your pick&nbsp;
                <div onClick={() => nav("/travel/list")} className="link">
                  here
                </div>
              </span>
            </div>
          )}
        </div>
      </div>
      <BottomNavBar />
    </>
  );
};

export default Pick;
