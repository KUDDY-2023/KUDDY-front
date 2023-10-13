import "./region-form.scss";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { profileState } from "@services/store/auth";
import { citiesData } from "@pages/auth/LoginFormPage/forms/AreaForm/citiesData";
import { useUpdateProfile } from "@services/hooks/profile";

type cityDataType = { id: number; city: string; selected: boolean };

type Props = {
  onClose: () => void;
};

const RegionForm = ({ onClose }: Props) => {
  const profile = useRecoilValue(profileState); // 프로필 전역 상태 값
  const [regions, setRegions] = useState<cityDataType[]>([]);
  const [selectedCnt, setSelectedCnt] = useState(0); // 선택된 지역 수
  const onUpdateProfile = useUpdateProfile();

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

  // 프로필에 저장된 지역 불러오기
  useEffect(() => {
    const selectedArea = profile?.districts?.map((area: any) => area.areaName);
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

  // 저장 버튼 클릭
  const handleSaveClick = () => {
    const newAreaName = regions
      .filter(region => region.selected)
      .map(region => ({ areaName: region.city }));
    onUpdateProfile({ districts: newAreaName });

    onClose();
  };

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
      <div className="save-btn" onClick={handleSaveClick}>
        Save
      </div>
    </div>
  );
};

export default RegionForm;
