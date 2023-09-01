import "./personalityform.scss";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "@services/store/auth";
import { useUpdateProfile } from "@services/hooks/auth";
export default function PersonalityForm() {
  const [profile, setProfile] = useRecoilState(profileState); // 전역상태

  const Intro = profile.temperament === "INTROVERT";
  const Judge = profile.decisionMaking === "JUDGING";

  const [intro, setIntro] = useState([Intro, !Intro]); // 연결
  const [judge, setJudge] = useState([Judge, !Judge]); // 연결

  const onUpdateProfile = useUpdateProfile();

  const _handleClickIntroBtn = (intro: boolean) => {
    if (intro) {
      setIntro([true, false]);
      onUpdateProfile({ temperament: "INTROVERT" });
    } else {
      setIntro([false, true]);
      onUpdateProfile({ temperament: "EXTROVERT" });
    }
  };

  const _handleClickJudgeBtn = (judge: boolean) => {
    if (judge) {
      setJudge([true, false]);
      onUpdateProfile({ decisionMaking: "JUDGING" });
    } else {
      setJudge([false, true]);
      onUpdateProfile({ decisionMaking: "PROSPECTING" });
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
