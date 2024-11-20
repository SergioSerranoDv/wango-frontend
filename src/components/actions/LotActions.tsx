import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import { Add, Delete, Edit } from "../../icons/Actions";
import { MoreOptions } from "../../icons/MoreOptions";
import { LotI } from "../../interfaces/Lot";
import { deleteLotById } from "../../services/lot_s";
import { Button } from "../../styles/FormStyles";
import { Dropdown } from "../Dropdown";
import { LotFormEdit } from "../forms/LotFormEdit";
import { RegisterCrop } from "../forms/RegisterCrop";
import { Modal } from "../modals/Modal";

interface Props {
  lotDetails: LotI;
  refetchLotDetails: () => void;
}

export const LotActions: React.FC<Props> = ({ lotDetails, refetchLotDetails }) => {
  const navigate = useNavigate();
  const { backendApiCall } = useContext(ApiContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRegisterCropModalOpen, setIsRegisterCropModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const actions = [
    {
      action: () => setIsEditModalOpen(true),
      icon: <Edit />,
      name: "Editar lote",
    },
    {
      action: () => setIsRegisterCropModalOpen(true),
      icon: <Add />,
      name: "Agregar cultivo",
    },
    {
      action: () => navigate(`/dashboard/crops/${lotDetails._id}`),
      icon: <Add />,
      name: "Ver cultivos",
    },
    {
      action: () => setIsDeleteModalOpen(true),
      icon: <Delete />,
      name: "Eliminar lote",
    },
  ];

  const handleDeleteLot = async (id: string) => {
    const response = await deleteLotById(backendApiCall, id);
    if (response.status === "success") {
      refetchLotDetails();
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
        <Dropdown closeDropdown={() => setIsDropdownOpen(false)} items={actions} />
      )}

      {isEditModalOpen && (
        <Modal
          footer={
            <Button form="lot-form-update" type="submit">
              Guardar
            </Button>
          }
          title="Editar lote"
          closeModal={() => setIsEditModalOpen(false)}
        >
          <LotFormEdit data={lotDetails} refetchData={refetchLotDetails} />
        </Modal>
      )}

      {isRegisterCropModalOpen && (
        <Modal
          footer={
            <Button form="crop-form" type="submit">
              Crear
            </Button>
          }
          title="Nuevo cultivo"
          closeModal={() => setIsRegisterCropModalOpen(false)}
        >
          <RegisterCrop lotDetails={lotDetails} />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          footer={
            <Button
              $background="#C32F26"
              $hoverBackground="#A52A21"
              onClick={() => handleDeleteLot(lotDetails._id ? lotDetails._id : "")}
            >
              Eliminar
            </Button>
          }
          title="Eliminar lote"
          closeModal={() => setIsDeleteModalOpen(false)}
        >
          <p>¿Estás seguro que deseas eliminar este lote?</p>
        </Modal>
      )}
    </>
  );
};
