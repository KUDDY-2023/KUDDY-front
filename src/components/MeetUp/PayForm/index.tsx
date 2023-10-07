import "./pay-form.scss";
import { useState, useEffect } from "react";
import { ReactComponent as CheckedBox } from "@assets/icon/check_on.svg";
import { ReactComponent as UnCheckedBox } from "@assets/icon/check_off.svg";
import { ReactComponent as Help } from "@assets/chat/bt_help.svg";

import { useMakeMeetUpInfo } from "@services/hooks/chat";

// 모달
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";

type Props = {
  check: boolean;
  isCheck: (check: boolean) => void;
};
export default function PayForm({ check, isCheck }: Props) {
  const onMakeMeetUpInfo = useMakeMeetUpInfo(); // meetup 전역 업데이트 훅

  const [cost, setCost] = useState<string>("0");

  // 금액 입력 - 앞 자리 0은 삭제해야함
  const _handleSetCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.target.value;

    // 입력 값이 숫자인지 확인
    if (!isNaN(Number(input))) {
      let number = input.toString();

      // 앞 자리 0 삭제
      if (number[0] === "0") {
        number = number.slice(1);
      }

      setCost(number);
    } else {
      //setCost(input.slice(0, -1));
    }
  };

  useEffect(() => {
    onMakeMeetUpInfo({ price: cost });
  }, [cost]);

  const [isOpen, setIsOpen] = useState(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    overflow: "scroll",
    height: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="pay-form-style">
      <div className="form-input-container">
        <div className="title">Pay</div>

        <div className="cost-form">
          $
          <input type="text" value={cost} onChange={e => _handleSetCost(e)} />
        </div>
      </div>

      {cost !== "0" && (
        <div className="receipt-container">
          <div>
            <p className="receipt-title">Deposit</p>
            <p>{cost}$</p>
          </div>
          <p className="description">
            This deposit is charged to prevent traveler's no-shows. If the
            traveler unilaterally cancels the appointment, this deposit will not
            be refunded and will be yours.
          </p>
          <div>
            <p className="receipt-title">KUDDY Service fee</p>
            <p>{Math.floor(Number(cost) * 0.15)}$</p>
          </div>
          <p className="description">
            This helps us run our platform and services.
          </p>
          <div>
            <p className="receipt-title">Total Fee</p>
            <p id="total">{Number(cost) + Math.floor(Number(cost) * 0.15)}$</p>
          </div>
        </div>
      )}

      {cost !== "0" && (
        <div className="policy-container">
          {check ? (
            <CheckedBox id="checkbox" />
          ) : (
            <UnCheckedBox id="checkbox" />
          )}

          <p onClick={() => isCheck(!check)}>agree with the refund policy</p>
          <div id="help" onClick={() => setIsOpen(true)}>
            <Help />
          </div>
        </div>
      )}

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="policy-detail-page">
            <h3>1. Refund of Guide Fee when Traveler Cancels an Appointment</h3>
            <h5>Kuddy fees are non-refundable.</h5>
            <ol>
              <li>
                - If canceled up to 7 days before the appointment, the guide fee
                will be 100% refunded.
              </li>
              <li>
                - If canceled up to 4 days before the appointment, the guide fee
                will be 80% refunded.
              </li>
              <li>
                - If canceled up to 1 day before the appointment, the guide fee
                will be 50% refunded.
              </li>
              <li>
                - No refund of the guide fee is available for same-day
                cancellations.
              </li>
            </ol>
            <h3>
              2. Unilateral Cancellation by the Guide User before the
              Appointment
            </h3>
            If the guide (K-buddy) user cancels companionship before the
            appointment, the guide fee, including Kuddy fees, will be
            automatically refunded in full to the traveler user.
            <h3>3. Inability to Fulfill the Appointment due to Other Issues</h3>
            You must inquire through the official Kuddy consultation channel
            before the scheduled appointment time. We will review the submitted
            evidence to determine refund eligibility. In cases where the meeting
            is deemed impossible, the guide fee, including Kuddy fees, will be
            refunded in full, and the record of the companionship request will
            be deleted. 'Other issues' refer to the following cases:
            <ol>
              <li>- Death</li>
              <li>- Serious illness</li>
              <li>- Infectious disease</li>
              <li>- Natural disasters, etc.</li>
            </ol>
            <h3>4. Caution</h3> A guide user who unilaterally cancels an
            appointment may be subject to penalties, potentially resulting in a
            downgrade of their Kuddy user level.
          </div>
        </Box>
      </Modal>
    </div>
  );
}
