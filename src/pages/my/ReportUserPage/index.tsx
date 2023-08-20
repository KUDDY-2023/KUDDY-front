import BackNavBar from "@components/_common/backnavbar";
import "./reportuserpage.scss";
import { useState } from "react";

export default function ReportUserPage() {
  // 쿼리스트링에 유저 아이디 포함하기

  const [reasons, setReasons] = useState([
    { id: 0, reason: "Impersonation" },
    { id: 1, reason: "Spam" },
    { id: 2, reason: "Intellectual property violation" },
    { id: 3, reason: "Harassment or privacy violation" },
    { id: 4, reason: "Nudity or pornography" },
    { id: 5, reason: "Other" },
  ]);

  return (
    <div className="report-user-page">
      <BackNavBar middleTitle="report user" />

      <div className="reason-container">
        {reasons.map(r => {
          let id = `r${r.id}`;
          return (
            <div className="radio-div">
              <input type="radio" id={id} name="rr" />
              <label htmlFor={id}>
                <span></span>
                <p>{r.reason}</p>
              </label>
            </div>
          );
        })}
      </div>

      <div className="explain-container">
        <h2>Explain this report</h2>
        <textarea placeholder="Provide additional details to help us understand this problem"></textarea>
      </div>

      <div className="submit-btn">Submit</div>
    </div>
  );
}
