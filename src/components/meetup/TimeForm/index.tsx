import "./time-form.scss";
import { useState } from "react";

export default function TimeForm() {
  return (
    <div className="time-form-style">
      <p>Time</p>
      <div className="date">2023.12.25</div>
      <div className="time">12:00 PM</div>
    </div>
  );
}
