import "./region-form.scss";
import { useState, useEffect } from "react";
import { citiesData } from "@pages/auth/LoginFormPage/forms/AreaForm/citiesData";

type cityDataType = { id: number; city: string; selected: boolean };

const RegionForm = ({ profile }: any) => {
  const [regions, setRegions] = useState<cityDataType[]>([]); // 연결
  const [selectedCnt, setSelectedCnt] = useState(0);

  const handleRegionClick = (id: number) => {
    const newRegions = regions.map(region => {
      return region.id === id
        ? { ...region, selected: !region.selected }
        : region;
    });

    if (selectedCnt < 10 || (selectedCnt >= 10 && regions[id - 1].selected)) {
      setRegions(newRegions);
    }
  };

  useEffect(() => {
    const selectedArea = profile.areas.map((area: any) => area.areaName);
    const newArea = citiesData.map(city => {
      return { ...city, selected: selectedArea.includes(city.city) };
    });
    setRegions(newArea);
  }, []);

  // 선택한 개수 업데이트
  useEffect(() => {
    let cnt = regions.filter(region => region.selected).length;
    setSelectedCnt(cnt);
  }, [regions]);

  return (
    <div className="region-edit-container">
      <div className="selected-region-cnt">{selectedCnt} / 10</div>
      <div className="region-btn-container">
        {regions.map(region => (
          <div
            key={region.id}
            className={region.selected ? "region-btn selected" : "region-btn"}
            onClick={() => handleRegionClick(region.id)}
          >
            {region.city}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionForm;
