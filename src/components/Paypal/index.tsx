import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";
import { PayPalButtonsComponentProps } from "@paypal/react-paypal-js";

const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID || "test";

const paypalScriptOptions: PayPalScriptOptions = {
  clientId: clientId,
  currency: "USD",
  intent: "capture",
  locale: "en_US",
};

function Button() {
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
              value: 123, // 달러 기준으로 가격 변경하면 됨
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
        alert(
          "Transaction completed by" +
            (details?.payer.name.given_name ?? "No details"),
        );

        alert("Data details: " + JSON.stringify(data, null, 2));
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
export default function PayPal() {
  return (
    <div className="App">
      <h1>Hello PayPal</h1>
      <PayPalScriptProvider options={paypalScriptOptions}>
        <Button />
      </PayPalScriptProvider>
    </div>
  );
}
