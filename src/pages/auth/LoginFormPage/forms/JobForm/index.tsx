import "./jobform.scss";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "@services/store/auth";
import { useUpdateProfile } from "@services/hooks/profile";
export default function JobForm() {
  const [profile, setProfile] = useRecoilState(profileState); // 전역상태
  const [job, setJob] = useState(profile.job); // 상태 연결

  const onUpdateProfile = useUpdateProfile();

  const onChangeJob = (jobText: string) => {
    setJob(jobText);
    onUpdateProfile({ job: jobText });
  };

  return (
    <div className="job-form-container">
      <p className="title">Enter your job</p>

      <div className="form-container">
        <p>Job</p>
        <input
          type="text"
          placeholder="Enter your job"
          value={job}
          onChange={e => onChangeJob(e.target.value)}
        />
      </div>
    </div>
  );
}
