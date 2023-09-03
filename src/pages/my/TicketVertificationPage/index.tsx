import "./ticket-verification-page.scss";
import BackNavBar from "@components/_common/BackNavBar";
import { useState, useEffect } from "react";
import CompletedMenu from "@components/TicketVerificationPage/CompletedMenu";
import InProgressMenu from "@components/TicketVerificationPage/InProgressMenu";
import UploadMenu from "@components/TicketVerificationPage/UploadMenu";

export type TicketInfoType = {
  ticketImageUrl: string;
  ticketStatus:
    | "NOT_YET"
    | "SCREENING_IN_PROGRESS"
    | "CERTIFICATION_FAILED"
    | "CERTIFICATION_COMPLETE";
};

const TicketVerificationPage = () => {
  const [ticketInfo, setTicketInfo] = useState<TicketInfoType>({
    ticketImageUrl: "",
    ticketStatus: "NOT_YET",
  });
  return (
    <>
      <BackNavBar middleTitle="Ticket verification" isShare={false} />
      <div className="ticket-verification-page-wrapper">
        {ticketInfo.ticketStatus === "CERTIFICATION_COMPLETE" ? (
          <CompletedMenu />
        ) : ticketInfo.ticketStatus === "SCREENING_IN_PROGRESS" ? (
          <InProgressMenu />
        ) : ticketInfo.ticketStatus === "NOT_YET" ||
          ticketInfo.ticketStatus === "CERTIFICATION_FAILED" ? (
          <UploadMenu {...ticketInfo} />
        ) : null}
      </div>
    </>
  );
};

export default TicketVerificationPage;
