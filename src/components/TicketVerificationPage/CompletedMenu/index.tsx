import { ReactComponent as DoneIcon } from "@assets/ticket/done.svg";

const CompletedMenu = () => {
  return (
    <div className="completed-menu-wrapper">
      <DoneIcon />
      <p>Certification completed</p>
    </div>
  );
};

export default CompletedMenu;
