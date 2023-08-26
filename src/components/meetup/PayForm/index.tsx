import "./pay-form.scss";
import { useState } from "react";
import { ReactComponent as CheckedBox } from "@assets/icon/check_on.svg";
import { ReactComponent as UnCheckedBox } from "@assets/icon/check_on.svg";

import { ReactComponent as ArrowDown } from "@assets/icon/arrow_down.svg";

export default function PayForm() {
  const [cost, setCost] = useState<number>(0);

  // 금액 입력 - 앞 자리 0은 삭제해야함
  const _handleSetCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCost(parseInt(e.target.value));
  };

  return (
    <div className="pay-form-style">
      <div className="form-input-container">
        <p>Pay</p>

        <div className="cost-form">
          $
          <input type="number" value={cost} onChange={e => _handleSetCost(e)} />
        </div>
      </div>

      {!!cost && (
        <div className="receipt-container">
          <div>
            <h2>Deposit</h2>
            <p>10$</p>
          </div>
          <p className="description">
            This is the fee used to prevent no-show. If the traveler
            unilaterally cancels the appointment, he cannot get this fee back
            and it will be paid to you.
          </p>
          <div>
            <h2>KUDDY Service fee</h2>
            <p>3$</p>
          </div>
          <p className="description">
            This helps us run our platform and services.
          </p>
          <div>
            <h2>Total</h2>
            <p id="total">28$</p>
          </div>
        </div>
      )}

      {!!cost && (
        <div className="policy-container">
          <CheckedBox id="checkbox" />
          <p>agree with the refund policy</p>
          <ArrowDown id="arrow" />
        </div>
      )}
    </div>
  );
}
