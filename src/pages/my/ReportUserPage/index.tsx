import BackNavBar from "@components/_common/BackNavBar";
import "./reportuserpage.scss";
import { useEffect, useState } from "react";
import EventBtn from "@components/_common/EventBtn";
import { reasonsData } from "./reasonsData";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthReportUser } from "@services/hooks/user";

import Loading from "@components/_common/Loading";

export default function ReportUserPage() {
  const [searchParams, _] = useSearchParams();
  const userId = Number(searchParams.get("userId"));

  const [selectedId, setSelectedId] = useState<number>(0); // 선택한 이유 번호
  const [text, setText] = useState(""); // 입력한 이유
  const [isSelected, setIsSelected] = useState(false);

  const [isActive, setIsActive] = useState(false); // 이벤트 버튼

  const _handleRadioChange = (selectedId: number) => {
    setSelectedId(selectedId);
    setIsSelected(true);
  };

  useEffect(() => {
    setIsActive(text !== "" && isSelected);
  }, [text, selectedId]);

  const { onReport, isLoading } = useAuthReportUser({
    targetId: userId,
    reason: selectedId,
    explanation: text,
  });

  return (
    <div className="report-user-page">
      <BackNavBar middleTitle="report user" isShare={false} />

      {isLoading && (
        <Loading
          backColor="rgba(0, 0, 0, 0.5)"
          spinnerColor="#FFF798"
          size="80px"
        />
      )}

      <div className="reason-container">
        {reasonsData.map(r => {
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

      <EventBtn btnName="Submit" isActive={isActive} onClick={onReport} />
    </div>
  );
}
