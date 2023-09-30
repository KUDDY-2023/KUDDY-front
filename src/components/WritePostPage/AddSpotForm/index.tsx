import "./add-spot-form.scss";
import { useState, useEffect } from "react";
import useInput from "@utils/hooks/useInput";
import { useGetSpotKeyWord } from "@services/hooks/spot";
import searchBtn from "@assets/icon/search.svg";
import yellowPin from "@assets/community/pin_yellow.svg";

type Props = {
  onClose: () => void;
  onSavePlace: (spot: SpotType) => void;
};

const AddSpotForm = ({ onClose, onSavePlace }: Props) => {
  const { kakao } = window;
  const [map, setMap] = useState<any>();
  const searchInput = useInput("");
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [searchResults, setSearchResults] = useState<SpotType[]>([]); // 검색 결과
  const onSearchSpot = useGetSpotKeyWord();

  // 카카오맵 로드
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("modal-map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 7,
      };
      setMap(new kakao.maps.Map(container, options));
    });
    setSelectedIdx(-1);
  }, []);

  // 마커 생성
  const addMarker = (mapX: number, mapY: number) => {
    var placePosition = new kakao.maps.LatLng(mapY, mapX); // 임의
    var imageSize = new kakao.maps.Size(18, 22); // 마커 이미지의 크기
    var markerImage = new kakao.maps.MarkerImage(yellowPin, imageSize);
    var marker = new kakao.maps.Marker({
      position: placePosition, // 마커의 위치
      image: markerImage,
    });

    marker.setMap(map); // 지도 위에 마커 표출
    map.setCenter(new kakao.maps.LatLng(mapY, mapX));
  };

  // 검색 버튼 클릭
  const handleSearchClick = async () => {
    const res = await onSearchSpot(searchInput.value);
    setSearchResults(res.spots); // 검색 결과 저장
  };

  // select 버튼 클릭
  const handleSelectClick = (id: number, spot: SpotType) => {
    setSelectedIdx(id);
    onSavePlace(spot);
    addMarker(spot.mapX, spot.mapY);
  };

  return (
    <div className="spot-modal-container">
      <div className="spot-modal-title">Place</div>

      <div className="spot-search-container">
        <div className="spot-search-bar">
          <input type="text" {...searchInput} />
          <img src={searchBtn} onClick={handleSearchClick} />
        </div>
        <div
          className={
            searchResults.length > 0
              ? "spot-result-container"
              : "spot-result-container no-result"
          }
        >
          {/* 입력된 텍스트 없으면 아래 문구 띄우기 */}
          {searchResults.length === 0 && (
            <div className="spot-search-guide">
              Please enter the correct name.
            </div>
          )}
          {searchResults?.map((result, index) => {
            return (
              <div key={result?.contentId} className="spot-item-container">
                <img src={result?.imageUrl} />
                <div className="spot-item-text-container">
                  <div className="spot-item-title">{result?.name}</div>
                  <div className="spot-item-district">{result?.district}</div>
                </div>
                <div
                  className={
                    selectedIdx === index
                      ? "spot-select-btn selected"
                      : "spot-select-btn"
                  }
                  onClick={() => handleSelectClick(index, result)}
                >
                  select
                </div>
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
