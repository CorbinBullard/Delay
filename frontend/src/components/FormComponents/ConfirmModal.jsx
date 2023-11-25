import React from "react";
import { useModal } from "../../context/Modal";

export default function ConfirmModal({ confirm, action }) {
  const { closeModal } = useModal();
  const cancel = () => {
    closeModal();
  };
  return (
    <div id="confirm-delete-container">
      <h2>Confirm {action}?</h2>
      <div id="confirm-delete-buttons">
        <button id="confirm-delete-delete" onClick={confirm}>
          Delete
        </button>
        <button id="confirm-delete-cancel" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
