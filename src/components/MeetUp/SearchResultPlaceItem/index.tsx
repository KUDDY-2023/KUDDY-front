import "./search-result-place-item.scss";

export default function SearchResultPlaceItem() {
  return (
    <div className="search-result-place-item">
      <div className="result-img"></div>
      <div className="result-info">
        <p className="place-name">
          <span>Gyeong</span>bokgung
        </p>
        <p className="place-gu">Yongsan</p>
      </div>
      <div className="select-btn">select</div>
    </div>
  );
}
