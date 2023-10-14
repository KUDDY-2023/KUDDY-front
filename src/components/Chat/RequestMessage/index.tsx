import "./request-message.scss";
import { ReactComponent as RightIcon } from "@assets/icon/arrow_right.svg";
import { ReactComponent as Paypal } from "@assets/pay/paypal.svg";
import { ReactComponent as YellowMeetUp } from "@assets/chat/yellow_meetup.svg";
import { ReactComponent as Cancle } from "@assets/chat/bt_delete.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 채팅
import { MutableRefObject } from "react";
import { CompatClient } from "@stomp/stompjs";
import { useFormatDate } from "@utils/hooks/useformatDate";

// 페이팔 모달
import PayPal from "@components/Paypal";

// 모달
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// import Modal from "@components/_common/Modal";

interface Props {
  client: MutableRefObject<CompatClient | undefined>;
  info: IGetMessage;
  myEmail: string;
  statusType: "KUDDY_NOT_ACCEPT" | "TRAVELER_NOT_ACCEPT";
}

export default function RequestMessage({
  client,
  info,
  myEmail,
  statusType,
}: Props) {
  const navigate = useNavigate();

  const onPlaceDetail = (placeId: number) => {
    navigate(`/travel/${placeId}`);
  };

  const calculateDaysAgo = (sendTime: number) => {
    const today = new Date();
    const sendDate = new Date(sendTime);

    const timeDifference = today.getTime() - sendDate.getTime();
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysAgo;
  };

  const onPayPal = () => {
    // 날짜 확인하기 + 시간 지났으면 모달 띄우기
    let sendTime = info.sendTime;
    if (calculateDaysAgo(sendTime) >= 3) {
      handleOpenAlert();
    } else {
      handleOpen(); // 페이팔 모달 열기
    }
  };

  const onRefuse = () => {
    onUpdateMessage("TRAVELER_CANCEL");
  };

  const onCancel = () => {
    onUpdateMessage("KUDDY_CANCEL");
  };

  const token = localStorage.getItem("accessToken");

  let formatedAppointmentTime = useFormatDate(info.appointmentTime || "");
  let spotName = info.spotName || "";
  spotName = spotName.length > 22 ? spotName.slice(0, 22) + "..." : spotName;

  const onUpdateMessage = async (newStatus: string) => {
    if (client.current) {
      let updateMsg = {
        ...info,
        meetStatus: newStatus,
        isUpdated: 1,
        senderEmail: myEmail,
      };

      try {
        // ✅ 메세지 상태 업데이트하기
        client.current.send(
          "/app/updateMessage",
          { Authorization: `Bearer ${token}` },
          JSON.stringify(updateMsg),
        );
      } catch (e) {
        alert(e);
      } finally {
        // setIsMapOpen(false);
      }
    }
  };

  // 페이팔 모달 상태
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Alert 모달 상태
  const [openAlert, setOpenAlert] = useState(false);
  const handleOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => setOpenAlert(false);

  // 3일 지난 요청인 경우
  const AlertModal = () => {
    // 모달 스타일
    const style = {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      maxWidth: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };

    return (
      <Modal
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            The request was created more than 3 days ago, so you cannot proceed
            with the payment.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    );
  };

  return (
    <div className="confirmed-request-message-section">
      <AlertModal />

      <PayPal
        open={open}
        handleClose={handleClose}
        onUpdateMessage={onUpdateMessage}
        info={info}
      />

      <div className="confirmed-request-message">
        <YellowMeetUp id="meetup-icon" />

        <div className="request-partner-section">
          <p>Meet up with {info.senderName}!</p>
        </div>
        <div className="request-info-section">
          <div className="info-grid">
            <div className="grid-left">
              <p>Place</p>
              <p>Date</p>
              <p>Pay</p>
            </div>
            <div className="grid-right">
              <div onClick={() => onPlaceDetail(info.spotContentId || 0)}>
                <p id="korean">{spotName}</p>
                <RightIcon id="right-icon" />
              </div>
              <div>
                <p>{formatedAppointmentTime}</p>
              </div>
              <div>
                <p>{info.price}$</p>
                <Paypal />
              </div>
            </div>
          </div>
        </div>

        {/* 커디 유저가 기다리고 있음 */}
        {statusType === "KUDDY_NOT_ACCEPT" && (
          <div className={`not-confirmed-btn-container`}>
            <div>Waiting for a response</div>
          </div>
        )}

        {/* 여행자 유저가 기다림 */}
        {statusType === "TRAVELER_NOT_ACCEPT" && (
          <div className={`request-btn-container`}>
            <div id="refuse-btn" onClick={onRefuse}>
              Refuse
            </div>
            <div id="accept-btn" onClick={onPayPal}>
              Accept and Pay
            </div>
          </div>
        )}
      </div>

      {statusType === "KUDDY_NOT_ACCEPT" && (
        <div className="cancel-transfer" onClick={onCancel}>
          <Cancle />
          Cancel Transaction
        </div>
      )}
    </div>
  );
}
