import "./kuddys-pick-preview.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KuddysPickMainInfo from "@components/KuddysPickDetailPage/KuddysPickMainInfo";
import { ReactComponent as ArrowIcon } from "@assets/icon/home_text_arrow.svg";
import { kuddyspickGetPreview } from "@services/api/kuddyspick";
import { useResetRecoilState } from "recoil";
import { titleKeyword } from "@services/store/kuddyspick";

const KuddysPickPreview = () => {
  const nav = useNavigate();
  const resetKuddysPickKeyword = useResetRecoilState(titleKeyword);
  const [kuddysPickPreview, setKuddysPickPreview] =
    useState<KuddysPickPreviewType[]>();
  useEffect(() => {
    resetKuddysPickKeyword();
    kuddyspickGetPreview()
      .then(res => setKuddysPickPreview(res.data.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className="kuddyspickpreview-header">
        <div className="kuddyspickpreview-title">KUDDY's Pick!</div>
        <div
          className="kuddyspickpreview-more"
          onClick={() => nav("/kuddys-pick/list")}
        >
          <p>more</p>
          <ArrowIcon />
        </div>
      </div>
      {kuddysPickPreview && (
        <div className="kuddyspickpreview-container">
          {kuddysPickPreview.map(item => (
            <div key={item.id} style={{ marginBottom: "30px" }}>
              <KuddysPickMainInfo {...item} />
              {item.pickSpotList &&
                item.pickSpotList.map(content => (
                  <div
                    className="kuddyspickpreview-content-rect"
                    key={`${item.id}${content.contentId}`}
                    onClick={() => nav(`/travel/${content.contentId}`)}
                  >
                    <div className="kuddyspickpreview-content-img-rect">
                      <img src={content.imageUrl} alt={content.name} />
                    </div>
                    <div className="kuddyspickpreview-content-text">
                      <div className="name">{content.name}</div>
                      <div className="description">{content.summary}</div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default KuddysPickPreview;
