"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import ReactDOM from "react-dom";
import { Button } from "@/components/common/Button";
import NavigationBar from "@/components/core/NavigationBar";
import Link from "next/link";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "400px",
    padding: "20px",
  },
};
// Modal.setAppElement("#root");
export default function Images() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="min-h-[25rem] w-full flex flex-col items-center gap-1 p-12 bg-white">

      
      <div className="mb-8 text-center">
        <label className="text-3xl font-bold text-gray-700 w-36 text-center">
          Images
        </label>
      </div>

      <br />

      <div className="text-center flex flex-row space-x-18">
      
        <button
          onClick={handleClickForBackButton}
          className="text-green-400 mr-4"
        >
          Back
        </button>

        <button
          onClick={handleClickForNextButton}
          className="text-green-400 ml-4"
        >
          Next
        </button>
      </div>
      <div>
        <button 
        onClick={openModal}
        className="text-green-400 mr-4">Image_Sample</button>
        {modalIsOpen && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            portalClassName="custom-modal-portal"
          >
            <h2>Export Images</h2>
            <p>Email address</p>
            <p>SMS message</p>
            <p>Facebook</p>
            <p>Instagram</p>
            <button onClick={closeModal}
            className="text-green-400 mr-4">Close</button>
          </Modal>
        )}
    </div>
      <div>
        <footer>
          <NavigationBar></NavigationBar>
        </footer>
      </div>
    </div>


  );

  function handleClickForBackButton() {
    window.location.href = "/search";
  }

  function handleClickForNextButton() {
    window.location.href = "/profile";
  }
}
