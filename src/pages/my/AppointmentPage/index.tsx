import "./appointmentpage.scss";
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

const AppointmentPage = () => {
  const nav = useNavigate();
  const [meetUps, setMeetUps] = useState<any>();
  const onGetMeetUps = useGetMeetUps();

  useEffect(() => {
    const getMeetUps = async () => {
      const res = await onGetMeetUps();
      setMeetUps(res);
    };

    getMeetUps();
  }, []);

  let iconType: string, itemStyle: string, itemText: string;

  const handleType = (type: string, hasReview: boolean) => {
    switch (type) {
      case "PAYED":
        iconType = scheduledIcon;
        itemStyle = "scheduled";
        itemText = "scheduled";
        break;
      case "COMPLETED":
        iconType = completedIcon;
        itemStyle = hasReview ? "disabled" : "completed"; // completed && 리뷰 있으면 비활성화
        itemText = "completed";
        break;
      case "TRAVELER_CANCEL" || "KUDDY_CANCEL":
        iconType = canceledIcon;
        itemStyle = "disabled"; // canceled이면 비활성화
        itemText = "canceled";
    }
  };

  const handleSpotDetailClick = (id: number) => {
    nav(`/travel/${id}`);
  };

  const handleCancelClick = () => {
    console.log("동행 취소");
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
          {meetUps?.meetupList?.map((item: any) => {
            handleType(item?.meetupStatus, item?.reviewed);

            return (
              <div
                key={item?.meetupId}
                className={`appointment-item-container ${itemStyle}`}
              >
                <div className="appointment-item-header">
                  <div className="appointment-date">
                    {item?.appointmentTime}
                  </div>
                  <div className={`appointment-type ${itemText}`}>
                    <img src={iconType} />
                    {itemText}
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

                {itemText === "scheduled" && (
                  <div className="appointment-item-footer">
                    <div
                      className="appointment-btn"
                      onClick={handleCancelClick}
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
                {itemText === "completed" && !item?.reviewed && (
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
