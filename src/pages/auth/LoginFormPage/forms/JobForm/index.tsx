import "./jobform.scss";
import { useState } from "react";

export default function JobForm() {
  const [job, setJob] = useState("");

  return (
    <div className="job-form-container">
      <p className="title">Enter your job</p>

      <div className="form-container">
        <p>Job</p>
        <input
          type="text"
          placeholder="Enter your job"
          value={job}
          onChange={e => setJob(e.target.value)}
        />
      </div>
    </div>
  );
}
