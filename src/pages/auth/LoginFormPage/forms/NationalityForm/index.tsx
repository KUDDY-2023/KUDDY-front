import "./nationalityform.scss";
import { useState } from "react";
import DropDown from "@components/_common/DropDown";
export default function NationalityForm() {
  const [nation, setNation] = useState<string>("Nationality");
  const nations = ["Korea", "US", "Ch"];

  const _handlSelectLanguage = (id: number, type: string, selected: string) => {
    setNation(selected);
  };

  let temp = { language: "Language", level: "Level" };
  return (
    <div className="nationality-form-container">
      <p className="title">Choose your nationality</p>

      <div className="form-container">
        <DropDown
          items={nations}
          type="Nationality"
          id={1}
          state={nation}
          placeholder="Nationality"
          onSelect={_handlSelectLanguage}
        />
      </div>
    </div>
  );
}
