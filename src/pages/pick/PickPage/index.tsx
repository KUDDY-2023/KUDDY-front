import "./pick.scss";
import TopBar from "@components/_common/TopBar";
import BottomNavBar from "@components/_common/BottomNavBar";
import TravelBlock from "@components/Travel/TravelBlock";
import Loading from "@components/_common/Loading";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pickDeletePick } from "@services/api/pick";
import { useGetPick } from "@services/hooks/pick";
import { useRecoilValue } from "recoil";
import { pickedTravel } from "@services/store/travel";

const Pick = () => {
  const nav = useNavigate();
  const pickList = useRecoilValue<TravelPreviewType[]>(pickedTravel);
  const { data, isFetching } = useGetPick();

  const onDelete = (id: number) => {
    pickDeletePick(id).then().catch();
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TopBar />
      <div className="pick-wrapper">
        <div className="inner-container">
          {isFetching ? (
            <div className="loading-container">
              <Loading
                backColor="transparent"
                spinnerColor="#eee"
                size="30px"
              />
            </div>
          ) : (
            pickList &&
            (pickList.length === 0 ? (
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
              pickList.map(item => (
                <TravelBlock
                  {...item}
                  isPick={true}
                  onDelete={() => onDelete(item.contentId)}
                  key={item.contentId}
                />
              ))
            ))
          )}
        </div>
      </div>
      <BottomNavBar />
    </>
  );
};

export default Pick;
