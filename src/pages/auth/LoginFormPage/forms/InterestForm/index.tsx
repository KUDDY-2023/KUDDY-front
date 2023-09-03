import "./interestform.scss";
import { useState, useEffect } from "react";
import { InterestData } from "./interestsData";

import { useRecoilState } from "recoil";
import { profileState, interestsArrState } from "@services/store/auth";
import { useUpdateProfile } from "@services/hooks/profile";

export default function InterestForm() {
  const [interestsArr, setInterestsArr] = useRecoilState(interestsArrState); // 전역상태
  const [interests, setInterests] = useState(interestsArr); // 연결
  const [count, setCount] = useState(0);

  const _handleClickInterestBtn = (
    categoryIndex: number,
    interestIndex: number,
  ) => {
    if (
      count < 10 ||
      (count >= 10 &&
        interests[categoryIndex].interests[interestIndex].selected)
    ) {
      // interests 배열 깊은 복사
      const updatedInterests = JSON.parse(JSON.stringify(interests));

      // 복제된 배열을 수정 (불변성 o)
      updatedInterests[categoryIndex].interests[interestIndex].selected =
        !updatedInterests[categoryIndex].interests[interestIndex].selected;

      setInterests(updatedInterests); // 현재 상태 변경
      setInterestsArr(updatedInterests); // 전역 변경
    }
  };

  useEffect(() => {
    // 선택된 개수
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
