import "./search-result-place-item.scss";

interface PlaceItemType {
  id: number;
  placeName: string;
}

interface Props {
  placeItem: PlaceItemType;
  onSelectPlace: (placeName: string) => void;
}

export default function SearchResultPlaceItem({
  placeItem,
  onSelectPlace,
}: Props) {
  return (
    <div className="search-result-place-item" key={placeItem.id}>
      <div className="result-img"></div>
      <div className="result-info">
        <p className="place-name">
          <span>Gyeong</span>bokgung
        </p>
        <p className="place-gu">Yongsan</p>
      </div>
      <div
        className="select-btn"
        onClick={() => onSelectPlace(placeItem.placeName)}
      >
        select
      </div>
    </div>
  );
}
