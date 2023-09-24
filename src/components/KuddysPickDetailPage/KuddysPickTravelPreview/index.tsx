import "./kuddys-pick-travel-preview.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

const KuddysPickTravelPreview = ({
  name,
  detail,
  pickImageList,
}: KuddysPickDetailContentType) => {
  return (
    <>
      <div className="kuddyspicktravelpreview-container">
        <p className="travel-name">{name}</p>
        <p className="description">
          {detail &&
            (detail.includes("\n") ? (
              <>
                {detail.split("\n").map((line: string) => {
                  return (
                    <span>
                      {line}
                      <br />
                    </span>
                  );
                })}
              </>
            ) : (
              <>
                <span>{detail}</span>
              </>
            ))}
        </p>
      </div>
      <div className="kuddyspicktravelpreview-swiper-wrapper">
        <Swiper
          slidesPerView={"auto"}
          loop={true}
          spaceBetween={8}
          centeredSlides={true}
        >
          {pickImageList.map((item: string) => (
            <SwiperSlide key={item}>
              <div className="swiper-rect">
                <img src={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default KuddysPickTravelPreview;
