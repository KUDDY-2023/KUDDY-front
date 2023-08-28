import "./bottomup-modal-layout.scss";
import { useState, useEffect } from "react";
import EventBtn from "@components/_common/EventBtn";
import PlaceForm from "../PlaceForm";
import TimeForm from "../TimeForm";
import PayForm from "../PayForm";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export default function BottomUpModalLayout({ isOpen, onClose }: Props) {
  return (
    <div className={`kuddy-container ${isOpen && "kuddy-modal-open"}`}>
      <div className="kuddy-modal">
        <div id="bar" onClick={onClose}></div>

        <h2>Set meet up</h2>

        <div className="form-container">
          <PlaceForm />
          <TimeForm />
          <PayForm />
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