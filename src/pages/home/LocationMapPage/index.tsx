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
import { useNearLocation } from "@services/hooks/spot";

declare global {
  interface Window {
    kakao: any;
  }
}

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
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      setMap(new kakao.maps.Map(container, options));
    });
  }, []);

  useEffect(() => {
    if (map) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude,
            lon = position.coords.longitude;
          // setPos({ y: position.coords.latitude, x: position.coords.longitude });
          setPos({ y: 37.5615351, x: 126.9572863 });
          var locPosition = new kakao.maps.LatLng(pos.y, pos.x);
          map.setCenter(locPosition);
          setIsLoading(false);
        });
      } else {
        var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
        map.setCenter(locPosition);
        alert(
          "Cannot find current location.\nPlease allow permission collecting your location information.",
        );
        setIsLoading(false);
      }
    }
  }, [map]);

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
