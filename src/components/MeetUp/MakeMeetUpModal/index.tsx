import "./make-meet-up-modal.scss";
import { useState, useEffect } from "react";
import EventBtn from "@components/_common/EventBtn";
import PlaceForm from "../PlaceForm";
import TimeForm from "../TimeForm";
import PayForm from "../PayForm";
import BottomUpModal from "@components/_common/BottomUpModal";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
}
export default function MakeMeetUpModal({ isModalOpen, onClose }: Props) {
  return (
    <BottomUpModal
      isModalOpen={isModalOpen}
      onClose={onClose}
      navbarHeight={47}
    >
      <div id="meet-up-container">
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
    </BottomUpModal>
  );
}
