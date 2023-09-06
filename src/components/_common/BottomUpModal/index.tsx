import Sheet from "react-modal-sheet";
import "./bottom-up-modal.scss";

import { ReactNode } from "react";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  navbarHeight: number;
  children: ReactNode;
  isWhiteBackground: boolean;
}
export default function BottomUpModal({
  isModalOpen,
  onClose,
  navbarHeight,
  children,
  isWhiteBackground,
}: Props) {
  let h = (window.innerHeight - navbarHeight) / window.innerHeight;

  return (
    <Sheet isOpen={isModalOpen} onClose={onClose} snapPoints={[h]}>
      <Sheet.Container
        style={{ backgroundColor: isWhiteBackground ? "#fff" : "#f8f8f8" }}
      >
        <Sheet.Header />
        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}
