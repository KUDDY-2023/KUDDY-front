import "./search-result-place-item.scss";
import { ReactComponent as DefaultImg } from "@assets/location/default_travel_thumbnail.svg";

interface PlaceItemType {
  category: string;
  contentId: number;
  district: string;
  imageUrl: string;
  mapX: string;
  mapY: string;
  name: string;
}

interface Props {
  placeItem: PlaceItemType;
  onSelectPlace: (placeName: string, spotContentId: number) => void;
}

export default function SearchResultPlaceItem({
  placeItem,
  onSelectPlace,
}: Props) {
  return (
    <div className="search-result-place-item" key={placeItem.contentId}>
      <div className="result-img">
        {placeItem.imageUrl ? <img src={placeItem.imageUrl} /> : <DefaultImg />}
      </div>
      <div className="result-info">
        <p className="place-name">
          <span>{placeItem.name}</span>
        </p>
        <p className="place-gu">{placeItem.district}</p>
      </div>
      <div
        className="select-btn"
        onClick={() => onSelectPlace(placeItem.name, placeItem.contentId)}
      >
        select
      </div>
    </div>
  );
}
