import "./kuddys-pick-page.scss";
import KuddysPickSearchBar from "@components/KuddysPickPage/KuddysPickSearchBar";
import KuddysPickBlock from "@components/KuddysPickPage/KuddysPickBlock";
import { useState, useEffect } from "react";
import useInput from "@utils/hooks/useInput";

// 검색어 저장 recoil 추가 필요
const KuddysPickPage = () => {
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
  const { value, onChange, reset, setValue } = useInput("");
  const [searchedWord, setSearchedWord] = useState<string>("");

  useEffect(() => {
    if (searchedWord)
      setKuddysPickList(
        kuddysPickList.filter(item => item.title.includes(searchedWord)),
      );
  }, [searchedWord]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="kuddyspickmenu-wrapper">
      <KuddysPickSearchBar
        searchInput={value}
        setSearchInput={setValue}
        onChange={onChange}
        searchedWord={searchedWord}
        setSearchedWord={setSearchedWord}
      />
      {kuddysPickList &&
        (kuddysPickList.length === 0 ? (
          <div className="empty">
            <div className="no-result">No result</div>
            <p>Try searching differently</p>
          </div>
        ) : (
          <>
            {kuddysPickList.map(item => (
              <KuddysPickBlock {...item} key={item.id} />
            ))}
            <div style={{ height: "30px" }} />
          </>
        ))}
    </div>
  );
};

export default KuddysPickPage;
