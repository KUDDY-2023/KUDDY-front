import { useState, useEffect } from "react";
import "./location-map-page.scss";
import BackNavBar from "@components/_common/BackNavBar";
import LocationPreviewBlock from "@components/Location/LocationPreviewBlock";
import pin from "@assets/location/pin.svg";
import curpin from "@assets/location/pin_current.svg";
import { ReactComponent as RefreshIcon } from "@assets/location/refresh.svg";
import { locationArray } from "@pages/home/LocationListPage/_mock";
import { LocationPreviewBlockProps } from "@components/Location/LocationPreviewBlock";
import { spotGetNearLocation } from "@services/api/spot";

declare global {
  interface Window {
    kakao: any;
  }
}
type pos = {
  y: number;
  x: number;
};

const LocationMapPage = () => {
  const { kakao } = window;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [locArray, setLocArray] = useState<TravelNearbyType[]>([]);
  const [map, setMap] = useState<any>();
  const [pos, setPos] = useState<pos>({ y: 33.450701, x: 126.570667 });
  const [clickedId, setClickedId] = useState<number>(0);
  const [blockProps, setBlockProps] = useState<LocationPreviewBlockProps>({
    contentId: 0,
    name: "",
    category: "",
    district: "",
    imageUrl: "",
  });

  useEffect(() => {
    setIsLoading(true);
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 7,
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
          setPos({ y: position.coords.latitude, x: position.coords.longitude });
          var locPosition = new kakao.maps.LatLng(lat, lon);
          map.setCenter(locPosition);
          setIsLoading(false);
        });
      } else {
        var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
        map.setCenter(locPosition);
        // Cannot find current location. Please allow permission collecting your location information.
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
    if (locationArray.data) setClickedId(locationArray.data[0].contentId);
  }, [locationArray.data]);

  var selectedMarker: any = null;
  useEffect(() => {
    // spotGetNearLocation(0, pos.y, pos.x);
    if (isLoading === false) {
      var positions = locationArray.data.map(item => {
        return {
          id: item.contentId,
          title: item.name,
          latlng: new kakao.maps.LatLng(item.mapY, item.mapX),
        };
      });
      positions.map((item, idx) =>
        displayMarker(
          item.latlng,
          item.title,
          item.id,
          idx === 0 ? true : false,
        ),
      );
    }
  }, [isLoading]);

  useEffect(() => {
    locationArray.data.map(
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
      {isLoading && <div className="loading-rect">loading</div>}
      <div id="map"></div>
      {!isLoading && blockProps && <LocationPreviewBlock {...blockProps} />}
    </div>
  );
};

export default LocationMapPage;