import "./personalityform.scss";
import { useState } from "react";

export default function PersonalityForm() {
  const [intro, setIntro] = useState([true, false]);
  const [judge, setJudge] = useState([true, false]);

  const _handleClickIntroBtn = (intro: boolean) => {
    if (intro) {
      setIntro([true, false]);
    } else {
      setIntro([false, true]);
    }
  };

  const _handleClickJudgeBtn = (judge: boolean) => {
    if (judge) {
      setJudge([true, false]);
    } else {
      setJudge([false, true]);
    }
  };

  return (
    <div className="personality-form-container">
      <p className="title">Choose your personality</p>

      <div className="form-container">
        <div className="btn-container-flex">
          <div
            className="btn-style"
            id={intro[0] ? "active" : ""}
            onClick={() => _handleClickIntroBtn(true)}
          >
            Introvert
          </div>
          <p>or</p>
          <div
            className="btn-style"
            id={intro[1] ? "active" : ""}
            onClick={() => _handleClickIntroBtn(false)}
          >
            Extrovert
          </div>
        </div>
        <div className="btn-container-flex">
          <div
            className="btn-style"
            id={judge[0] ? "active" : ""}
            onClick={() => _handleClickJudgeBtn(true)}
          >
            Judging
          </div>
          <p>or</p>
          <div
            className="btn-style"
            id={judge[1] ? "active" : ""}
            onClick={() => _handleClickJudgeBtn(false)}
          >
            Prospecting
          </div>
        </div>
      </div>
    </div>
  );
}
