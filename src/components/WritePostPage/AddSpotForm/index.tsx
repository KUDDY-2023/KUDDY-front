import "./add-spot-form.scss";
import { useState, useEffect } from "react";
import searchBtn from "@assets/icon/search.svg";

type Props = {
  onClose: () => void;
};

const AddSpotForm = ({ onClose }: Props) => {
  const { kakao } = window;
  const [map, setMap] = useState();
  const [selectedPlace, setSelectedPlace] = useState("");
  const [places, setPlaces] = useState([
    {
      id: 1,
      name: "Gyeongbokgung",
      image: "https://www.royalpalace.go.kr/images/sub/gbg.jpg",
      district: "Jogno",
      mapX: 126.97722,
      mapY: 37.57861,
    },
    {
      id: 2,
      name: "Gyeonghuigung",
      image: "https://www.royalpalace.go.kr/images/sub/gbg.jpg",
      district: "Jogno",
      mapX: 126.969698,
      mapY: 37.569482,
    },
    {
      id: 3,
      name: "Gyeongdong Market",
      image: "https://www.royalpalace.go.kr/images/sub/gbg.jpg",
      district: "Dongdaemun",
      mapX: 127.040189,
      mapY: 37.58509,
    },
    {
      id: 4,
      name: "Gyeonglidan-gil",
      image: "https://www.royalpalace.go.kr/images/sub/gbg.jpg",
      district: "Yongsan",
      mapX: 126.992284,
      mapY: 37.540118,
    },
    {
      id: 5,
      name: "Gyeonglidan-gil",
      image: "https://www.royalpalace.go.kr/images/sub/gbg.jpg",
      district: "Yongsan",
      mapX: 126.992284,
      mapY: 37.540118,
    },
  ]);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("modal-map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 7,
      };
      setMap(new kakao.maps.Map(container, options));
    });
  }, []);

  return (
    <div className="spot-modal-container">
      <div className="spot-modal-title">Place</div>

      <div className="spot-search-container">
        <div className="spot-search-bar">
          <input type="text" />
          <img src={searchBtn} />
        </div>
        <div className="spot-result-container">
          {/* 입력된 텍스트 없으면 아래 문구 띄우기 */}
          {/*
          <div className="spot-search-guide">
            Please enter the correct name.
          </div>
          */}
          {places.map(p => {
            return (
              <div key={p.id} className="spot-item-container">
                <img src={p.image} />
                <div className="spot-item-text-container">
                  <div className="spot-item-title">{p.name}</div>
                  <div className="spot-item-district">{p.district}</div>
                </div>
                <div className="spot-select-btn">select</div>
              </div>
            );
          })}
        </div>
      </div>

      <div id="modal-map"></div>
      <div className="add-itinerary-btn" onClick={onClose}>
        Add to itinerary
      </div>
    </div>
  );
};

export default AddSpotForm;
