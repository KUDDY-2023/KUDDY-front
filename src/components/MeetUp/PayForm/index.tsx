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

  const [detailModal, setDetailModal] = useState(false);

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
            <p className="cost">{cost}$</p>
          </div>

          <div>
            <p className="receipt-title">KUDDY Service fee</p>
            <p className="cost">{Math.floor(Number(cost) * 0.15)}$</p>
          </div>

          <hr />
          <div>
            <p className="receipt-title">Total Fee</p>
            <p id="total">{Number(cost) + Math.floor(Number(cost) * 0.15)}$</p>
          </div>

          <p className="fee-detail" onClick={() => setDetailModal(true)}>
            Fee detail
          </p>
        </div>
      )}
      <Modal open={detailModal} onClose={() => setDetailModal(false)}>
        <Box sx={style}>
          <div>Fee detail</div>
        </Box>
      </Modal>
    </div>
  );
}
