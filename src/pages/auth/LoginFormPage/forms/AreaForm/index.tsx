import "./areaform.scss";
import { useState, useEffect } from "react";

export default function AreaForm() {
  const [citys, setCitys] = useState([
    { id: 1, city: "Gangnam", selected: false },
    { id: 2, city: "Gangdong", selected: false },
    { id: 3, city: "Gangbuk", selected: false },
    { id: 4, city: "Gangseo", selected: false },
    { id: 5, city: "Gwanak", selected: false },
    { id: 6, city: "Gwangjin", selected: false },
    { id: 7, city: "Guro", selected: false },
    { id: 8, city: "Geumcheon", selected: false },
    { id: 9, city: "Nowon", selected: false },
    { id: 10, city: "Dobong", selected: false },
    { id: 11, city: "Dongdaemun", selected: false },
    { id: 12, city: "Dongjak", selected: false },
    { id: 13, city: "Mapo", selected: false },
    { id: 14, city: "Seodaemun", selected: false },
    { id: 15, city: "Seocho", selected: false },
    { id: 16, city: "Seongdong", selected: false },
    { id: 17, city: "Seongbuk", selected: false },
    { id: 18, city: "Songpa", selected: false },
    { id: 19, city: "Yangcheon", selected: false },
    { id: 20, city: "Yeongdeungpo", selected: false },
    { id: 21, city: "Yongsan", selected: false },
    { id: 22, city: "Eunpyeong", selected: false },
    { id: 23, city: "Jongno", selected: false },
    { id: 24, city: "Junggu", selected: false },
    { id: 25, city: "Jungnang", selected: false },
  ]);

  const [count, setCount] = useState(0);

  const _handleClickCityBtn = (id: number) => {
    const updatedCitys = citys.map(city =>
      city.id === id ? { ...city, selected: !city.selected } : city,
    );

    if (count < 10 || (count >= 10 && citys[id - 1].selected)) {
      setCitys(updatedCitys);
    }
  };

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
            >
              {city.city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
