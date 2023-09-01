import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dropdown.scss";
import check from "@assets/icon/check.svg";

import { ReactComponent as ArrowDown } from "@assets/icon/arrow_down.svg";

interface Props {
  items: string[];
  type: string;
  placeholder: string;
  id: number;
  state: string;
  onSelect: (idx: number, type: string, item: string) => void;
}

export default function DownDown({
  items,
  type,
  placeholder,
  id,
  state,
  onSelect,
}: Props) {
  const _handleClickToggle = (nation: string) => {
    onSelect(id, type, nation);
  };

  return (
    <Dropdown id="kuddy-custom-dropdown">
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className={state !== placeholder ? "active" : ""}
      >
        {state}
        <ArrowDown />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map(i => {
          if (i === state) {
            return (
              <Dropdown.Item
                id="active-custom-item"
                onClick={e => {
                  _handleClickToggle(i);
                }}
              >
                {i} <img src={check} alt="check" />
              </Dropdown.Item>
            );
          } else {
            return (
              <Dropdown.Item
                id="custom-item"
                onClick={e => {
                  _handleClickToggle(i);
                }}
              >
                {i}
              </Dropdown.Item>
            );
          }
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
