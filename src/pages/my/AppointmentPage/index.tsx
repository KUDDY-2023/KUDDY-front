import "./appointmentpage.scss";
import { useState } from "react";
import BackNavBar from "@components/_common/backnavbar";
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
};

const AppointmentPage = () => {
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
    },
  ]);

  return (
    <>
      <BackNavBar middleTitle="My appointment" isShare={false} />
      {appointments && (
        <div className="appointments-container">
          {appointments.map(item => {
            return (
              <div key={item.id} className="appointment-item-container">
                <div className="appointment-item-header">
                  <div className="appointment-date">{item.meeting.date}</div>
                  <div className={`appointment-type ${item.type}`}>
                    {item.type}
                  </div>
                </div>
                <div className="appointment-item-body"></div>
                <div className="appointment-item-footer"></div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AppointmentPage;
