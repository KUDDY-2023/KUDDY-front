import React from "react";

type PlaceBlockProps = {
  imgSrc: string;
  name: string;
  district: string;
  isPick: boolean; // 픽한 장소 모아보기에서만 true, 아닐땐 생략
};

// 1:1 이미지 + 이름 + 구로 이루어진 하나의 장소 블록
const PlaceBlock = ({ imgSrc, name, district, isPick }: PlaceBlockProps) => {
  return <></>;
};

export default PlaceBlock;
