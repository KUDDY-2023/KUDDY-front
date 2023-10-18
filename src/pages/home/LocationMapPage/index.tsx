import { useState, useEffect } from "react";
import "./location-map-page.scss";
import BackNavBar from "@components/_common/BackNavBar";
import Loading from "@components/_common/Loading";
import LocationPreviewBlock from "@components/Location/LocationPreviewBlock";
import pin from "@assets/location/pin.svg";
import curpin from "@assets/location/pin_current.svg";
import { ReactComponent as RefreshIcon } from "@assets/location/refresh.svg";
import { LocationPreviewBlockProps } from "@components/Location/LocationPreviewBlock";
import { useRecoilState } from "recoil";
import { currentPosition } from "@services/store/travel";
import { spotGetNearLocation } from "@services/api/spot";
import { useNearLocation } from "@services/hooks/spot";
import Swal from "sweetalert2";

declare global {
  interface Window {
    kakao: any;
  }
}
const defaultX: number = 126.977295;
const defaultY: number = 37.575267;

const LocationMapPage = () => {
  const { kakao } = window;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [map, setMap] = useState<any>();
  const [pos, setPos] = useRecoilState(currentPosition);
  const [spotsArray, setSpotsArray] = useState<TravelNearbyType[]>([]);
  const [clickedId, setClickedId] = useState<number>(0);
  const [blockProps, setBlockProps] = useState<LocationPreviewBlockProps>({
    contentId: 0,
    name: "",
    category: "",
    district: "",
    imageUrl: "",
  });

  const { pageLastItemRef, hasNextPage, data, isFetching } =
    useNearLocation(pos);

  useEffect(() => {
    setIsLoading(true);
    setNotAllowed(false);
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(defaultY, defaultX),
        level: 5,
      };
      setMap(new kakao.maps.Map(container, options));
    });
  }, []);

  const [notAllowed, setNotAllowed] = useState<boolean>(false);
  useEffect(() => {
    if (map) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            // 현재 위치 좌표
            setPos({
              y: position.coords.latitude,
              x: position.coords.longitude,
            });
            // 디폴트 좌표
            // setPos({ y: defaultY, x: defaultX });
            // 데이터가 없는 서울 밖 좌표
            // setPos({ y: 36.4615351, x: 127.9872863 });
            // 카카오맵 지원 영역(한국) 밖 좌표
            // setPos({ y: 37.4615351, x: 128.9872863 });
            var locPosition = new kakao.maps.LatLng(pos.y, pos.x);
            map.setCenter(locPosition);
            setIsLoading(false);
            setNotAllowed(false);
          },
          function (error) {
            if (error.message === "User denied Geolocation")
              setNotAllowed(true);
          },
        );
      }
    }
  }, [map]);
  useEffect(() => {
    // 현재 위치를 가져올 수 없는 경우
    if (notAllowed) {
      Swal.fire({
        title: "Fail to access your current location",
        text: "Please allow location permission to use this service.",
        icon: "error",
        iconColor: "#eeeeee",
        confirmButtonText: "OK",
      }).then(res => {
        if (res.isConfirmed) {
          setIsLoading(false);
          setPos({ y: defaultY, x: defaultX });
          map.setCenter(new kakao.maps.LatLng(defaultY, defaultX));
        }
      });
    }
  }, [notAllowed]);

  function displayMarker(
    locPosition: any,
    title: string,
    id: number,
    isFirst?: boolean,
  ) {
    var imageSize = new kakao.maps.Size(32, 32);
    var normalImage = new kakao.maps.MarkerImage(pin, imageSize);
    var clickedImage = new kakao.maps.MarkerImage(curpin, imageSize);
    var marker = new kakao.maps.Marker({
      map: map,
      position: locPosition,
      title: title,
      image: isFirst ? clickedImage : normalImage,
    });
    marker.normalImage = normalImage;
    marker.clickedImage = clickedImage;
    if (isFirst === true) {
      selectedMarker = marker;
      map.setCenter(locPosition);
    }
    kakao.maps.event.addListener(marker, "click", function () {
      if (isFirst === true && selectedMarker !== marker) {
        marker.setImage(normalImage);
      }
      if (!selectedMarker || selectedMarker !== marker) {
        !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);
        marker.setImage(clickedImage);
        map.panTo(marker.getPosition());
      }
      selectedMarker = marker;
      setClickedId(id);
    });
  }

  useEffect(() => {
    if (isFetching !== true && data)
      setSpotsArray(data.pages[0].data.data.spots);
  }, [isFetching]);

  var selectedMarker: any = null;
  useEffect(() => {
    if (!spotsArray[0]) return;
    setClickedId(spotsArray[0].contentId);
  }, [spotsArray]);

  useEffect(() => {
    if (isLoading === false) {
      var positions = spotsArray.map((item: TravelNearbyType) => {
        return {
          id: item.contentId,
          title: item.name,
          latlng: new kakao.maps.LatLng(item.mapY, item.mapX),
        };
      });
      positions.map((item: any, idx: number) =>
        displayMarker(
          item.latlng,
          item.title,
          item.id,
          idx === 0 ? true : false,
        ),
      );
    }
  }, [isLoading, spotsArray]);

  useEffect(() => {
    if (!spotsArray) return;
    spotsArray.map(
      item =>
        item.contentId === clickedId &&
        setBlockProps({
          contentId: item.contentId,
          name: item.name,
          category: item.category,
          district: item.district,
          imageUrl: item.imageUrl,
        }),
    );
  }, [clickedId]);

  const [noData, setNoData] = useState<boolean>(false);
  useEffect(() => {
    setNoData(false);
  }, []);
  useEffect(() => {
    if (!isLoading && !notAllowed)
      spotGetNearLocation({ page: 0, pos })
        .then()
        .catch(err => setNoData(err.response.status === 400));
  }, [isLoading, notAllowed]);
  useEffect(() => {
    if (noData) {
      Swal.fire({
        title: "Try somewhere else",
        text: "There is no recommendation near your location now.",
        icon: "error",
        iconColor: "#eeeeee",
        confirmButtonText: "OK",
      }).then(res => {
        if (res.isConfirmed) {
          setPos({ y: defaultY, x: defaultX });
          map.setCenter(new kakao.maps.LatLng(defaultY, defaultX));
          setIsLoading(false);
        }
      });
    }
  }, [noData]);

  return (
    <div className="location-map-page-wrapper">
      <BackNavBar middleTitle="Near my location" isShare={false} />
      {isLoading && (
        <div className="loading-container">
          <Loading backColor="transparent" spinnerColor="#eee" size="30px" />
        </div>
      )}
      <div id="map"></div>
      {!isLoading && blockProps && <LocationPreviewBlock {...blockProps} />}
    </div>
  );
};

export default LocationMapPage;
