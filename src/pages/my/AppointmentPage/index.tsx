import "./appointment-page.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackNavBar from "@components/_common/BackNavBar";
import arrowIcon from "@assets/icon/arrow_right.svg";
import pinIcon from "@assets/icon/pin_default.svg";
import scheduledIcon from "@assets/my/clock.svg";
import completedIcon from "@assets/my/complete.svg";
import canceledIcon from "@assets/icon/red_x.svg";
import { useGetMeetUps } from "@services/hooks/user";
import { useGetRoomStatus } from "@services/hooks/chat";
import { usePutMeetUpCancel } from "@services/hooks/user";

const AppointmentPage = () => {
  const nav = useNavigate();
  const [meetUps, setMeetUps] = useState<any>();
  const onGetMeetUps = useGetMeetUps(); // 동행 조회
  const onMeetUpCancel = usePutMeetUpCancel(); // 동행 요청 취소
  const [iconType, setIconType] = useState<string[]>([]);
  const [itemStyle, setItemStyle] = useState<string[]>([]);
  const [itemText, setItemText] = useState<string[]>([]);

  useEffect(() => {
    const getMeetUps = async () => {
      const res = await onGetMeetUps();
      setMeetUps(res.meetupList);
    };

    getMeetUps();
  }, []);

  //let iconType: string, itemStyle: string, itemText: string;

  const handleType = (type: string, hasReview: boolean) => {
    if (type === "PAYED") {
      setIconType(iconType => [...iconType, scheduledIcon]);
      setItemStyle(itemStyle => [...itemStyle, "scheduled"]);
      setItemText(itemText => [...itemText, "scheduled"]);
    } else if (type === "COMPLETED") {
      setIconType(iconType => [...iconType, completedIcon]);
      hasReview
        ? setItemStyle(itemStyle => [...itemStyle, "disabled"])
        : setItemStyle(itemStyle => [...itemStyle, "completed"]); // completed && 리뷰 있으면 비활성화
      setItemText(itemText => [...itemText, "completed"]);
    } else {
      setIconType(iconType => [...iconType, canceledIcon]);
      setItemStyle(itemStyle => [...itemStyle, "disabled"]); // canceled이면 비활성화
      setItemText(itemText => [...itemText, "canceled"]);
    }
  };

  useEffect(() => {
    if (typeof meetUps === "undefined") return;

    for (let i = 0; i < meetUps.length; i++) {
      handleType(meetUps[i]?.meetupStatus, meetUps[i]?.reviewed);
    }
  }, [meetUps]);

  const handleSpotDetailClick = (id: number) => {
    nav(`/travel/${id}`);
  };

  const handleCancelClick = async (id: number) => {
    const res = await onMeetUpCancel(id);
    console.log(res);
  };

  const handleSendMessageClick = () => {
    console.log("채팅창 이동");
  };

  const handleWriteReviewClick = (id: number) => {
    nav(`/my/write-review/${id}`);
  };

  return (
    <>
      <BackNavBar middleTitle="My appointment" isShare={false} />
      {meetUps && (
        <div className="appointments-container">
          {meetUps?.map((item: any, index: number) => {
            return (
              <div
                key={item?.meetupId}
                className={`appointment-item-container ${itemStyle[index]}`}
              >
                <div className="appointment-item-header">
                  <div className="appointment-date">
                    {item?.appointmentTime}
                  </div>
                  <div className={`appointment-type ${itemText[index]}`}>
                    <img src={iconType[index]} />
                    {itemText[index]}
                  </div>
                </div>

                <div className="appointment-item-body">
                  <div
                    className="appointment-place-container"
                    onClick={() => handleSpotDetailClick(item?.spotId)}
                  >
                    <img id="pin-icon" src={pinIcon} />
                    <div className="appointment-place">{item?.spotName}</div>
                    <img id="arrow-icon" src={arrowIcon} />
                  </div>

                  <div className="meeting-detail-container">
                    <div className="mate-profile-container">
                      <img src={item?.targetMemberInfo?.profileImageUrl} />
                      <div className="mate-nickname">
                        {item?.targetMemberInfo?.targetNickname}
                      </div>
                    </div>
                    <div className="accepted-date">{item?.createdDate}</div>
                  </div>
                </div>

                {itemText[index] === "scheduled" && (
                  <div className="appointment-item-footer">
                    <div
                      className="appointment-btn"
                      onClick={() => handleCancelClick(item?.meetupId)}
                    >
                      Cancel
                    </div>
                    <div
                      className="appointment-btn"
                      onClick={handleSendMessageClick}
                    >
                      Send message
                    </div>
                  </div>
                )}
                {itemText[index] === "completed" && !item?.reviewed && (
                  <div className="appointment-item-footer">
                    <div
                      className="appointment-btn write-review"
                      onClick={() => handleWriteReviewClick(item?.meetupId)}
                    >
                      Write Review
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AppointmentPage;
