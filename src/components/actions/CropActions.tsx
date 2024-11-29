import React, { SetStateAction, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import { Crop } from "../../interfaces/crop";
import { deleteCropById } from "../../services/crop_s";
import { Button } from "../../styles/FormStyles";
import { CropFormEdit } from "../CropFormEdit";
import { CollectionForm } from "../forms/CollectionForm";
import { Modal } from "../modals/Modal";
import { Add, Edit, Folder, Delete, MoreVert } from "@mui/icons-material";
import { Menu, Tooltip, IconButton, MenuItem, Typography } from "@mui/material";

interface Props {
  cropDetails: Crop;
  refetchCropData: React.Dispatch<SetStateAction<number>>;
}

export const CropActions: React.FC<Props> = ({ cropDetails, refetchCropData }) => {
  const navigate = useNavigate();
  const { backendApiCall } = useContext(ApiContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const elRef = useRef<HTMLButtonElement>(null);

  const handleDeleteCrop = async (cropId: string) => {
    const response = await deleteCropById(backendApiCall, cropId, cropDetails.lot_id);
    if (response.status === "success") {
      refetchCropData((prev) => prev + 1);
    }
  };

  const menuItems = [
    {
      action: () => setIsEditModalOpen(true),
      icon: <Edit fontSize="small" />,
      name: "Editar cultivo",
    },
    {
      action: () => setIsCollectionModalOpen(true),
      icon: <Add fontSize="small" />,
      name: "Agregar recolección",
    },
    {
      action: () => navigate(`/dashboard/collections/${cropDetails._id}`),
      icon: <Folder fontSize="small" />,
      name: "Ver recolecciones",
    },
    {
      action: () => setIsDeleteModalOpen(true),
      icon: <Delete fontSize="small" />,
      name: "Eliminar cultivo",
    },
  ];

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
            <Button type="submit" form="crop-form-update">
              Guardar
            </Button>
          }
          title="Editar cultivo"
          closeModal={() => setIsEditModalOpen(false)}
        >
          <CropFormEdit
            crop={cropDetails}
            refetchData={() => refetchCropData((prev) => prev + 1)}
          />
        </Modal>
      )}

      {isCollectionModalOpen && (
        <Modal
          footer={
            <Button type="submit" form="collection-form">
              Crear
            </Button>
          }
          title="Crear recolección"
          closeModal={() => setIsCollectionModalOpen(false)}
        >
          <CollectionForm cropId={cropDetails._id} />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          footer={
            <Button
              $background="#C32F26"
              $hoverBackground="#A52A21"
              onClick={() => handleDeleteCrop(cropDetails._id)}
            >
              Eliminar
            </Button>
          }
          title="Eliminar cultivo"
          closeModal={() => setIsDeleteModalOpen(false)}
        >
          <div>¿Estás seguro de que quieres eliminar este cultivo?</div>
        </Modal>
      )}
    </>
  );
};
