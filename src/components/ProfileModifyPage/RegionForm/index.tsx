import "./region-form.scss";
import { useState, useEffect } from "react";

const RegionForm = () => {
  const regions = [
    "Gangnam",
    "Gangdong",
    "Gangbuk",
    "Gangseo",
    "Gwanak",
    "Gwangjin",
    "Guro",
    "Geumcheon",
    "Nowon",
    "Dobong",
    "Dongdaemun",
    "Dongjak",
    "Mapo",
    "Seodaemun",
    "Seocho",
    "Seongdong",
    "Seongbuk",
    "Songpa",
    "Yangcheon",
    "Yeongdeungpo",
    "Yongsan",
    "Eunpyeong",
    "Jongno",
    "Junggu",
    "Jungnang",
  ];
  const [selected, setSelected] = useState(
    new Array(regions.length).fill(false),
  );
  const [selectedCnt, setSelectedCnt] = useState(0);

  const handleRegionClick = (selectedIndex: number) => {
    if (selectedCnt < 10) {
      let newSelected = selected.map((s, index) => {
        return selectedIndex === index ? !s : s;
      });
      setSelected(newSelected);
    }
  };

  useEffect(() => {
    let cnt = selected.filter(s => s).length;
    setSelectedCnt(cnt);
  }, [selected]);

  return (
    <div className="region-edit-container">
      <div className="selected-region-cnt">{selectedCnt} / 10</div>
      <div className="region-btn-container">
        {regions.map((region, index) => (
          <div
            key={index}
            className={selected[index] ? "region-btn selected" : "region-btn"}
            onClick={() => handleRegionClick(index)}
          >
            {region}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionForm;
