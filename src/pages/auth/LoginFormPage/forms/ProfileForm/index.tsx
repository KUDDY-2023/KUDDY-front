import "./profileform.scss";
import { useState } from "react";
import profile from "@assets/auth/user.png";
import { ReactComponent as Camera } from "@assets/auth/camera.svg";

export default function ProfileForm() {
  const [name, setName] = useState("Jane");

  return (
    <div className="profile-img-form-container">
      <p className="title">Set your profile</p>

      <div className="form-container">
        <div className="profile-container">
          <div id="profile">
            <img src={profile} alt="profile" />
          </div>
          <Camera />
        </div>

        <input
          placeholder="이름"
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
        />
      </div>
    </div>
  );
}
