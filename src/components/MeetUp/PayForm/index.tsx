import "./pay-form.scss";
import { useState, useEffect } from "react";
import { ReactComponent as CheckedBox } from "@assets/icon/check_on.svg";
import { ReactComponent as UnCheckedBox } from "@assets/icon/check_on.svg";
import { ReactComponent as ArrowDown } from "@assets/icon/arrow_down.svg";

import { useMakeMeetUpInfo } from "@services/hooks/chat";

export default function PayForm() {
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
            This is the fee used to prevent no-show. If the traveler
            unilaterally cancels the appointment he cannot get this fee back and
            it will be paid to you.
          </p>
          <div>
            <p className="receipt-title">KUDDY Service fee</p>
            <p>{Math.floor(Number(cost) * 0.15)}$</p>
          </div>
          <p className="description">
            This helps us run our platform and services.
          </p>
          <div>
            <p className="receipt-title">Total</p>
            <p id="total">{Number(cost) + Math.floor(Number(cost) * 0.15)}$</p>
          </div>
        </div>
      )}

      {cost !== "0" && (
        <div className="policy-container">
          <CheckedBox id="checkbox" />
          <p>agree with the refund policy</p>
          <ArrowDown id="arrow" />
        </div>
      )}
    </div>
  );
}
