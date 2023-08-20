import "./kuddyspickmenu.scss";
import KuddysPickSearchBar from "@components/kuddyspickpage/kuddyspicksearchbar";
import KuddysPickBlock from "@components/kuddyspickpage/kuddyspickblock";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type KuddysPickType = {
  id: number;
  thumbnail: string;
  title: string;
};

const KuddysPickMenu = () => {
  const { keyword } = useParams();
  const [kuddysPickList, setKuddysPickList] = useState<KuddysPickType[]>([
    {
      id: 1,
      thumbnail:
        "https://dimg.donga.com/ugc/CDB/29STREET/Article/62/4f/89/e7/624f89e71852dc4c5c02.jpg",
      title: "The Most Picked Jamsil Spot",
    },
    {
      id: 2,
      thumbnail:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjA2MjVfMjI4/MDAxNjU2MTYxNjQzMzMy.3jd1dsG56BsBHeP0AxRBE6g_0hzzeqGzAD7v-dV5nDog.7dIvVL-rNV4V9Cc-w8BfRBuzDp0n9uOHVIVGR1_UG78g.JPEG.gina171/1656161313332.jpg?type=w800",
      title: "10 The best view point for Han-River",
    },
    {
      id: 3,
      thumbnail:
        "https://dimg.donga.com/ugc/CDB/29STREET/Article/62/4f/89/e7/624f89e71852dc4c5c02.jpg",
      title: "The Most Picked Jamsil Spot",
    },
    {
      id: 4,
      thumbnail:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjA2MjVfMjI4/MDAxNjU2MTYxNjQzMzMy.3jd1dsG56BsBHeP0AxRBE6g_0hzzeqGzAD7v-dV5nDog.7dIvVL-rNV4V9Cc-w8BfRBuzDp0n9uOHVIVGR1_UG78g.JPEG.gina171/1656161313332.jpg?type=w800",
      title: "10 The best view point for Han-River",
    },
  ]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    console.log(keyword);
    if (keyword)
      setKuddysPickList(
        kuddysPickList.filter(item => item.title.includes(keyword)),
      );
  }, [keyword]);
  return (
    <div className="kuddyspickmenu-wrapper">
      <KuddysPickSearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      {kuddysPickList && kuddysPickList.length === 0 ? (
        <div className="kuddyspickmenu-empty">텅</div>
      ) : (
        <>
          {kuddysPickList.map(item => (
            <div key={item.id}>
              <KuddysPickBlock {...item} />
            </div>
          ))}
          <div style={{ height: "30px" }} />
        </>
      )}
    </div>
  );
};

export default KuddysPickMenu;
