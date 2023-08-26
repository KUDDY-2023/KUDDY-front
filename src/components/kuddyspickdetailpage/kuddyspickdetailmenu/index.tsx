import "./kuddyspickdetailmenu.scss";
import { useState } from "react";
import BackNavBar from "@components/_common/backnavbar";
import KuddysPickMainInfo from "@components/kuddyspickpage/kuddyspickmaininfo";
import KuddysPickTravelPreview from "@components/kuddyspickdetailpage/kuddyspicktravelpreview";
import KuddysPickTravelBlock from "@components/kuddyspickdetailpage/kuddyspicktravelblock";

export type ImageType = {
  id: number;
  alt: string;
  imgSrc: string;
};
export type KuddysPickDetailContentType = {
  id: number;
  travel: {
    id: number;
    name: string;
    district: string;
    category: string;
    thumbnail: string;
  };
  description: string;
  image: ImageType[];
};
export type KuddysPickDetailType = {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  contents: KuddysPickDetailContentType[];
};

const KuddysPickDetailMenu = () => {
  const [currentKuddysPick, setCurrentKuddysPick] =
    useState<KuddysPickDetailType>({
      id: 1,
      thumbnail:
        "https://dimg.donga.com/ugc/CDB/29STREET/Article/62/4f/89/e7/624f89e71852dc4c5c02.jpg",
      title: "The Most Picked Jamsil Spot",
      description:
        "Three popular attractions in Jamsil with various charms! Three popular attractions in Jamsil with various charms!",
      contents: [
        {
          id: 1,
          travel: {
            id: 20970,
            name: "Lotte World Tower",
            district: "Jongno",
            category: "Attraction",
            thumbnail:
              "https://korean.visitseoul.net/comm/getImage?srvcId=POST&parentSn=21278&fileTy=POSTTHUMB&fileNo=1",
          },
          description:
            "With 123 floors and 555 meters in height, LOTTE WORLD TOWER is the world’s 5th tallest building.\n\nThe future-oriented vertical metropolis in which globalism, Korea’s traditional beauty, human technology, cutting-edge technology, and nature exists in harmony.",
          image: [
            {
              id: 1,
              alt: "Lotte World Tower 1",
              imgSrc:
                "https://korean.visitseoul.net/comm/getImage?srvcId=POST&parentSn=21278&fileTy=POSTTHUMB&fileNo=1",
            },
            {
              id: 2,
              alt: "Lotte World Tower 2",
              imgSrc:
                "https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/9f33865c-7d6e-42f0-a9ae-7c7a80112ff1.jpeg",
            },
            {
              id: 3,
              alt: "Lotte World Tower 3",
              imgSrc:
                "https://ak-d.tripcdn.com/images/1i64u22348rcao7018AC3.jpg?proc=source/trip",
            },
          ],
        },
        {
          id: 2,
          travel: {
            id: 93877,
            name: "Songpa Naru Park Songpa Naru Park Songpa Naru Park",
            district: "Jongno",
            category: "Attraction",
            thumbnail:
              "https://여기유.com/data/editor/2203/20220307122514_fe8623518b810259338b56c4742c978a_98ba.jpg",
          },
          description:
            "With 123 floors and 555 meters in height, LOTTE WORLD TOWER is the world’s 5th tallest building.\n\nThe future-oriented vertical metropolis in which globalism, Korea’s traditional beauty, human technology, cutting-edge technology, and nature exists in harmony.",
          image: [
            {
              id: 1,
              alt: "Songpa Naru 1",
              imgSrc:
                "https://여기유.com/data/editor/2203/20220307122514_fe8623518b810259338b56c4742c978a_98ba.jpg",
            },
            {
              id: 2,
              alt: "Songpa Naru 2",
              imgSrc:
                "https://여기유.com/data/editor/2203/20220307122514_fe8623518b810259338b56c4742c978a_98ba.jpg",
            },
          ],
        },
      ],
    });
  return (
    <div className="kuddyspickdetail-wrapper">
      <BackNavBar middleTitle="" isShare={true} />
      <div className="inner-container">
        <KuddysPickMainInfo {...currentKuddysPick} />
      </div>
      {currentKuddysPick.contents &&
        currentKuddysPick.contents.map(item => (
          <>
            <KuddysPickTravelPreview {...item} />
            <KuddysPickTravelBlock {...item} />
          </>
        ))}
    </div>
  );
};

export default KuddysPickDetailMenu;
