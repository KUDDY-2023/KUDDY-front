import BackNavBar from "@components/_common/BackNavBar";
import Loading from "@components/_common/Loading";
import Modal from "@components/_common/Modal";
import useCopyToClipboard from "@utils/hooks/useCopyToClipboard";
import { ReactComponent as ShareLinkIcon } from "@assets/icon/share_link.svg";
import { ReactComponent as ShareKakaoIcon } from "@assets/icon/share_kakao.svg";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TravelDetailTitle from "@components/Travel/TravelDetailTitle";
import TravelDetailSection from "@components/Travel/TravelDetailSection";

import { useDetailSpot } from "@services/hooks/spot";
import { useRecoilValue } from "recoil";
import { isLoginState } from "@services/store/auth";

declare global {
  interface Window {
    Kakao: any;
  }
}
const TravelDetailPage = () => {
  const { id } = useParams();
  const {
    data,
    isLoading,
    isFetching,
    isError,
    nearbyData,
    personalData,
    matesPreview,
    refetch,
  } = useDetailSpot(Number(id));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const isLogin = useRecoilValue(isLoginState);

  const [sectionType, setSectionType] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      setSectionType([
        {
          title: "About",
          key: "about",
          option: { isToggle: true, isTop: true },
        },
        { title: "Phone number", key: "phoneNum", option: null },
        { title: "Homepage", key: "homepage", option: null },
        {
          title: "Location",
          key: "location",
          option: {
            post: data.data.data["post"],
            name: data.data.data["name"],
            mapXY: `${data.data.data["mapY"]},${data.data.data["mapX"]}`,
          },
        },
        {
          title: "Additional Information",
          key: "additionalInfo",
          option: {
            isToggle: true,
            category: data.data.data["category"],
          },
        },
      ]);
    }
  }, [data]);

  const style = {
    width: "100%",
    height: "calc(100svh - 120px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { Kakao } = window;
  useEffect(() => {
    if (!Kakao.isInitialized())
      Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
  }, [window.Kakao]);
  var sendKakao = function () {
    Kakao.Link.sendScrap({
      requestUrl: "https://kuddy.co.kr",
      templateId: 99536,
      templateArgs: {
        thumbnail: data?.data.data.imageList[0],
        district: data?.data.data.district,
        path: `travel/${id}`,
        category: data?.data.data.category,
        name: data?.data.data.name,
        about: data?.data.data.about,
      },
    });
  };
  const { onCopy } = useCopyToClipboard(() => setModalOpen(false));

  return (
    <>
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
      {isError ? (
        <div style={style}>Not Found</div>
      ) : isLoading ? (
        <div style={style}>
          <Loading backColor="transparent" spinnerColor="#eee" size="30px" />
        </div>
      ) : (
        data && (
          <>
            <TravelDetailTitle
              {...data.data.data}
              matesPreview={matesPreview}
              refetch={refetch}
            />
            {sectionType.map(item => (
              <TravelDetailSection
                title={item.title}
                content={data.data.data[item.key as keyof TravelDetailType]}
                {...item.option}
                key={item.title}
              />
            ))}
            {isLogin && personalData && (
              <TravelDetailSection
                title="Places you may like"
                content=""
                placeArray={personalData.data.data}
              />
            )}
            {nearbyData && (
              <TravelDetailSection
                isTop={isLogin ? true : false}
                title="Nearby places"
                content=""
                placeArray={nearbyData.data.data}
              />
            )}
            <div style={{ height: "100px" }} />
          </>
        )
      )}
    </>
  );
};

export default TravelDetailPage;
