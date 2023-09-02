import "@pages/travel/TravelSearchPage/travel-search-page.scss";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as BackIcon } from "@assets/icon/back.svg";
import { ReactComponent as SearchIcon } from "@assets/icon/search.svg";
import MatesDropDown from "@components/MatesPage/MatesDropDown";
import { districtArray } from "@pages/travel/TravelPage/_mock";
import { languageArray, interestArray } from "@pages/mates/MatesPage/_mock";

const MatesSearchPage = () => {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchInput, setSearchInput] = useState<string | null>(
    searchParams.get("keyword"),
  );
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleKeyword = (input: string) => {
    searchParams.set("keyword", input);
    setSearchParams(searchParams);
  };

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    searchParams.get("language") === null
      ? "Language"
      : searchParams.get("language"),
  );

  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(
    searchParams.get("district") === null
      ? "District"
      : searchParams.get("district"),
  );

  const [selectedGroup, setSelectedGroup] = useState<string | null>(
    searchParams.get("interest") === null
      ? "Group"
      : interestArray
          .map(item =>
            item.element === searchParams.get("interest")
              ? item.group.replace(/^[a-z]/, char => char.toUpperCase())
              : null,
          )
          .filter(item => item !== null)[0],
  );

  const [selectedElement, setSelectedElement] = useState<string | null>(
    searchParams.get("interest") === null
      ? "Element"
      : searchParams.get("interest"),
  );

  const [isAutoOpen, setIsAutoOpen] = useState<boolean>(false);
  useEffect(() => {
    setIsAutoOpen(false);
  }, []);
  useEffect(() => {
    setIsAutoOpen(
      selectedGroup !== "Group" &&
        selectedGroup !==
          interestArray
            .map(item =>
              item.element === searchParams.get("interest")
                ? item.group.replace(/^[a-z]/, char => char.toUpperCase())
                : null,
            )
            .filter(item => item !== null)[0],
    );
  }, [selectedGroup]);

  const handleItem = (type: string, item: string) => {
    searchParams.set(type, item);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (selectedLanguage !== "Language")
      handleItem(
        "language",
        selectedLanguage!.replace(/^[A-Z]/, char => char.toLowerCase()),
      );
    if (selectedDistrict !== "District")
      handleItem(
        "district",
        selectedDistrict!.replace(/^[A-Z]/, char => char.toLowerCase()),
      );
    if (selectedElement !== "Element")
      handleItem(
        "interest",
        selectedElement!.replace(/^[A-Z]/, char => char.toLowerCase()),
      );
  }, [selectedLanguage, selectedDistrict, selectedElement]);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput) handleKeyword(searchInput);
    nav(`/mates/list${window.location.search}`);
  };

  return (
    <div className="travelsearch-wrapper">
      <div className="kuddyspicksearchbar-wrapper">
        <BackIcon onClick={() => nav(`/mates/list${window.location.search}`)} />
        <div className="kuddyspicksearchbar-rect">
          <form onSubmit={handleSubmit}>
            <input
              value={searchInput !== null ? searchInput : undefined}
              onChange={handleInput}
              placeholder={`You can search by name`}
            />
            <button type="submit">
              <SearchIcon stroke="var(--color-black)" />
            </button>
          </form>
        </div>
      </div>
      <div className="filter-title">Gender</div>
      <div className="filter-container">
        {["mr", "ms", "neutral"].map(item => (
          <div
            className="travelsearch-filter-rect"
            key={item}
            onClick={() => handleItem("gender", item)}
            style={{
              backgroundColor:
                searchParams.get("gender") !== null &&
                item !== null &&
                searchParams.get("gender")!.includes(item)
                  ? "var(--color-main-yellow)"
                  : "var(--color-light-grey)",
            }}
          >
            {item === null
              ? null
              : item.replace(/^[a-z]/, char => char.toUpperCase())}
          </div>
        ))}
      </div>
      <div className="filter-title">Language</div>
      <div className="filter-container">
        <MatesDropDown
          items={languageArray}
          placeholder="Language"
          value={selectedLanguage}
          setValue={setSelectedLanguage}
        />
      </div>
      <div className="filter-title">District</div>
      <div className="filter-container">
        <MatesDropDown
          items={districtArray
            .filter(item => item.id !== 0)
            .map(row => row.params)}
          placeholder="District"
          value={selectedDistrict}
          setValue={setSelectedDistrict}
        />
      </div>
      <div className="filter-title">Interest</div>
      <div className="filter-container">
        <MatesDropDown
          items={interestArray
            .map(row => row.group)
            .filter(
              (item, idx) =>
                interestArray.map(row => row.group).indexOf(item) === idx,
            )}
          placeholder="Group"
          value={selectedGroup}
          setValue={setSelectedGroup}
        />
        <MatesDropDown
          items={interestArray
            .filter(
              item =>
                item.group.replace(/^[a-z]/, char => char.toUpperCase()) ===
                selectedGroup,
            )
            .map(row => row.element)}
          placeholder="Element"
          value={selectedElement}
          setValue={setSelectedElement}
          isFlex={true}
          isAutoOpen={isAutoOpen}
          setIsAutoOpen={setIsAutoOpen}
        />
      </div>
    </div>
  );
};

export default MatesSearchPage;
