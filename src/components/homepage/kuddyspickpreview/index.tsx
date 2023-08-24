import "./kuddyspickpreview.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import KuddysPickMainInfo from "@components/kuddyspickpage/kuddyspickmaininfo";
import { ReactComponent as ArrowIcon } from "@assets/homepage/arrow.svg";

type ContentType = {
  id: number;
  thumbnail: string;
  name: string;
  description: string;
};
export type KuddysPickPreviewType = {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  contents: ContentType[];
};

// onClick 영역 및 네비게이트할 Path 확정 필요
const KuddysPickPreview = () => {
  const nav = useNavigate();
  const [kuddysPickPreview, setKuddysPickPreview] = useState<
    KuddysPickPreviewType[]
  >([
    {
      id: 1,
      thumbnail:
        "https://dimg.donga.com/ugc/CDB/29STREET/Article/62/4f/89/e7/624f89e71852dc4c5c02.jpg",
      title: "The Most Picked Jamsil Spot",
      description: "Three popular attractions in Jamsil with various charms!",
      contents: [
        {
          id: 1,
          thumbnail:
            "https://korean.visitseoul.net/comm/getImage?srvcId=POST&parentSn=21278&fileTy=POSTTHUMB&fileNo=1",
          name: "Lotte World Tower",
          description:
            "a huge vertical city with 123 floors and a height of 555m",
        },
        {
          id: 2,
          thumbnail:
            "https://여기유.com/data/editor/2203/20220307122514_fe8623518b810259338b56c4742c978a_98ba.jpg",
          name: "Songpa Naru Park",
          description: "Cherry Blossom Spot with Seokchon Lake",
        },
        {
          id: 3,
          thumbnail:
            "https://www.womennews.co.kr/news/photo/202105/211362_343480_619.jpeg",
          name: "Seoul Forest",
          description: "a tree-filled park where a jazz festival is held",
        },
      ],
    },
    {
      id: 2,
      thumbnail:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjA2MjVfMjI4/MDAxNjU2MTYxNjQzMzMy.3jd1dsG56BsBHeP0AxRBE6g_0hzzeqGzAD7v-dV5nDog.7dIvVL-rNV4V9Cc-w8BfRBuzDp0n9uOHVIVGR1_UG78g.JPEG.gina171/1656161313332.jpg?type=w800",
      title: "10 The best view point for Han-River",
      description: "Three popular attractions in Jamsil with various charms!",
      contents: [
        {
          id: 1,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB-hSKNIY2E3iMjL69Rutu2QUmfYEFIZfUxA&usqp=CAU",
          name: "Lotte World Tower",
          description:
            "a huge vertical city with 123 floors and a height of 555m",
        },
        {
          id: 2,
          thumbnail:
            "https://mblogthumb-phinf.pstatic.net/MjAyMjA2MjhfMjAg/MDAxNjU2NDAyODg3MzAx.kNc4BkHMq04l6U-dPXsCRS8VU4ydmPnrBzc_WCrrtcIg.R7OGtjrdYz5OAWVaz-gGlV3LM0cz1p1F9gUDzACEw80g.JPEG.ningss01/DSC07488.JPG?type=w800",
          name: "Songpa Naru Park",
          description: "Cherry Blossom Spot with Seokchon Lake",
        },
        {
          id: 3,
          thumbnail:
            "https://data.si.re.kr/sites/default/files/photos6/06O03105Ba42000.jpg",
          name: "Seoul Forest",
          description: "a tree-filled park where a jazz festival is held",
        },
      ],
    },
  ]);
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
      <div className="kuddyspickpreview-container">
        {kuddysPickPreview.map(item => (
          <div key={item.id} style={{ marginBottom: "30px" }}>
            <KuddysPickMainInfo {...item} />
            {item.contents &&
              item.contents.map(content => (
                <div
                  className="kuddyspickpreview-content-rect"
                  key={`${item.id}${content.id}`}
                >
                  <div className="kuddyspickpreview-content-img-rect">
                    <img src={content.thumbnail} alt={content.name} />
                  </div>
                  <div className="kuddyspickpreview-content-text">
                    <div className="name">{content.name}</div>
                    <div className="description">{content.description}</div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default KuddysPickPreview;
