import BackNavBar from "@components/_common/BackNavBar";
import "./reportuserpage.scss";
import { useEffect, useState } from "react";

import EventBtn from "@components/_common/EventBtn";

export default function ReportUserPage() {
  // 쿼리스트링에 유저 아이디 포함하기

  // 이유
  const [reasons, setReasons] = useState([
    { id: 0, reason: "Impersonation" },
    { id: 1, reason: "Spam" },
    { id: 2, reason: "Intellectual property violation" },
    { id: 3, reason: "Harassment or privacy violation" },
    { id: 4, reason: "Nudity or pornography" },
    { id: 5, reason: "Other" },
  ]);

  const [text, setText] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [selectedId, setSelectedId] = useState<number>(-1);

  const _handleRadioChange = (selectedId: number) => {
    setSelectedId(selectedId);
  };

  useEffect(() => {
    if (text !== "" && selectedId !== -1) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [text, selectedId]);

  const _handleSubmitReport = () => {
    console.log("버튼 함수 실행");
  };

  return (
    <div className="report-user-page">
      <BackNavBar middleTitle="report user" isShare={true} />

      <div className="reason-container">
        {reasons.map(r => {
          let id = `r${r.id}`;
          return (
            <div className="radio-div" onClick={() => _handleRadioChange(r.id)}>
              <input type="radio" id={id} name="rr" />
              <label htmlFor={id}>
                <span id="basic-span">
                  <p id="active-span"></p>
                </span>
                <p>{r.reason}</p>
              </label>
            </div>
          );
        })}
      </div>

      <div className="explain-container">
        <h2>Explain this report</h2>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Provide additional details to help us understand this problem"
        ></textarea>
      </div>

      <EventBtn
        btnName="Submit"
        isActive={isActive}
        onClick={_handleSubmitReport}
      />
    </div>
  );
}
