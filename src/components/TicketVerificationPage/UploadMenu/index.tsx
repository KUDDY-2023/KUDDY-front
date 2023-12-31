import { TicketInfoType } from "@pages/my/TicketVertificationPage";
import { ReactComponent as PhotoIcon } from "@assets/ticket/photo.svg";
import { ReactComponent as ErrorIcon } from "@assets/ticket/error.svg";
import { useState, useRef } from "react";
import { ticketNotUploadedYetAlert } from "@components/_common/SweetAlert";
import InfoModal from "@components/TicketVerificationPage/InfoModal";
import { useGetPresignedUrl, usePostImage } from "@services/hooks/image";
import {
  profileCreateTicketInfo,
  profilePatchTicketImage,
} from "@services/api/profile";

const UploadMenu = ({ ticketStatus }: TicketInfoType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [ticketImageUrl, setTicketImageUrl] = useState<string>("");

  const onGetUrl = useGetPresignedUrl();
  const onPostImage = usePostImage();

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;
    if (inputRef.current.files) {
      const reader = new FileReader();
      reader.readAsDataURL(inputRef.current.files[0]);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
    }

    if (!e.target.files) return;
    let fileName = e.target.files[0].name;
    const presignedUrlList = await onGetUrl([fileName]);
    if (presignedUrlList) {
      try {
        const res = await onPostImage(presignedUrlList[0], e.target.files[0]);
        let newImg = presignedUrlList[0].split("?")[0];
        setTicketImageUrl(newImg);
      } catch (err) {
        alert(err);
      }
    }
  };

  const onSubmit = () => {
    if (
      ticketStatus === "INVALID_PHOTO" ||
      ticketStatus === "PHOTO_UNRECOGNIZABLE"
    )
      profilePatchTicketImage(ticketImageUrl)
        .then(res => {
          window.location.reload();
        })
        .catch(err => console.log(err));
    else if (ticketStatus === "NOT_SUBMITTED")
      profileCreateTicketInfo(ticketImageUrl)
        .then(res => {
          window.location.reload();
        })
        .catch(err => console.log(err));
  };

  return (
    <>
      <div className="middle-wrapper">
        {(ticketStatus === "INVALID_PHOTO" ||
          ticketStatus === "PHOTO_UNRECOGNIZABLE") && (
          <div className="error-text">
            <ErrorIcon />
            <p>
              Ticket authentication is failed. <br />
              Please check the detailed information <br />
              via email we sent you.
            </p>
          </div>
        )}
        <InfoModal />
        {typeof preview === "string" ? (
          <div className="image-rect">
            <img src={preview} />
            <label htmlFor="ticket-image">
              <div className="circle">
                <PhotoIcon />
              </div>
            </label>
            <input
              type="file"
              accept="image/jpg, image/jpeg, image/png;capture=camera"
              onChange={onChange}
              className="image-rect"
              id="ticket-image"
              ref={inputRef}
            ></input>
          </div>
        ) : (
          <form className="image-rect">
            <label htmlFor="ticket-image">
              <PhotoIcon />
            </label>
            <input
              type="file"
              accept="image/jpg, image/jpeg, image/png;capture=camera"
              onChange={onChange}
              className="image-rect"
              id="ticket-image"
              ref={inputRef}
            ></input>
          </form>
        )}
        <div className="des-text">
          Your flight ticket will be reviewed and confirmed.
        </div>
      </div>
      <div
        className="button"
        onClick={ticketImageUrl === "" ? ticketNotUploadedYetAlert : onSubmit}
      >
        Request verification
      </div>
    </>
  );
};

export default UploadMenu;
