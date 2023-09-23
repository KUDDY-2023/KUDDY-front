import "./post-content.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhotoSlide from "@components/CommunityDetailPage/PhotoSlide";
import commentIcon from "@assets/community/comment_icon.svg";
import customPin from "@assets/community/customPin.svg";

type Props = {
  postData: any;
  reviewCnt: number;
};

const PostContent = ({ postData, reviewCnt }: Props) => {
  const nav = useNavigate();
  const { kakao } = window;
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any>([]);
  const [distances, setDistances] = useState<number[]>([]);
  const category =
    typeof postData?.postType !== "undefined" ? "talking" : "itinerary";
  const createdDate = new Date(postData?.createdDate).toLocaleString("sv");

  // join us 상세
  const joinDetail = [
    { id: 1, title: "People", value: `${postData?.people}` },
    { id: 2, title: "Region", value: `${postData?.district}` },
    { id: 3, title: "Date", value: `${postData?.date}` },
  ];

  const handleProfileClick = (nickname: string) => {
    nav(`/profile/${nickname}`);
  };

  // 카카오맵 관련
  // 마커 생성
  const addMarker = (mapX: number, mapY: number, idx: number) => {
    var placePosition = new kakao.maps.LatLng(mapY, mapX); // 임의
    var imageSize = new kakao.maps.Size(18, 22); // 마커 이미지의 크기
    var markerImage = new kakao.maps.MarkerImage(customPin, imageSize);
    var marker = new kakao.maps.Marker({
      position: placePosition, // 마커의 위치
      image: markerImage,
    });

    marker.setMap(map); // 지도 위에 마커 표출
    setMarkers([...markers, marker]); // 생성된 마커 추가

    // 커스텀 오버레이 (몇 번째 장소인지 표시)
    var content = '<div id="spot-num-custom">' + `${idx}` + "</div>";

    var customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: placePosition,
      content: content,
      yAnchor: 1,
    });

    map.setCenter(new kakao.maps.LatLng(mapY, mapX));
  };

  const addLine = (linePath: any[]) => {
    var polyline = new kakao.maps.Polyline({
      path: linePath, // 선 구성하는 좌표배열
      strokeWeight: 4, // 선의 두께
      strokeColor: "#31302A", // 선의 색깔
      strokeOpacity: 1, // 선의 불투명도
      strokeStyle: "dashed", // 선의 스타일
    });

    setDistances(distance => [
      ...distance,
      Math.round(polyline.getLength() / 1000),
    ]);

    // 지도에 선을 표시합니다
    polyline.setMap(map);
  };

  // 지도 생성
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map-feedback");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 7,
      };
      setMap(new kakao.maps.Map(container, options));
    });
  }, []);

  useEffect(() => {
    // 마커 생성
    if (typeof postData?.spots !== "undefined") {
      const spots = postData?.spots;
      for (let i = 0; i < spots.length; i++) {
        addMarker(spots[i].mapX, spots[i].mapY, i + 1);

        if (i < spots.length - 1) {
          const linePath = [
            new kakao.maps.LatLng(spots[i].mapY, spots[i].mapX),
            new kakao.maps.LatLng(spots[i + 1].mapY, spots[i + 1].mapX),
          ];
          addLine(linePath);
        }
      }
    }
  }, [postData]);

  return (
    <div className="post-content-container">
      <div className="post-header">
        <div
          className="writer-container"
          onClick={() => {
            handleProfileClick(postData?.writerName);
          }}
        >
          <img src={postData?.writerProfile} alt="writer-profile" />
          <div className="writer-right-section">
            <div className="writer-name">{postData?.writerName}</div>
            <div className="write-date">{createdDate}</div>
          </div>
        </div>
        {category === "talking" && (
          <div
            className={
              postData?.postType === "joinus"
                ? "post-filter join-us"
                : "post-filter"
            }
          >
            {postData?.postType}
          </div>
        )}
      </div>

      <div className="post-body">
        <div className="post-title">{postData?.title}</div>
        {category === "talking" && postData?.postType === "joinus" && (
          <div className="join-detail-container">
            {joinDetail.map(item => (
              <div>
                <div className="join-detail-title">{item.title}</div>
                <div className="join-detail-value">{item.value}</div>
              </div>
            ))}
          </div>
        )}
        <div className="post-content">{postData?.content}</div>
        {/* 사진 있으면 사진, 코스 피드백 게시판이면 코스 및 지도 렌더링되도록 코드 추가 예정*/}
        {category === "itinerary" && (
          <div className="spot-list-container">
            {postData?.spots?.map((spot: any, index: number) => {
              return (
                <>
                  {index > 0 && (
                    <div className="spot-distance-container">
                      <div className="spot-line"></div>
                      <div className="spot-distance">
                        {distances[index - 1]}km
                      </div>
                    </div>
                  )}
                  <div className="spot-item-container">
                    <div className="spot-item">
                      <div className="spot-num">{index + 1}</div>
                      <div className="spot-name">{spot?.name}</div>
                      <div className="spot-district">
                        {spot?.district
                          .toLowerCase()
                          .replace(/\b[a-z]/, (letter: string) =>
                            letter.toUpperCase(),
                          )}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
            <div id="map-feedback"></div>
          </div>
        )}

        {postData?.fileUrls && <PhotoSlide />}
      </div>

      <div className="post-footer">
        <img src={commentIcon} alt="comment" />
        <p>{reviewCnt}</p>
      </div>
    </div>
  );
};

export default PostContent;
