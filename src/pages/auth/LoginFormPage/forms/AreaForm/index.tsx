import "./areaform.scss";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "@services/store/auth";
import { useUpdateProfile } from "@services/hooks/profile";
import { citiesData } from "./citiesData";

type cityDataType = { id: number; city: string; selected: boolean };

export default function AreaForm() {
  const [profile, setProfile] = useRecoilState(profileState); // 전역상태
  const [citys, setCitys] = useState<cityDataType[]>([]); // 연결
  const [count, setCount] = useState(0);

  const onUpdateProfile = useUpdateProfile();

  const _handleClickCityBtn = (id: number) => {
    const updatedCitys = citys.map(city =>
      city.id === id ? { ...city, selected: !city.selected } : city,
    );

    const updatedCitysName = updatedCitys
      .filter(c => c.selected)
      .map(c => ({ areaName: c.city }));

    if (count < 10 || (count >= 10 && citys[id - 1].selected)) {
      setCitys(updatedCitys);
      onUpdateProfile({ districts: updatedCitysName });
    }
  };

  useEffect(() => {
    // 처음 한번만
    let tempArr = profile.districts.map(p => p.areaName);
    let newArr = citiesData.map(c => {
      return { ...c, selected: tempArr.includes(c.city) };
    });
    setCitys(newArr);
  }, []);

  useEffect(() => {
    setCount(citys.filter(city => city.selected).length);
  }, [citys]);

  return (
    <div className="area-form-container">
      <p className="title">Choose your region</p>

      <div className="form-container">
        <div className="count">{count} / 10</div>

        <div className="city-container">
          {citys.map(city => (
            <div
              className="city-btn"
              id={city.selected ? "active" : ""}
              onClick={() => _handleClickCityBtn(city.id)}
              key={city.id}
            >
              {city.city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
