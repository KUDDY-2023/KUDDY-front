import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";
import { PayPalButtonsComponentProps } from "@paypal/react-paypal-js";

// 캘린더
import { useAddCalendar } from "@services/hooks/calendar";

// 일정 추가 확인 alert
import { confirmAddAlert, completeAlert } from "@components/_common/SweetAlert";

// 모달
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID || "test";

const paypalScriptOptions: PayPalScriptOptions = {
  clientId: clientId,
  currency: "USD",
  intent: "capture",
  locale: "en_US",
};

type Props = {
  open: boolean;
  handleClose: () => void;
  onUpdateMessage: (type: string) => void;
  info: IGetMessage;
};
export default function PayPal({
  open,
  handleClose,
  onUpdateMessage,
  info,
}: Props) {
  // 캘린더 추가 훅
  const onAddCalendar = useAddCalendar();

  // 모달 스타일
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function PayPalButton() {
    // 버튼 컴포넌트
    /**
     * usePayPalScriptReducer use within PayPalScriptProvider
     * isPending: not finished loading(default state)
     * isResolved: successfully loaded
     * isRejected: failed to load
     */
    const [{ isPending }] = usePayPalScriptReducer();

    const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
      style: { layout: "vertical" },
      createOrder(data: any, actions: any) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                // value: "0.123",
                currency_code: "USD",
                value: info.price, // 달러 기준으로 가격 변경하면 됨
              },
            },
          ],
        });
      },
      onApprove(data: any, actions: any) {
        /**
         * data: {
         *   orderID: string;
         *   payerID: string;
         *   paymentID: string | null;
         *   billingToken: string | null;
         *   facilitatorAccesstoken: string;
         * }
         */
        return actions.order.capture({}).then((details: any) => {
          onUpdateMessage("PAYED"); // 동행 메세지 상태 업데이트
          handleClose(); // 모달 닫기
          confirmAddAlert().then(result => {
            if (result.isConfirmed) {
              onAddCalendar(info.id).then(res => {
                completeAlert();
              }); // 캘린더에 일정 추가
            }
          });
        });
      },
    };
    return (
      <>
        {isPending ? <h2>Load Smart Payment Button...</h2> : null}
        <PayPalButtons {...paypalbuttonTransactionProps} />
      </>
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Please choose a payment method
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <PayPalScriptProvider options={paypalScriptOptions}>
            <PayPalButton />
          </PayPalScriptProvider>
        </Typography>
      </Box>
    </Modal>
  );
}
