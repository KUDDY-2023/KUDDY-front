import "./info-modal.scss";
import { useState } from "react";
import { ReactComponent as HelpIcon } from "@assets/ticket/help.svg";
import Modal from "@components/_common/Modal";

const textArray: string[] = [
  "Please submit a picture of your airline flight ticket to Korea. (If you are using a transportation other than an airplane, it can be submitted as well.)",
  "Ticket photos will be used to authenticate your valid status as a visitor to Korea.",
  "Required information to be included are 'Date' and 'Destination'.",
  "It's okay to remove or erase your sensitive personal details from the image.",
];

const InfoModal = () => {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <div className="more-text" onClick={() => setModal(true)}>
        <HelpIcon />
        <p>what is ticket verification</p>
      </div>
      {modal && (
        <Modal isOpen={modal} closer={() => setModal(false)} isXbtn={true}>
          <div className="info-modal-rect">
            <div className="title">what is ticket verification</div>
            <ul>
              {textArray.map(el => (
                <li className="text">{el}</li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
    </>
  );
};

export default InfoModal;
