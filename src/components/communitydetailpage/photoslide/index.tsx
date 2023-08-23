import "./photoslide.scss";
import "swiper/swiper.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

const PhotoSlide = () => {
  const nav = useNavigate();
  const [photoInfo, setPhotoInfo] = useState<PhotoType[]>([
    {
      photoId: 1,
      src: "https://s3-alpha-sig.figma.com/img/1d1e/d4ca/2af3a9a59e0e8f7e44937ac553ce8e6e?Expires=1693180800&Signature=jUI6LzN76yuls53Nq5Eoc6g7SNn~bB6zxbStq9VNUAhOmChkaRkFItJUGKuc30155ywM6YYxYefgmGvA2zJV9G1pmzU52IHUP6RIEtjJ716dW5XQ2UskZyEdjLxFA6YKUWfbKsBkv9qtwAjdZdTrdpl4qoqr4SvXB-QX3O14p-cZeSvVbychHjmfwmiyxTnh~LZNDvjAg6625qqppZJBK-GbbeSUyZTj1ooRo4HOthR6kSebqXe2dpIl~9sklmZoKo4lA9jBO1T93eGZsDMJSEO4VylajpWUyC3dYh0xJNmdkdNJAkhVCpDCiqXKyWeqjNQBQUvYm3Q9tTZz~4c5Mg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    },
    {
      photoId: 2,
      src: "https://s3-alpha-sig.figma.com/img/9a52/5465/cd2edd6fb14c2d8b4bc3e90fca935b79?Expires=1693180800&Signature=UUBNQzSIYx~oQ6SLNyqUbl0FuJ~B~t4er9L6mcPojxnmntSldI4GN1RAtWWdyGYobGtTbPoiv-~sBSTH~JQd32dhNntQYFaxdI8rC87O4htGsblybKwupECZgAS5de8EDs9z9UUBcdU-dywgM8N2hFriuQdiyekZLOmSAKe8RzUuSFB0e73yZ5o51yk4tOSJS6Ja4Sn1kFoEgvZYzMBkVNSCj9HpYQKCSQaMXcZwS0Ca79~06PbxmifIfwZyMBESoT6vb0pJ1YDFyzAxIHanYk2~BkxYQJqIYUY6zd6k5A~JwemXgsEf8ueEFRwr4f5f36tUlkychQXDIrCI0a~YwQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    },
    {
      photoId: 3,
      src: "https://s3-alpha-sig.figma.com/img/4566/68e2/3f9b21481ee80a9a897a3bb7aa4fd489?Expires=1693180800&Signature=CbxneAbZ6KMQbfgLWJHmMJ-XbbZ2NzwOi5TdGVA007EPK2UEOgE97rRX~pzhGef985BBkNhRgGjahkK4nMhDN5h1hudqBAuzxvEHAXZ8x~rSCx8dlCuwvTkVVnI7OhV6dOP6CRRYgMjJzerFjJlc0yyMN3S6Xk-lmy6JS85bBntZOr8HTr2kovvewXyKDPs2U4pxtYtEv7L~rjscXOPzoD8sUsiF3Y86ucT6eo8b5VpfgOeCpsHqvrSpLtPSkMGXE8OdvJummWgvuxMZ9W5xhWd66naEk0Kodo1L700QcAirkI~ERyq73kEyms2zf1YMJyfvObOltxZ2D24UXC0hlg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    },
  ]);
  return (
    <Swiper
      className="photo-slide-container"
      slidesPerView={"auto"}
      spaceBetween={6}
      onClick={() => nav("image-view")}
    >
      {photoInfo.map(item => (
        <SwiperSlide className="photo-slide" key={item.photoId}>
          <img src={item.src} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PhotoSlide;
