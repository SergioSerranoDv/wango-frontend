import React, { SetStateAction, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import { AddIcon } from "../../icons/Add";
import { DeleteIcon } from "../../icons/Delete";
import { EditIcon } from "../../icons/Edit";
import { MoreOptions } from "../../icons/MoreOptions";
import { Crop } from "../../interfaces/crop";
import { deleteCropById } from "../../services/crop_s";
import { Button } from "../../styles/FormStyles";
import { Item } from "../../styles/components/Actions";
import { CropFormEdit } from "../CropFormEdit";
import { Dropdown } from "../Dropdown";
import { CollectionForm } from "../forms/CollectionForm";
import { Modal } from "../modals/Modal";

interface Props {
  cropDetails: Crop;
  refetchLotDetails: React.Dispatch<SetStateAction<number>>;
}

export const CropActions: React.FC<Props> = ({ cropDetails, refetchLotDetails }) => {
  const navigate = useNavigate();
  const { backendApiCall } = useContext(ApiContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);

  const handleDeleteCrop = async (cropId: string) => {
    const response = await deleteCropById(backendApiCall, cropId, cropDetails.lot_id);
    if (response.status === "success") {
      refetchLotDetails((prev) => prev + 1);
    }
  };

  const actions = [
    {
      action: () => setIsEditModalOpen(true),
      icon: <EditIcon />,
      name: "Editar cultivo",
    },
    {
      action: () => setIsCollectionModalOpen(true),
      icon: <AddIcon />,
      name: "Agregar recolección",
    },
    {
      action: () => navigate(`/dashboard/collections/${cropDetails._id}`),
      icon: <AddIcon />,
      name: "Ver recolecciones",
    },
    {
      action: () => setIsDeleteModalOpen(true),
      icon: <DeleteIcon />,
      name: "Eliminar cultivo",
    },
  ];

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
        <Modal
          footer={
            <Button type="submit" form="crop-form-update">
              Guardar
            </Button>
          }
          title="Editar cultivo"
          closeModal={() => setIsEditModalOpen(false)}
        >
          <CropFormEdit crop={cropDetails} />
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
