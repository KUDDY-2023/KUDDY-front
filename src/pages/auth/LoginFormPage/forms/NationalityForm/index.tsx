import "./nationalityform.scss";
import { useState } from "react";
import DropDown from "@components/_common/DropDown";
export default function NationalityForm() {
  const nations = ["Korea", "US", "Ch"];
  return (
    <div className="nationality-form-container">
      <p className="title">Choose your nationality</p>

      <div className="form-container">
        <DropDown items={nations} placeholder="Nationality" />
      </div>
    </div>
  );
}
