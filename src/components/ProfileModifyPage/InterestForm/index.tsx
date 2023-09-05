import "./interest-form.scss";
import { useState, useEffect } from "react";

const InterestForm = () => {
  // 수정 필요
  const interests = {
    category: [
      "Running",
      "Basketball",
      "Baseball",
      "Tennis",
      "Bicycle",
      "Yoga",
      "Golf",
    ],
  };

  return (
    <div className="interest-edit-container">
      <div className="selected-interest-cnt">0 / 10</div>
      <div className="interest-list-container">
        {Object.keys(interests).map((interestKey: string, index: number) => {
          return (
            <div key={index}>
              <div className="category-text">{interestKey}</div>
              <div className="interest-item-slide">
                {interests.category.map(interest => {
                  return <div className="interest-item">{interest}</div>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterestForm;
