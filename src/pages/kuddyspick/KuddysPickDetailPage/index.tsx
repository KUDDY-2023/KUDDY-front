import "./kuddys-pick-detail-page.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackNavBar from "@components/_common/BackNavBar";
import Modal from "@components/_common/Modal";
import useCopyToClipboard from "@utils/hooks/useCopyToClipboard";
import { ReactComponent as ShareLinkIcon } from "@assets/icon/share_link.svg";
import { ReactComponent as ShareKakaoIcon } from "@assets/icon/share_kakao.svg";

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

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { Kakao } = window;
  useEffect(() => {
    if (!Kakao.isInitialized())
      Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
  }, [window.Kakao]);
  var sendKakao = function () {
    Kakao.Link.sendScrap({
      requestUrl: "https://kuddy.co.kr",
      templateId: 99539,
      templateArgs: {
        title: currentKuddysPick?.title,
        content: currentKuddysPick?.content,
        path: `kuddys-pick/${id}`,
        image1: currentKuddysPick?.thumbnail,
        image2: currentKuddysPick?.pickSpotList[0].imageUrl,
        image3: currentKuddysPick?.pickSpotList[1].imageUrl,
      },
    });
  };
  const { onCopy } = useCopyToClipboard(() => setModalOpen(false));

  return (
    <div className="kuddyspickdetail-wrapper">
      <BackNavBar middleTitle="" isShare={true} setModalOpen={setModalOpen} />
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          closer={() => setModalOpen(false)}
          isXbtn={true}
        >
          <div className="share-modal-block">
            <div className="section" onClick={sendKakao}>
              <ShareKakaoIcon />
              <div className="text">share with KakaoTalk</div>
            </div>
            <div className="section" onClick={onCopy}>
              <ShareLinkIcon />
              <div className="text">copy link</div>
            </div>
          </div>
        </Modal>
      )}
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
