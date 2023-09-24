import { ReactComponent as DoneIcon } from "@assets/ticket/done.svg";

const CompletedMenu = () => {
  return (
    <div className="completed-menu-wrapper">
      <DoneIcon />
      <p>Already verified</p>
    </div>
  );
};

export default CompletedMenu;
