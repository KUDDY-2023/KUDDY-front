import "./kuddyspicktravelpreview.scss";
import { KuddysPickDetailContentType } from "@components/kuddyspickdetailpage/kuddyspickdetailmenu/index";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

const KuddysPickTravelPreview = ({
  id,
  travel,
  description,
  image,
}: KuddysPickDetailContentType) => {
  return (
    <>
      <div className="kuddyspicktravelpreview-container">
        <p className="travel-name">{travel.name}</p>
        <p className="description">
          {description &&
            (description.includes("\n") ? (
              <>
                {description.split("\n").map(line => {
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
                <span>{description}</span>
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
          {image.map(item => (
            <SwiperSlide key={item.id}>
              <div className="swiper-rect">
                <img src={item.imgSrc} alt={item.alt} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default KuddysPickTravelPreview;
