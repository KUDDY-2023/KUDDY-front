import { TicketInfoType } from "@pages/my/TicketVertificationPage";
import { ReactComponent as HelpIcon } from "@assets/ticket/help.svg";
import { ReactComponent as PhotoIcon } from "@assets/ticket/photo.svg";
import { ReactComponent as ErrorIcon } from "@assets/ticket/error.svg";
import { useState, useRef } from "react";

const UploadMenu = ({ ticketStatus }: TicketInfoType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ticketFormData, setTicketFormData] = useState<FormData>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;
    if (inputRef.current.files) {
      const reader = new FileReader();
      reader.readAsDataURL(inputRef.current.files[0]);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
    }

    const formData = new FormData();
    if (!e.target.files) return;
    if (e.target.files[0]) {
      formData.append("file", e.target.files[0]);
      setTicketFormData(formData);
    }
  };

  const onSubmit = () => {};

  return (
    <>
      <div className="middle-wrapper">
        {ticketStatus === "CERTIFICATION_FAILED" && (
          <div className="error-text">
            <ErrorIcon />
            <p>
              Ticket authentication failed. <br />
              You can check the detailed reason through <br />
              the email we sent.
            </p>
          </div>
        )}
        <div className="more-text">
          <HelpIcon />
          <p>more about ticket verification</p>
        </div>
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
          The manager will check the uploaded flight ticket and approve it.
        </div>
      </div>
      <div className="button" onClick={onSubmit}>
        Request certification
      </div>
    </>
  );
};

export default UploadMenu;
