import { TicketInfoType } from "@pages/my/TicketVertificationPage";
import { ReactComponent as HelpIcon } from "@assets/ticket/help.svg";
import { ReactComponent as LoadingIcon } from "@assets/ticket/loading.svg";

const InProgressMenu = ({ ticketImageUrl }: TicketInfoType) => {
  return (
    <>
      <div className="middle-wrapper">
        <div className="more-text">
          <HelpIcon />
          <p>what is ticket verification</p>
        </div>
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
