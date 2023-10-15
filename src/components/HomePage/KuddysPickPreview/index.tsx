import "./kuddys-pick-preview.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KuddysPickMainInfo from "@components/KuddysPickDetailPage/KuddysPickMainInfo";
import defaultthumbnail from "@assets/location/default_travel_thumbnail.svg";
import { ReactComponent as ArrowIcon } from "@assets/icon/home_text_arrow.svg";
import { useQuery } from "react-query";
import { kuddyspickGetPreview } from "@services/api/kuddyspick";
import { useResetRecoilState } from "recoil";
import { titleKeyword } from "@services/store/kuddyspick";

const KuddysPickPreview = () => {
  const nav = useNavigate();
  const resetKuddysPickKeyword = useResetRecoilState(titleKeyword);
  const { data } = useQuery(["kuddysPickPrevew"], kuddyspickGetPreview, {
    staleTime: 1800000,
    cacheTime: Infinity,
    retry: 3,
  });
  useEffect(() => {
    resetKuddysPickKeyword();
  }, []);
  console.log(data?.data.data);
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
      {data && (
        <div className="kuddyspickpreview-container">
          {data.data.data.map((item: KuddysPickPreviewType) => (
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
                      <img
                        src={
                          content.imageUrl ? content.imageUrl : defaultthumbnail
                        }
                        alt={content.name}
                      />
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
