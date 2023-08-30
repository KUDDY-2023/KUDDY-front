import "./nationalityform.scss";
import { useState } from "react";
import DropDown from "@components/_common/DropDown";
export default function NationalityForm() {
  const nations = ["Korea", "US", "Ch"];
  const _handle = (idx: number, item: string) => {};
  let temp = { language: "Language", level: "Level" };
  return (
    <div className="nationality-form-container">
      <p className="title">Choose your nationality</p>

      <div className="form-container">
        {/* <DropDown
          items={nations}
          type="Nationality"
          id={1}
          state="d"
          placeholder="Nationality"
          onSelect={_handle}
        /> */}
      </div>
    </div>
  );
}
