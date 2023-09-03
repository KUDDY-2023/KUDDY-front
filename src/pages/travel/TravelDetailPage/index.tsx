import BackNavBar from "@components/_common/BackNavBar";
import { useState, useEffect } from "react";
import TravelDetailTitle from "@components/Travel/TravelDetailTitle";
import { matesArrayK, matesArrayT } from "@pages/travel/TravelDetailPage/_mock";
import TravelDetailSection from "@components/Travel/TravelDetailSection";

const TravelDetailPage = () => {
  const [currentTravel, setCurrentTravel] = useState<TravelDetailType>({
    contentId: 50928,
    name: "Gyeongbo kgung PalaceGyeo ngbokgung Palace",
    district: "Jongno",
    imageList: [
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_3000,h_2000,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/cbjf8qofim5anaadb4s2/%EA%B2%BD%EB%B3%B5%EA%B6%81%EA%B0%80%EC%9D%B4%EB%93%9C%ED%88%AC%EC%96%B4-%ED%81%B4%EB%A3%A9Klook%ED%95%9C%EA%B5%AD.jpg",
      "https://www.kocis.go.kr/CONTENTS/editImage/20230329144152690_2V3S9BMD.jpg",
      "https://www.shinsegaegroupnewsroom.com/wp-content/uploads/2017/11/1-1.jpg",
    ],
    category: "Restaurant",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam feugiat lacinia volutpat. Aliquam pharetra vulputate erat, venenatis tincidunt velit dapibus varius. Ut vulputate est vel tempor mollis. Cras eu tellus at orci dapibus vulputate quis eu odio. Nunc porttitor tellus in nisl fringilla, ac tempus dolor interdum. Pellentesque mattis pharetra commodo. Sed consectetur vestibulum imperdiet. Quisque auctor risus eu odio finibus, non vulputate quam mattis. Nulla condimentum massa eget massa tristique, ac iaculis ante vestibulum. Donec tempus hendrerit sem, nec aliquam arcu egestas vitae. Duis mi erat, condimentum maximus est eget, posuere auctor sapien.\n\nSuspendisse odio neque, placerat ultricies consectetur sit amet, blandit sed leo. Mauris justo ligula, pharetra ut feugiat at, commodo eu massa. Aenean at pellentesque leo. Donec vestibulum orci non sem porttitor aliquam. Donec laoreet tristique volutpat. Donec a massa suscipit, accumsan lectus in, pulvinar ipsum. In ac gravida metus, nec rutrum mauris. Suspendisse id velit sagittis, rutrum turpis ut, commodo orci. Vivamus volutpat condimentum dolor sit amet tincidunt. Quisque non placerat urna. Integer cursus, sem eu malesuada convallis, odio augue sagittis arcu, ut laoreet elit quam et nisi. Nam mollis nisi et rhoncus egestas. Pellentesque arcu lectus, feugiat in lectus sit amet, vestibulum dictum nunc. In porttitor facilisis nunc, sed mattis ipsum condimentum a.",
    phoneNum: "82-2-3700-3900",
    homepage: "www.royalpalace.go.kr",
    location: "161. Sajik-ro, Jongno-gu, Seoul, 03045, Republic of Korea",
    post: "03045",
    heart: 2,
    additionalInfo: {
      treatmenu: "House-made Burger / French Fries",
      infocenterfood:
        "•1330 Travel Hotline: +82-2-1330 <br> (Korean, English, Japanese, Chinese) <br> • For more info: +82-2-533-7180",
      reservationfood: "",
      parkingfood: "",
      opendatefood: "",
      lcnsno: "20100098800",
      seat: "",
      scalefood: "",
      firstmenu: "House-made Burger",
      smoking: "Non-smoking",
      opentimefood: "11:30-22:00",
      restdatefood: "Every Monday",
    },
    nearbyPlace: [
      {
        contentId: 2954204,
        name: "8th Avenue WithPharm Pharmacy [Tax Refund Shop] (8번가위드팜약국)",
        district: "Seodaemun",
        category: "Shopping",
        imageUrl:
          "http://tong.visitkorea.or.kr/cms/resource/75/2890675_image2_1.jpg",
        mapX: "126.9433187706",
        mapY: "37.5630679072",
      },
      {
        contentId: 2959250,
        name: "ABC-Mart - Sinchon Branch [Tax Refund Shop] (ABC마트 GS신촌점)",
        district: "Seodaemun",
        category: "Shopping",
        imageUrl:
          "http://tong.visitkorea.or.kr/cms/resource/95/2890495_image2_1.jpg",
        mapX: "126.9374278017",
        mapY: "37.5573684645",
      },
      {
        contentId: 2959920,
        name: "Age 20S [Tax Refund Shop] (AGE 20S)",
        district: "Mapo",
        category: "Shopping",
        imageUrl:
          "http://tong.visitkorea.or.kr/cms/resource/76/2891076_image2_1.jpg",
        mapX: "126.9265121176",
        mapY: "37.5577987750",
      },
      {
        contentId: 1231222,
        name: "Alternative Space Loop (대안공간 루프)",
        district: "Mapo",
        category: "Culture",
        imageUrl:
          "http://tong.visitkorea.or.kr/cms/resource/85/1807785_image2_1.jpg",
        mapX: "126.9278315359",
        mapY: "37.5544630750",
      },
      {
        contentId: 2473312,
        name: "Aoi Tori (아오이토리)",
        district: "Mapo",
        category: "Restaurant",
        imageUrl:
          "http://tong.visitkorea.or.kr/cms/resource/12/2470212_image2_1.jpg",
        mapX: "126.9294424917",
        mapY: "37.5547575140",
      },
    ],
    kuddyList: matesArrayK,
    travelerList: matesArrayT,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BackNavBar middleTitle="" isShare={true} />
      <TravelDetailTitle {...currentTravel} />
      <TravelDetailSection
        isOpen={true}
        isTop={true}
        title="About"
        content={currentTravel.about}
      />
      <TravelDetailSection
        title="Phone number"
        content={currentTravel.phoneNum}
      />
      <TravelDetailSection title="Homepage" content={currentTravel.homepage} />
      <TravelDetailSection
        title="Location"
        content={currentTravel.location}
        post={currentTravel.post}
      />
      <TravelDetailSection
        isOpen={true}
        title="Additional Information"
        content={currentTravel.additionalInfo}
        category={currentTravel.category}
      />
      <TravelDetailSection
        title="Nearby place"
        content=""
        nearbyArray={currentTravel.nearbyPlace}
      />
      <div style={{ height: "100px" }} />
    </>
  );
};

export default TravelDetailPage;
