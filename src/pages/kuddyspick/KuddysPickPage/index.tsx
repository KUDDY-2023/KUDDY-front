import "./kuddys-pick-page.scss";
import KuddysPickSearchBar from "@components/KuddysPickPage/KuddysPickSearchBar";
import KuddysPickBlock from "@components/KuddysPickPage/KuddysPickBlock";
import { useState, useEffect } from "react";
import useInput from "@utils/hooks/useInput";
import {
  kuddyspickGetAllList,
  kuddyspickGetByTitle,
} from "@services/api/kuddyspick";
import { useRecoilState } from "recoil";
import { titleKeyword } from "@services/store/kuddyspick";
import { useQuery } from "react-query";

// 검색어 저장 recoil 추가 필요
const KuddysPickPage = () => {
  const [kuddysPickList, setKuddysPickList] = useState<KuddysPickType[]>([]);
  const { value, onChange, reset, setValue } = useInput("");
  const [searchedWord, setSearchedWord] = useRecoilState(titleKeyword);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: res, isLoading } = useQuery(
    ["getAllKuddysPick"],
    kuddyspickGetAllList,
    { enabled: searchedWord === "" },
  );
  useEffect(() => {
    if (res) setKuddysPickList(res!.data.data.thumbnailList);
  }, [res]);

  const { data } = useQuery(
    ["getKuddysPickByTitle", searchedWord],
    () => kuddyspickGetByTitle(searchedWord).then().catch(),
    { enabled: !!searchedWord },
  );
  useEffect(() => {
    if (data) setKuddysPickList(data!.data.data.thumbnailList);
  }, [data]);

  return (
    <div className="kuddyspickmenu-wrapper">
      <KuddysPickSearchBar
        searchInput={value}
        setSearchInput={setValue}
        onChange={onChange}
      />
      {kuddysPickList && !isLoading && kuddysPickList.length === 0 ? (
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
      )}
    </div>
  );
};

export default KuddysPickPage;
