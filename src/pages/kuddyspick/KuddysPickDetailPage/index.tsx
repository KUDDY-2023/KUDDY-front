import "./kuddys-pick-detail-page.scss";
import { useEffect, useState } from "react";
import BackNavBar from "@components/_common/BackNavBar";
import KuddysPickMainInfo from "@components/KuddysPickDetailPage/KuddysPickMainInfo";
import KuddysPickTravelPreview from "@components/KuddysPickDetailPage/KuddysPickTravelPreview";
import KuddysPickTravelBlock from "@components/KuddysPickDetailPage/KuddysPickTravelBlock";

const KuddysPickDetailPage = () => {
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
            "https://korean.visitseoul.net/comm/getImage?srvcId=POST&parentSn=21278&fileTy=POSTTHUMB&fileNo=1",
            "https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/9f33865c-7d6e-42f0-a9ae-7c7a80112ff1.jpeg",
            "https://ak-d.tripcdn.com/images/1i64u22348rcao7018AC3.jpg?proc=source/trip",
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
            "https://여기유.com/data/editor/2203/20220307122514_fe8623518b810259338b56c4742c978a_98ba.jpg",
          ],
        },
      ],
    });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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

export default KuddysPickDetailPage;
