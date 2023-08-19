import "./interestform.scss";
import { useState, useEffect } from "react";

export default function InterestForm() {
  const [count, setCount] = useState(0);
  const [interests, setInterests] = useState([
    {
      category: "category",
      interests: [
        { id: 0, city: "Running", selected: false },
        { id: 1, city: "Basketball", selected: false },
        { id: 2, city: "Baseball", selected: false },
      ],
    },
    {
      category: "category",
      interests: [
        { id: 3, city: "Running", selected: false },
        { id: 4, city: "Basketball", selected: false },
        { id: 5, city: "Baseball", selected: false },
      ],
    },
    {
      category: "category",
      interests: [
        { id: 6, city: "Running", selected: false },
        { id: 7, city: "Basketball", selected: false },
        { id: 8, city: "Baseball", selected: false },
      ],
    },
    {
      category: "category",
      interests: [
        { id: 9, city: "Running", selected: false },
        { id: 10, city: "Basketball", selected: false },
        { id: 11, city: "Baseball", selected: false },
      ],
    },
  ]);

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
    <div className="type-form-container">
      <p className="title">Choose your avialable area</p>

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
                    {interest.city}
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
