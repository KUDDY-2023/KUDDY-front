import "./interestform.scss";
import { useState, useEffect } from "react";
import { InterestData } from "./interestsData";

import { useRecoilState } from "recoil";
import { profileState } from "@services/store/auth";
import { useUpdateProfile } from "@services/hooks/profile";

export default function InterestForm() {
  const [profile, setProfile] = useRecoilState(profileState); // 전역상태

  const [count, setCount] = useState(0);
  const [interests, setInterests] = useState(InterestData);

  const _handleClickInterestBtn = (
    categoryIndex: number,
    interestIndex: number,
  ) => {
    if (
      count < 10 ||
      (count >= 10 &&
        interests[categoryIndex].interests[interestIndex].selected)
    ) {
      const updatedInterests = [...interests];

      // 반대로
      updatedInterests[categoryIndex].interests[interestIndex].selected =
        !updatedInterests[categoryIndex].interests[interestIndex].selected;
      setInterests(updatedInterests);
    }
  };

  useEffect(() => {
    let _count = 0;

    interests.forEach(interest => {
      let c = interest.interests.filter(i => i.selected).length;
      _count += c;
    });

    setCount(_count);
  }, [interests]);

  return (
    <div className="interest-form-container">
      <p className="title">Choose your interests</p>

      <div className="form-container">
        <div className="count">{count} / 10</div>

        <div className="interest-container">
          {interests.map((categoryItem, categoryId) => (
            <div key={categoryId}>
              <h2>{categoryItem.category}</h2>
              <div className="flex">
                {categoryItem.interests.map((interest, interestId) => (
                  <li
                    className="interest-btn"
                    id={interest.selected ? "active" : ""}
                    key={interestId}
                    onClick={() =>
                      _handleClickInterestBtn(categoryId, interestId)
                    }
                  >
                    {interest.inter}
                  </li>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
