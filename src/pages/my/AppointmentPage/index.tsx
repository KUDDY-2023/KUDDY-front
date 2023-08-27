import "./appointmentpage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackNavBar from "@components/_common/backnavbar";
import arrowIcon from "@assets/icon/arrow_right.svg";
import pinIcon from "@assets/icon/pin_default.svg";
import scheduledIcon from "@assets/my/clock.svg";
import completedIcon from "@assets/my/complete.svg";
import canceledIcon from "@assets/icon/red_x.svg";

type AppointmentType = {
  id: number;
  type: "scheduled" | "completed" | "canceled";
  meeting: {
    date: string;
    place: string;
  };
  mate: {
    profile: string;
    nickname: string;
  };
  acceptedDate: string;
  hasReview: boolean;
};

const AppointmentPage = () => {
  const nav = useNavigate();
  const [appointments, setAppointments] = useState<AppointmentType[]>([
    {
      id: 1,
      type: "scheduled",
      meeting: {
        date: "2023.06.19  11am",
        place: "Gyeongbokgung Palace",
      },
      mate: {
        profile:
          "https://s3-alpha-sig.figma.com/img/f408/2883/2744c00e820f277563889c3bca4f7fd4?Expires=1693785600&Signature=NW7GU2ur3j9YwthaW4SX5bT1gE7AS7qHLUs5sduOuNmgwPVorgWkqEhqTl2Z8XLFE4nkXrAVDgih3i3xp40tFIhkWtswSY43pb4pvZtRj46trdGdAuR2lsbiLUUZqNFSFHAJiv-7afUX0x7cgYAO0IPAxyIaPdJhjpxOC9odP3-kgazfqDl9UlaF1ALav4o1ZgD8ciEYXZbZzu5HjEGlfzenwd5Th7vR71MVGHnzxul7JjW3iIKOY3kLs2blDiPuySnWlwwYrpWEJabh7Z2OUD9Fmw5MWSnsxrBYpWFWDyYmHYas7RXi0WlNFJb-NBt5y4CCAjnH3cCLwAzF0ilKZQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
        nickname: "Harper",
      },
      acceptedDate: "2023.05.05  13:50",
      hasReview: false,
    },
    {
      id: 2,
      type: "completed",
      meeting: {
        date: "2023.04.19  11am",
        place: "Gyeongbokgung Palace",
      },
      mate: {
        profile:
          "https://s3-alpha-sig.figma.com/img/f408/2883/2744c00e820f277563889c3bca4f7fd4?Expires=1693785600&Signature=NW7GU2ur3j9YwthaW4SX5bT1gE7AS7qHLUs5sduOuNmgwPVorgWkqEhqTl2Z8XLFE4nkXrAVDgih3i3xp40tFIhkWtswSY43pb4pvZtRj46trdGdAuR2lsbiLUUZqNFSFHAJiv-7afUX0x7cgYAO0IPAxyIaPdJhjpxOC9odP3-kgazfqDl9UlaF1ALav4o1ZgD8ciEYXZbZzu5HjEGlfzenwd5Th7vR71MVGHnzxul7JjW3iIKOY3kLs2blDiPuySnWlwwYrpWEJabh7Z2OUD9Fmw5MWSnsxrBYpWFWDyYmHYas7RXi0WlNFJb-NBt5y4CCAjnH3cCLwAzF0ilKZQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
        nickname: "Harper",
      },
      acceptedDate: "2023.05.05  13:50",
      hasReview: false,
    },
    {
      id: 3,
      type: "completed",
      meeting: {
        date: "2023.04.19  11am",
        place: "Gyeongbokgung Palace",
      },
      mate: {
        profile:
          "https://s3-alpha-sig.figma.com/img/f408/2883/2744c00e820f277563889c3bca4f7fd4?Expires=1693785600&Signature=NW7GU2ur3j9YwthaW4SX5bT1gE7AS7qHLUs5sduOuNmgwPVorgWkqEhqTl2Z8XLFE4nkXrAVDgih3i3xp40tFIhkWtswSY43pb4pvZtRj46trdGdAuR2lsbiLUUZqNFSFHAJiv-7afUX0x7cgYAO0IPAxyIaPdJhjpxOC9odP3-kgazfqDl9UlaF1ALav4o1ZgD8ciEYXZbZzu5HjEGlfzenwd5Th7vR71MVGHnzxul7JjW3iIKOY3kLs2blDiPuySnWlwwYrpWEJabh7Z2OUD9Fmw5MWSnsxrBYpWFWDyYmHYas7RXi0WlNFJb-NBt5y4CCAjnH3cCLwAzF0ilKZQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
        nickname: "Harper",
      },
      acceptedDate: "2023.05.05  13:50",
      hasReview: true,
    },
    {
      id: 4,
      type: "canceled",
      meeting: {
        date: "2023.05.19  11am",
        place: "Gyeongbokgung Palace",
      },
      mate: {
        profile:
          "https://s3-alpha-sig.figma.com/img/f408/2883/2744c00e820f277563889c3bca4f7fd4?Expires=1693785600&Signature=NW7GU2ur3j9YwthaW4SX5bT1gE7AS7qHLUs5sduOuNmgwPVorgWkqEhqTl2Z8XLFE4nkXrAVDgih3i3xp40tFIhkWtswSY43pb4pvZtRj46trdGdAuR2lsbiLUUZqNFSFHAJiv-7afUX0x7cgYAO0IPAxyIaPdJhjpxOC9odP3-kgazfqDl9UlaF1ALav4o1ZgD8ciEYXZbZzu5HjEGlfzenwd5Th7vR71MVGHnzxul7JjW3iIKOY3kLs2blDiPuySnWlwwYrpWEJabh7Z2OUD9Fmw5MWSnsxrBYpWFWDyYmHYas7RXi0WlNFJb-NBt5y4CCAjnH3cCLwAzF0ilKZQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
        nickname: "Harper",
      },
      acceptedDate: "2023.05.05  13:50",
      hasReview: false,
    },
  ]);

  let iconType: string, itemStyle: string;

  const handleType = (type: string, hasReview: boolean) => {
    switch (type) {
      case "scheduled":
        iconType = scheduledIcon;
        itemStyle = "scheduled";
        break;
      case "completed":
        iconType = completedIcon;
        itemStyle = hasReview ? "disabled" : "completed"; // completed && 리뷰 있으면 비활성화
        break;
      case "canceled":
        iconType = canceledIcon;
        itemStyle = "disabled"; // canceled이면 비활성화
    }
  };

  const handleSpotDetailClick = () => {
    console.log("장소 디테일 페이지로 이동");
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
      {appointments && (
        <div className="appointments-container">
          {appointments.map(item => {
            handleType(item.type, item.hasReview);

            return (
              <div
                key={item.id}
                className={`appointment-item-container ${itemStyle}`}
              >
                <div className="appointment-item-header">
                  <div className="appointment-date">{item.meeting.date}</div>
                  <div className={`appointment-type ${item.type}`}>
                    <img src={iconType} />
                    {item.type}
                  </div>
                </div>

                <div className="appointment-item-body">
                  <div className="appointment-place-container">
                    <img id="pin-icon" src={pinIcon} />
                    <div className="appointment-place">
                      {item.meeting.place}
                    </div>
                    <img
                      id="arrow-icon"
                      src={arrowIcon}
                      onClick={handleSpotDetailClick}
                    />
                  </div>

                  <div className="meeting-detail-container">
                    <div className="mate-profile-container">
                      <img src={item.mate.profile} />
                      <div className="mate-nickname">{item.mate.nickname}</div>
                    </div>
                    <div className="accepted-date">{item.acceptedDate}</div>
                  </div>
                </div>

                {item.type === "scheduled" && (
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
                {item.type === "completed" && !item.hasReview && (
                  <div className="appointment-item-footer">
                    <div
                      className="appointment-btn write-review"
                      onClick={() => handleWriteReviewClick(item.id)}
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
