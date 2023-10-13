import "./basic-modify-form.scss";
import { ReactNode } from "react";

type Props = {
  text: string;
  children: ReactNode;
};

const BasicModifyForm = ({ text, children }: Props) => {
  return (
    <div className="basic-modify-container">
      <div className="profile-subtitle">{text}</div>
      {children}
    </div>
  );
};

export default BasicModifyForm;
