import "./add-spot-form.scss";
import { useState, useEffect } from "react";

const AddSpotForm = () => {
  const { kakao } = window;
  const [map, setMap] = useState(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
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

      <div id="map" className="spot-modal-map"></div>
      <div className="add-itinerary-btn">Add to itinerary</div>
    </div>
  );
};

export default AddSpotForm;
