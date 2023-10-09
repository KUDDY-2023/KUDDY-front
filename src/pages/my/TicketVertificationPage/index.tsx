import "./ticket-verification-page.scss";
import BackNavBar from "@components/_common/BackNavBar";
import { useState, useEffect } from "react";
import CompletedMenu from "@components/TicketVerificationPage/CompletedMenu";
import InProgressMenu from "@components/TicketVerificationPage/InProgressMenu";
import UploadMenu from "@components/TicketVerificationPage/UploadMenu";

import {
  profileGetTicketInfo,
  profileCreateTicketInfo,
  profilePatchTicketStatus,
} from "@services/api/profile";

export type TicketInfoType = {
  ticketId: number;
  ticketImageUrl: string;
  ticketStatus:
    | ""
    | "NOT_SUBMITTED"
    | "UNDER_REVIEW"
    | "INVALID_PHOTO"
    | "PHOTO_UNRECOGNIZABLE"
    | "CERTIFICATION_COMPLETE";
};

const TicketVerificationPage = () => {
  const [ticketInfo, setTicketInfo] = useState<TicketInfoType>({
    ticketId: 0,
    ticketImageUrl: "",
    ticketStatus: "",
  });
  const [getError, setGetError] = useState<any>({});

  useEffect(() => {
    profileGetTicketInfo()
      .then(res => setTicketInfo(res.data.data))
      .catch(err => setGetError(err.response.data));
  }, []);
  useEffect(() => {
    if (!getError) return;
    if (getError.errorCode === "C12000")
      setTicketInfo({ ...ticketInfo, ticketStatus: "NOT_SUBMITTED" });
  }, [getError]);

  //profilePatchTicketStatus("NOT_SUBMITTED");

  return (
    <>
      <BackNavBar middleTitle="Traveler verification" isShare={false} />
      <div className="ticket-verification-page-wrapper">
        {ticketInfo.ticketStatus === "CERTIFICATION_COMPLETE" ? (
          <CompletedMenu />
        ) : ticketInfo.ticketStatus === "UNDER_REVIEW" ? (
          <InProgressMenu {...ticketInfo} />
        ) : ticketInfo.ticketStatus === "" ? (
          <div />
        ) : (
          <UploadMenu {...ticketInfo} />
        )}
      </div>
    </>
  );
};

export default TicketVerificationPage;
