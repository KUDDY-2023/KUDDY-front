import "./bottomup-modal-layout.scss";
import { useState, useEffect } from "react";
import EventBtn from "@components/_common/eventBtn";
import PlaceForm from "../PlaceForm";
interface Props {
  isOpen: boolean;
}
export default function BottomUpModalLayout({ isOpen }: Props) {
  return (
    <div className={`kuddy-container ${isOpen && "kuddy-modal-open"}`}>
      <div className="kuddy-modal">
        <div>바</div>

        <h2>Set meet up</h2>

        <div className="form-container">
          <PlaceForm />
          <PlaceForm />
          <PlaceForm />
        </div>

        <EventBtn
          btnName="Send invitaion"
          isActive={true}
          onClick={() => console.log("?")}
        />
      </div>
    </div>
  );
}
