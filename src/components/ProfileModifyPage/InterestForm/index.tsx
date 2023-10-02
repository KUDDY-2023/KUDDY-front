import "./interest-form.scss";
import { useState, useEffect } from "react";
import { InterestData } from "../../../pages/auth/LoginFormPage/forms/InterestForm/interestsData";
import { useRecoilState } from "recoil";
import { interestsArrState } from "@services/store/auth";

type Props = {
  onClose: () => void;
};

const InterestForm = ({ onClose }: Props) => {
  const [interestsArr, setInterestsArr] = useRecoilState(interestsArrState); // 연결
  const [count, setCount] = useState(0);

  // interest item 클릭
  const handleInterestClick = (
    categoryIndex: number,
    interestIndex: number,
  ) => {
    if (
      count < 10 ||
      (count >= 10 &&
        interestsArr[categoryIndex].interests[interestIndex].selected)
    ) {
      const updatedInterests = JSON.parse(JSON.stringify(interestsArr));

      updatedInterests[categoryIndex].interests[interestIndex].selected =
        !updatedInterests[categoryIndex].interests[interestIndex].selected;

      setInterestsArr(updatedInterests);
    }
  };

  // 선택된 개수 업데이트
  useEffect(() => {
    let selectedCount = 0;
    interestsArr.forEach(category => {
      let c = category.interests.filter(interest => interest.selected).length;
      selectedCount += c;
    });
    setCount(selectedCount);
  }, [interestsArr]);

  // 저장 버튼 클릭
  const handleSaveClick = () => {
    onClose();
  };

  return (
    <div className="interest-edit-container">
      <div className="selected-interest-cnt">{count} / 10</div>
      <div className="interest-list-container">
        {interestsArr.map((categoryItem, categoryIdx) => {
          return (
            <div className="category-container" key={categoryIdx}>
              <div className="category-text">{categoryItem?.category}</div>
              <div className="interest-item-slide">
                {categoryItem.interests.map((interest, interestIdx) => {
                  return (
                    <div
                      key={interestIdx}
                      className={
                        !interest?.selected
                          ? "interest-item"
                          : "interest-item selected"
                      }
                      onClick={() =>
                        handleInterestClick(categoryIdx, interestIdx)
                      }
                    >
                      {interest?.inter}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="save-btn" onClick={handleSaveClick}>
        Save
      </div>
    </div>
  );
};

export default InterestForm;
