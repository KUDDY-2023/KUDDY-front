import "./mates-drop-down.scss";
import { ReactComponent as ArrowIcon } from "@assets/icon/arrow_down.svg";
import { useEffect, useState } from "react";
import useModal from "@utils/hooks/useModal";
import useInterest from "@utils/hooks/useInterest";

type MatesDropDownProps = {
  items: string[];
  placeholder: string;
  value: string | null;
  setValue: (value: string) => void;
  groupValue?: string | null;
  isFlex?: boolean;
  isAutoOpen?: boolean;
  setIsAutoOpen?: (value: boolean) => void;
};

const MatesDropDown = ({
  items,
  placeholder,
  value,
  setValue,
  groupValue,
  isFlex,
  isAutoOpen,
  setIsAutoOpen,
}: MatesDropDownProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { buttonRef, modalRef } = useModal(isOpened, setIsOpened);
  const { altGroup, altElement } = useInterest();

  useEffect(() => {
    setIsOpened(isAutoOpen === true ? true : false);
  }, [!!isAutoOpen]);

  const onClickItem = (item: string) => {
    setValue(item);
    setIsOpened(false);
    if (setIsAutoOpen) setIsAutoOpen(false);
  };

  return (
    <div
      className={
        isFlex ? "mates-drop-down-wrapper flex" : "mates-drop-down-wrapper"
      }
    >
      <div
        className="mates-drop-down-rect"
        style={{
          backgroundColor:
            value === placeholder
              ? "var(--color-light-grey)"
              : "var(--color-main-yellow)",
        }}
        ref={buttonRef}
        onClick={() =>
          groupValue === "Group" && placeholder === "Element"
            ? setIsOpened(isOpened)
            : setIsOpened(!isOpened)
        }
      >
        <p>
          {value &&
            (placeholder === "Group"
              ? altGroup(value)
              : placeholder === "Element"
              ? altElement(value.toUpperCase())
              : value.replace(/^[a-z]/, char => char.toUpperCase()))}
        </p>
        <ArrowIcon
          style={{ transform: isOpened ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>
      {isOpened && (
        <div className="mates-drop-down-container" ref={modalRef}>
          {items.map((item: any, idx: number) => (
            <div
              className="drop-down-item"
              onClick={() => onClickItem(item)}
              key={item}
              style={{
                marginBottom: idx === items.length - 1 ? "5px" : "10px",
              }}
            >
              {placeholder === "Group"
                ? altGroup(item)
                : placeholder === "Element"
                ? altElement(item)
                : item.replace(/^[a-z]/, (char: string) => char.toUpperCase())}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatesDropDown;
