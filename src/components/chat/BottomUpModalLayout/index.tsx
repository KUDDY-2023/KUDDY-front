import "./bottomup-modal-layout.scss";
import { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
}
export default function BottomUpModalLayout({ isOpen }: Props) {
  // const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`kuddy-container ${isOpen && "kuddy-modal-open"}`}>
      <div className="kuddy-modal"></div>
    </div>
  );
}
