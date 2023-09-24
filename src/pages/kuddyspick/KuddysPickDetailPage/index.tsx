import "./kuddys-pick-detail-page.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackNavBar from "@components/_common/BackNavBar";
import KuddysPickMainInfo from "@components/KuddysPickDetailPage/KuddysPickMainInfo";
import KuddysPickTravelPreview from "@components/KuddysPickDetailPage/KuddysPickTravelPreview";
import KuddysPickTravelBlock from "@components/KuddysPickDetailPage/KuddysPickTravelBlock";
import { kuddyspickGetDetail } from "@services/api/kuddyspick";

const KuddysPickDetailPage = () => {
  const { id } = useParams();
  const [currentKuddysPick, setCurrentKuddysPick] =
    useState<KuddysPickDetailType>();

  useEffect(() => {
    window.scrollTo(0, 0);
    kuddyspickGetDetail(Number(id))
      .then(res => setCurrentKuddysPick(res.data.data))
      .catch();
  }, []);

  return (
    <div className="kuddyspickdetail-wrapper">
      <BackNavBar middleTitle="" isShare={true} />
      <div className="inner-container">
        <KuddysPickMainInfo {...currentKuddysPick} />
      </div>
      {currentKuddysPick &&
        currentKuddysPick.pickSpotList.map((item: any) => (
          <>
            <KuddysPickTravelPreview {...item} />
            <KuddysPickTravelBlock {...item} />
          </>
        ))}
    </div>
  );
};

export default KuddysPickDetailPage;
