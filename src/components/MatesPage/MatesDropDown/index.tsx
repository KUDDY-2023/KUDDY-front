import "./mates-drop-down.scss";
import { ReactComponent as ArrowIcon } from "@assets/icon/arrow_down.svg";
import { useEffect, useState } from "react";
import useModal from "@utils/hooks/useModal";

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

  useEffect(() => {
    setIsOpened(isAutoOpen === true ? true : false);
  }, [!!isAutoOpen]);

  const onClickItem = (item: string) => {
    setValue(item.replace(/^[a-z]/, char => char.toUpperCase()));
    setIsOpened(false);
    if (setIsAutoOpen) setIsAutoOpen(false);
  };

  return (
    <>
      <div
        className="mates-drop-down-rect"
        style={{
          backgroundColor:
            value === placeholder
              ? "var(--color-light-grey)"
              : "var(--color-main-yellow)",
          marginLeft: isFlex === true ? "10px" : 0,
        }}
        ref={buttonRef}
        onClick={() =>
          groupValue === "Group" && placeholder === "Element"
            ? setIsOpened(isOpened)
            : setIsOpened(!isOpened)
        }
      >
        <p>{value && value.replace(/^[a-z]/, char => char.toUpperCase())}</p>
        <ArrowIcon
          style={{ transform: isOpened ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>
      {isOpened && (
        <div
          className="mates-drop-down-container"
          ref={modalRef}
          style={{ marginLeft: isFlex === true ? "135px" : 0 }}
        >
          {items.map(item => (
            <div
              className="drop-down-item"
              onClick={() => onClickItem(item)}
              key={item}
            >
              {item.replace(/^[a-z]/, char => char.toUpperCase())}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MatesDropDown;
