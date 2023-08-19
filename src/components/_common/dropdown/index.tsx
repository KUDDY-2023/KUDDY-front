import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dropdown.scss";
import check from "@assets/icon/check.svg";

interface Props {
  items: string[];
  placeholder: string;
}

export default function DownDown({ items, placeholder }: Props) {
  const [item, setItems] = useState(items);
  const [selected, setSelected] = useState(placeholder);

  const _handleClickToggle = (nation: string) => {
    setSelected(nation);
  };

  return (
    <Dropdown id="kuddy-custom-dropdown">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {selected}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {item.map(i => {
          if (i === selected) {
            return (
              <Dropdown.Item
                id="custom-item"
                href="#/action-1"
                onClick={() => _handleClickToggle(i)}
              >
                {i} <img src={check} alt="check" />
              </Dropdown.Item>
            );
          } else {
            return (
              <Dropdown.Item
                id="custom-item"
                href="#/action-1"
                onClick={() => _handleClickToggle(i)}
              >
                {i}
              </Dropdown.Item>
            );
          }
        })}

        {/* <Dropdown.Item href="#/action-2">US</Dropdown.Item>
        <Dropdown.Item href="#/action-3">~~</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  );
}
