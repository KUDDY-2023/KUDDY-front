import "./delete_account_page.scss";

import { useState } from "react";
import BackNavBar from "@components/_common/BackNavBar";
import EventBtn from "@components/_common/EventBtn";

import { ReactComponent as CheckOn } from "@assets/icon/check_on.svg";
import { ReactComponent as CheckOff } from "@assets/icon/check_off.svg";

export default function DeleteAccountPage() {
  const [isCheck, setIsCheck] = useState(false);
  const _handleCheck = () => setIsCheck(!isCheck);
  return (
    <div className="delete-account-page">
      <BackNavBar middleTitle="Delete my account" isShare={false} />

      <div className="guide-text-container">
        <h2>Are you really leaving Kuddy?</h2>

        <p>
          When you delete an account, all information is lost. This is
          irreversible.
        </p>
        <p>
          Information to be deleted: profile information, location save history,
          chat history, all appointment information
        </p>
      </div>

      <div className="agreement-container" onClick={_handleCheck}>
        {isCheck ? <CheckOn /> : <CheckOff />}
        <p>I have read the precautions carefully and agree to everything.</p>
      </div>
      <EventBtn
        btnName="Delete my account"
        isActive={isCheck}
        onClick={() => console.log("탈퇴 로직")}
      />
    </div>
  );
}
