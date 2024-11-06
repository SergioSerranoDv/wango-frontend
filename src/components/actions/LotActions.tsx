import React, { SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import { Dropdown } from "../Dropdown";
import { Modal } from "../modals/Modal";
import { LotFormEdit } from "../LotFormEdit";
import { RegisterCrop } from "../forms/RegisterCrop";
import { Item } from "../../styles/components/Actions";
import { LotI } from "../../interfaces/Lot";
import { deleteLotById } from "../../services/lot_s";
import { AddIcon } from "../../icons/Add";
import { EditIcon } from "../../icons/Edit";
import { DeleteIcon } from "../../icons/Delete";
import { MoreOptions } from "../../icons/MoreOptions";

interface Props {
  lotDetails: LotI;
  refetchLotDetails: React.Dispatch<SetStateAction<number>>;
}

export const LotActions: React.FC<Props> = ({ lotDetails, refetchLotDetails }) => {
  const navigate = useNavigate();
  const { backendApiCall } = useContext(ApiContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRegisterCropModalOpen, setIsRegisterCropModalOpen] = useState(false);
  
  const actions = [
    {
      action: () => setIsEditModalOpen(true),
      icon: <EditIcon />,
      name: "Editar lote",
    },
    {
      action: () => setIsRegisterCropModalOpen(true),
      icon: <AddIcon />,
      name: "Agregar cultivo",
    },
    {
      action: () => navigate(`/dashboard/crops/${lotDetails._id}`),
      icon: <AddIcon />,
      name: "Ver cultivos",
    },
    {
      action: () => handleDeleteLot(lotDetails._id ? lotDetails._id : ""),
      icon: <DeleteIcon />,
      name: "Eliminar lote",
    },
  ];

  const handleDeleteLot = async (id: string) => {
    const response = await deleteLotById(backendApiCall, id);
    if (response.status === "success") {
      refetchLotDetails((prev) => prev + 1);
    }
  };

  return (
    <>
      <MoreOptions
        style={{ pointerEvents: isDropdownOpen ? "none" : "auto" }}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />

      {isDropdownOpen && (
        <Dropdown closeDropdown={() => setIsDropdownOpen(false)}>
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
        <Modal title="Editar lote" closeModal={() => setIsEditModalOpen(false)}>
          <LotFormEdit data={lotDetails} refetchData={refetchLotDetails} />
        </Modal>
      )}

      {isRegisterCropModalOpen && (
        <Modal title="Agregar cultivo" closeModal={() => setIsRegisterCropModalOpen(false)}>
          <RegisterCrop lotDetails={lotDetails} />
        </Modal>
      )}
    </>
  );
};
