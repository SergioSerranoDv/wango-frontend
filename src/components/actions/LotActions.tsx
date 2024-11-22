import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import { LotI } from "../../interfaces/Lot";
import { deleteLotById } from "../../services/lot_s";
import { Button } from "../../styles/FormStyles";
import { LotFormEdit } from "../forms/LotFormEdit";
import { RegisterCrop } from "../forms/RegisterCrop";
import { Modal } from "../modals/Modal";
import { Add, Edit, Delete, MoreVert } from "@mui/icons-material";
import { Menu, Tooltip, IconButton, MenuItem, Typography } from "@mui/material";

interface Props {
  lotDetails: LotI;
  refetchLotDetails: () => void;
}

export const LotActions: React.FC<Props> = ({ lotDetails, refetchLotDetails }) => {
  const navigate = useNavigate();
  const { backendApiCall } = useContext(ApiContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRegisterCropModalOpen, setIsRegisterCropModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const elRef = useRef<HTMLButtonElement>(null);

  const menuItems = [
    {
      action: () => setIsEditModalOpen(true),
      icon: <Edit fontSize="small" />,
      name: "Editar lote",
    },
    {
      action: () => setIsRegisterCropModalOpen(true),
      icon: <Add fontSize="small" />,
      name: "Agregar cultivo",
    },
    {
      action: () => navigate(`/dashboard/crops/${lotDetails._id}`),
      icon: <Add fontSize="small" />,
      name: "Ver cultivos",
    },
    {
      action: () => setIsDeleteModalOpen(true),
      icon: <Delete fontSize="small" />,
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
      <Tooltip title="Opciones" placement="top">
        <IconButton ref={elRef} onClick={() => setIsMenuOpen(true)}>
          <MoreVert />
        </IconButton>
      </Tooltip>

      <Menu open={isMenuOpen} anchorEl={elRef.current} onClose={() => setIsMenuOpen(false)}>
        {menuItems.map((item, index) => (
          <MenuItem
            color="#4c443f"
            key={index}
            onClick={() => {
              setIsMenuOpen(false);
              item.action();
            }}
          >
            <span style={{ marginRight: "4px" }}>{item.icon}</span>
            <Typography fontSize={12}>{item.name}</Typography>
          </MenuItem>
        ))}
      </Menu>

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
