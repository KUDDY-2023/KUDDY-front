import Sheet from "react-modal-sheet";
import { useState } from "react";
import "./bottom-up-modal.scss";

import { ReactNode } from "react";

interface Props {
  isModalOpen: boolean;
  children: ReactNode;
}
export default function BottomUpModal({ isModalOpen, children }: Props) {
  const [isOpen, setOpen] = useState(isModalOpen);

  let h = (window.innerHeight - 47) / window.innerHeight;

  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[h]}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}
