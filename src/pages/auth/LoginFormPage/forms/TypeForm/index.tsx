import "./typeform.scss";
import { useState } from "react";

export default function TypeForm() {
  const [type, setType] = useState([true, false]);

  const _handleClickTypeBtn = (type: string) => {
    if (type === "k-buddy") {
      setType([true, false]);
    } else if (type === "traveler") {
      setType([false, true]);
    }
  };

  return (
    <div className="type-form-container">
      <p className="title">Choose your user type</p>
      <div className="form-container">
        <div className="type-btn-container">
          <div
            className="inactive-type-btn"
            onClick={() => _handleClickTypeBtn("k-buddy")}
            id={type[0] ? "active" : ""}
          >
            K-buddy
          </div>
          <p>Korean Users Providing Guided Services</p>
        </div>
        <div className="type-btn-container">
          <div
            className="inactive-type-btn"
            onClick={() => _handleClickTypeBtn("traveler")}
            id={type[1] ? "active" : ""}
          >
            traveler
          </div>
          <p>Non-Korean Users Looking for K-buddy</p>
        </div>
      </div>
    </div>
  );
}
