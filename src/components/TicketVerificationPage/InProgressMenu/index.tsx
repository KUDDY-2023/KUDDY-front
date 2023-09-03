import { ReactComponent as HelpIcon } from "@assets/ticket/help.svg";
import { ReactComponent as LoadingIcon } from "@assets/ticket/loading.svg";

const InProgressMenu = () => {
  return (
    <>
      <div className="middle-wrapper">
        <div className="more-text">
          <HelpIcon />
          <p>more about ticket verification</p>
        </div>
        <div className="image-rect">
          <LoadingIcon />
          <p>Application completed</p>
        </div>
        <div className="des-text">
          The manager will check the uploaded flight ticket and approve it.
        </div>
      </div>
      <div className="button disabled">Screening in progress</div>
    </>
  );
};

export default InProgressMenu;
