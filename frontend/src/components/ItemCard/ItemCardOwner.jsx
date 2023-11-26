import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmModal from "../FormComponents/ConfirmModal";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";

export default function ItemCardOwner({ item, handleDelete }) {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/items/${item.id}`);
  };
  const { closeModal } = useModal();

  return (
    <div className="flex gap-4 border p-4 rounded-xl w-fit">
      <img
        className="w-40 h-40 object-cover rounded-lg"
        src={item.previewImage}
      />
      <div className="flex w-full justify-between">
        <div className="flex-wrap w-40 flex-col">
          <p
            className="font-semibold underline hover:text-sky-500 cursor-pointer"
            onClick={handleClick}
          >
            {item.name}
          </p>
          <p className="italic place-self-end">
            Condition:{" "}
            {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex align-middle gap-2">
            <i className="fas fa-truck" />
            <p className="italic">
              {item.sold ? "SOLD" : item.createdAt.slice(0, 10)}
            </p>
          </div>
          <p className="ml">
            <strong>Total: </strong>${item.price}
          </p>
          <div className="flex flex-col justify-between">
            <FaEdit
              className="text-lg hover:text-sky-500 hover:cursor-pointer"
              onClick={() => history.push(`/items/${item.id}/edit`)}
            />
            <OpenModalButton
              buttonText={
                <RiDeleteBin6Line className="text-lg hover:text-red-500 hover:cursor-pointer" />
              }
              modalComponent={
                <ConfirmModal
                  action="Item Deletion"
                  confirm={() => handleDelete(item.id)}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
