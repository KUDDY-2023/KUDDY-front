import "./itinerary-block.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRecoilState } from "recoil";
import BottomUpModal from "@components/_common/BottomUpModal";
import AddSpotForm from "@components/WritePostPage/AddSpotForm";
import addBtn from "@assets/community/add_btn.svg";
import moveBtn from "@assets/community/move_btn.svg";
import xBtn from "@assets/icon/red_x.svg";
import customPin from "@assets/community/customPin.svg";
import { itineraryPostState } from "@services/store/community";

type markerType = {
  mapX: number;
  mapY: number;
  idx: number;
};

const ItineraryBlock = () => {
  const [itineraryPost, setItineraryPost] = useRecoilState(itineraryPostState);
  const { kakao } = window;
  const contentRef = useRef<any>();
  const [spots, setSpots] = useState<SpotType[]>([]);
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any>([]); // 마커
  const [overlays, setOverlays] = useState<any>([]); // 커스텀 오버레이
  const [polylines, setPolylines] = useState<any>([]); // 마커 사이의 선
  const [distances, setDistances] = useState<number[]>([]); // 장소 간 거리
  const [isSelected, setIsSelected] = useState(false); // 모달에서 장소 선택 여부
  const [selectedPlace, setSelectedPlace] = useState<SpotType>(); // 모달에서 선택한 장소
  const [btnText, setBtnText] = useState("delete");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // textarea 자동 높이 조절
  const handleResizeHeight = useCallback(() => {
    contentRef.current.style.height = contentRef.current.scrollHeight + "px";
  }, []);

  const handleChangeTitle = (event: any) => {
    setItineraryPost({ ...itineraryPost, title: event.target.value });
  };

  const handleChangeContent = (event: any) => {
    setItineraryPost({ ...itineraryPost, content: event.target.value });
  };

  // delete 버튼 클릭
  const handleDeleteClick = () => {
    btnText === "delete" ? setBtnText("done") : setBtnText("delete");
  };

  // 지도 관련
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map-spot");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 7,
      };
      setMap(new kakao.maps.Map(container, options));
    });
  }, []);

  // 마커, 오버레이 생성 & 지도에 표시
  function addMarker(newMarkers: markerType[]) {
    const updatedMarkers = [];
    const updatedOverlays = [];
    for (let i = 0; i < newMarkers.length; i++) {
      var placePosition = new kakao.maps.LatLng(
        newMarkers[i].mapY,
        newMarkers[i].mapX,
      );
      var imageSize = new kakao.maps.Size(18, 22); // 마커 이미지의 크기
      var markerImage = new kakao.maps.MarkerImage(customPin, imageSize);
      var marker = new kakao.maps.Marker({
        position: placePosition, // 마커의 위치
        image: markerImage,
      });

      // 커스텀 오버레이 (몇 번째 장소인지 표시)
      var content =
        '<div id="spot-num-custom">' + `${newMarkers[i].idx + 1}` + "</div>";

      var customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: placePosition,
        content: content,
        yAnchor: 1,
      });

      marker.setMap(map);
      updatedMarkers.push(marker);
      updatedOverlays.push(customOverlay);
    }

    setMarkers([...markers, ...updatedMarkers]);
    setOverlays([...overlays, ...updatedOverlays]); // 생성된 커스텀 오버레이 추가

    map.setCenter(
      new kakao.maps.LatLng(
        newMarkers[updatedMarkers.length - 1].mapY,
        newMarkers[updatedMarkers.length - 1].mapX,
      ),
    );

    return marker;
  }

  // 라인 배열에 추가
  const addLine = (linePath: any[]) => {
    const updatedPolylines = [];
    const updatedDistances = [];
    for (let i = 0; i < linePath.length; i++) {
      var newPolyline = new kakao.maps.Polyline({
        path: linePath[i], // 선 구성하는 좌표배열
        strokeWeight: 4,
        strokeColor: "#31302A",
        strokeOpacity: 1,
        strokeStyle: "dashed",
      });
      updatedPolylines.push(newPolyline);
      updatedDistances.push(Math.round(newPolyline.getLength() / 1000));
    }

    setPolylines([...polylines, ...updatedPolylines]);
    setDistances([...distances, ...updatedDistances]);
  };

  useEffect(() => {
    // 장소 전역 상태 업데이트
    const newSpots = spots?.map(spot => spot.contentId);
    setItineraryPost({ ...itineraryPost, spots: newSpots });
  }, [spots]);

  useEffect(() => {
    // 장소 삭제 시 마커 & 오버레이 다시 그리기
    if (markers.length === 0 && spots.length > 0) {
      const newMarkers = [];
      for (let i = 0; i < spots.length; i++) {
        newMarkers.push({ mapX: spots[i].mapX, mapY: spots[i].mapY, idx: i });
      }
      addMarker(newMarkers);
    }
  }, [spots, markers, overlays]);

  // polylines 업데이트
  useEffect(() => {
    // polylines 다시 저장 (장소 삭제 시)
    if (polylines.length === 0 && spots.length > 1) {
      const newLinePath = [];
      for (let i = 0; i < spots.length - 1; i++) {
        const linePath = [
          new kakao.maps.LatLng(spots[i].mapY, spots[i].mapX),
          new kakao.maps.LatLng(spots[i + 1].mapY, spots[i + 1].mapX),
        ];
        newLinePath.push(linePath);
      }
      addLine(newLinePath);
    }

    // polylines 지도에 다시 그리고, distance도 업데이트
    for (let i = 0; i < polylines.length; i++) {
      polylines[i].setMap(map);
    }
  }, [spots, polylines]);

  // 마커 삭제
  function removeMarker(idx: number) {
    // 마커 & 커스텀 오버레이 지도에서 삭제
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
      overlays[i].setMap(null);
    }
    setMarkers([]);
    setOverlays([]);
    // 장소 삭제
    const newSpots = spots.filter((spot, index) => idx !== index);
    setSpots(newSpots);

    // 라인 삭제
    if (polylines?.length > 0) {
      for (let i = 0; i < polylines.length; i++) {
        polylines[i].setMap(null);
      }
      setPolylines([]);
      setDistances([]);
    }
  }

  // 모달 관련
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsSelected(false);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);

    if (typeof selectedPlace === "undefined") return;
    // 장소 저장 추가
    if (isSelected) {
      if (spots.length > 0) {
        const lastIdx = spots.length - 1;
        const linePath = [
          new kakao.maps.LatLng(spots[lastIdx].mapY, spots[lastIdx].mapX),
          new kakao.maps.LatLng(selectedPlace.mapY, selectedPlace.mapX),
        ];
        addLine([linePath]);
      }
      setSpots([...spots, selectedPlace]);
      // 마커 추가
      addMarker([
        {
          mapX: selectedPlace.mapX,
          mapY: selectedPlace.mapY,
          idx: spots.length,
        },
      ]);
    }
  };

  // 모달에서 선택한 장소 저장
  const saveSelectedPlace = (spot: SpotType) => {
    setSelectedPlace(spot);
    setIsSelected(true);
  };

  return (
    <div className="itinerary-block-container">
      <div className="content-block-container">
        <input type="text" placeholder="Title" onChange={handleChangeTitle} />
        <div className="boundary-line"></div>
        <textarea
          ref={contentRef}
          placeholder="Write down what you're curious about."
          onInput={handleResizeHeight}
          onChange={handleChangeContent}
        />
      </div>

      <div className="itinerary-form-header">
        <div>Route</div>
        <div
          className={`place-delete-btn ${btnText}`}
          onClick={handleDeleteClick}
        >
          {btnText}
        </div>
      </div>

      <div className="spot-list-container">
        {/* 선택한 장소가 없으면 add 버튼만 띄우기, 있으면 spot 버튼 가장 아래에 */}

        {spots?.map((spot, index) => {
          return (
            <>
              <div className="spot-item-container">
                <div className="spot-item">
                  <div className="spot-num">{index + 1}</div>
                  <div className="spot-name">{spot.name}</div>
                  <div className="spot-district">{spot.district}</div>
                </div>
                {btnText === "delete" ? (
                  <img src={moveBtn} />
                ) : (
                  <img src={xBtn} onClick={() => removeMarker(index)} />
                )}
              </div>
              <div className="spot-distance-container">
                <div className="spot-line"></div>
                {index === spots.length - 1 ? (
                  <div className="spot-distance">distance</div>
                ) : (
                  <div className="spot-distance">{distances[index]} km</div>
                )}
              </div>
            </>
          );
        })}

        {/* 코스 리스트 여기까지 반복 */}
        <div className="spot-add-btn" onClick={handleOpenModal}>
          <img src={addBtn} />
          Add
        </div>
      </div>

      <BottomUpModal
        isModalOpen={isModalOpen}
        onClose={handleCloseModal}
        navbarHeight={56}
        isWhiteBackground={false}
      >
        <AddSpotForm
          onClose={handleCloseModal}
          onSavePlace={saveSelectedPlace}
        />
      </BottomUpModal>

      <div id="map-spot"></div>
    </div>
  );
};

export default ItineraryBlock;
