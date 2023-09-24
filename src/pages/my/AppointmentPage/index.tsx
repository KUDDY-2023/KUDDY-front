import "./appointment-page.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackNavBar from "@components/_common/BackNavBar";
import arrowIcon from "@assets/icon/arrow_right.svg";
import pinIcon from "@assets/icon/pin_default.svg";
import pinCancel from "@assets/my/cancel_pin.svg";
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
  const onGetRoomStatus = useGetRoomStatus(); // 채팅방 여부 조회 (없으면 채팅방 생성)
  const [meetUpStyle, setMeetUpStyle] = useState<any>([]);

  // 동행 리스트 받아오기
  const getMeetUps = async () => {
    const res = await onGetMeetUps();
    setMeetUps(res.meetupList);
  };

  useEffect(() => {
    getMeetUps();
  }, []);

  // 동행 상태에 따른 스타일 저장
  const handleType = (id: number, type: string, hasReview: boolean) => {
    let iconType: string, itemStyle: string, itemText: string;
    if (type === "PAYED") {
      iconType = scheduledIcon;
      itemStyle = "scheduled";
      itemText = "scheduled";
    } else if (type === "COMPLETED") {
      iconType = completedIcon;
      itemStyle = "completed";
      itemText = "completed";
    } else {
      iconType = canceledIcon;
      itemStyle = "disabled"; // canceled이면 비활성화
      itemText = "canceled";
    }

    const newStyle = {
      meetupId: id,
      type: iconType,
      style: itemStyle,
      text: itemText,
    };

    setMeetUpStyle((meetUpStyle: any) => [...meetUpStyle, newStyle]);
  };

  useEffect(() => {
    if (typeof meetUps === "undefined") return;

    for (let i = 0; i < meetUps.length; i++) {
      handleType(
        meetUps[i].meetupId,
        meetUps[i]?.meetupStatus,
        meetUps[i]?.reviewed,
      );
    }
  }, [meetUps]);

  const handleSpotDetailClick = (id: number, statusText: string) => {
    if (statusText !== "canceled") {
      nav(`/travel/${id}`);
    }
  };

  const handleCancelClick = async (id: number) => {
    const res = await onMeetUpCancel(id);
    console.log(res);

    // 취소된 동행 스타일 업데이트
    const newStyle = meetUpStyle.map((meetUp: any) => {
      return meetUp.meetupId === id
        ? { ...meetUp, type: canceledIcon, style: "disabled", text: "canceled" }
        : meetUp;
    });
    setMeetUpStyle(newStyle);
  };

  const handleSendMessageClick = async (email: string, nickname: string) => {
    const res = await onGetRoomStatus(email, nickname);
    console.log(res);
    const roomId = Number(res.roomId);
    nav(`/chat/${roomId}`);
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
                className={`appointment-item-container ${meetUpStyle[index]?.style}`}
              >
                <div className="appointment-item-header">
                  <div className="appointment-date">
                    {item?.appointmentTime}
                  </div>
                  <div
                    className={`appointment-type ${meetUpStyle[index]?.text}`}
                  >
                    <img src={meetUpStyle[index]?.type} />
                    {meetUpStyle[index]?.text}
                  </div>
                </div>

                <div className="appointment-item-body">
                  <div
                    className={
                      meetUpStyle[index]?.text === "canceled"
                        ? "appointment-place-container"
                        : "appointment-place-container active"
                    }
                    onClick={() =>
                      handleSpotDetailClick(
                        item?.spotId,
                        meetUpStyle[index]?.text,
                      )
                    }
                  >
                    <img
                      className="pin-icon"
                      src={
                        meetUpStyle[index]?.text !== "canceled"
                          ? pinIcon
                          : pinCancel
                      }
                    />
                    <div className="appointment-place">{item?.spotName}</div>
                    {meetUpStyle[index]?.text !== "canceled" && (
                      <img id="arrow-icon" src={arrowIcon} />
                    )}
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

                {meetUpStyle[index]?.text === "scheduled" && (
                  <div className="appointment-item-footer">
                    <div
                      className="appointment-btn"
                      onClick={() => handleCancelClick(item?.meetupId)}
                    >
                      Cancel
                    </div>
                    <div
                      className="appointment-btn"
                      onClick={() =>
                        handleSendMessageClick(
                          item?.targetMemberInfo?.targetEmail,
                          item?.targetMemberInfo?.targetNickname,
                        )
                      }
                    >
                      Send message
                    </div>
                  </div>
                )}
                {meetUpStyle[index]?.text === "completed" &&
                  !item?.reviewed && (
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
