import React, { SetStateAction, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../Dropdown";
import { Modal } from "../modals/Modal";
import { CropFormEdit } from "../CropFormEdit";
import { RegisterCrop } from "../forms/RegisterCrop";
import { ApiContext } from "../../context/ApiContext";
import { Button, Item } from "../../styles/components/Actions";
import { deleteCropById } from "../../services/crop_s";
import { Crop } from "../../interfaces/crop";

interface Props {
  cropDetails: Crop;
  refetchLotDetails: React.Dispatch<SetStateAction<number>>;
}

export const CropActions: React.FC<Props> = ({ cropDetails, refetchLotDetails }) => {
  const navigate = useNavigate();
  const { backendApiCall } = useContext(ApiContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRegisterCropModalOpen, setIsRegisterCropModalOpen] = useState(false);

  const handleDeleteCrop = async (cropId: string) => {
    const response = await deleteCropById(backendApiCall, cropId, cropDetails.lot_id);
    console.log("Response from delete crop:", response);
    if (response.status === "success") {
      refetchLotDetails((prev) => prev + 1);
    }
  };

  const actions = [
    {
      action: () => setIsEditModalOpen(true),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z" />
        </svg>
      ),
      name: "Editar cultivo",
    },
    {
      action: () => setIsRegisterCropModalOpen(true),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      ),
      name: "Nueva recolección",
    },
    {
      action: () => handleDeleteCrop(cropDetails._id),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <line x1="10" y1="3" x2="10" y2="6" />
          <line x1="14" y1="3" x2="14" y2="6" />
        </svg>
      ),
      name: "Eliminar cultivo",
    },
  ];

  return (
    <>
      <Button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
            fill-rule="evenodd"
          />
        </svg>
      </Button>

      {isDropdownOpen && (
        <Dropdown>
          {actions.map((action) => (
            <Item
              key={action.name}
              onClick={() => {
                action.action();
                setIsDropdownOpen(false);
              }}
            >
              <span style={{ marginRight: "8px" }}>{action.icon}</span>
              <div>{action.name}</div>
            </Item>
          ))}
        </Dropdown>
      )}

      {isEditModalOpen && (
        <Modal title="Editar cultivo" closeModal={() => setIsEditModalOpen(false)}>
          <CropFormEdit crop={cropDetails} />
        </Modal>
      )}
    </>
  );
};
