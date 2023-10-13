import { TicketInfoType } from "@pages/my/TicketVertificationPage";
import InfoModal from "@components/TicketVerificationPage/InfoModal";
import { ReactComponent as LoadingIcon } from "@assets/ticket/loading.svg";

const InProgressMenu = ({ ticketImageUrl }: TicketInfoType) => {
  return (
    <>
      <div className="middle-wrapper">
        <InfoModal />
        <div className="image-rect inprogress-preview">
          <img src={ticketImageUrl} />
          <div className="filter" />
          <LoadingIcon stroke="#ffffff" />
          <p>Submitted</p>
        </div>
        <div className="des-text">
          Your flight ticket will be reviewed and confirmed.
        </div>
      </div>
      <div className="button disabled">Review in progress</div>
    </>
  );
};

export default InProgressMenu;
