import React, { SetStateAction, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import { Add, Delete, Edit } from "../../icons/Actions";
import { MoreOptions } from "../../icons/MoreOptions";
import { Crop } from "../../interfaces/crop";
import { deleteCropById } from "../../services/crop_s";
import { Button } from "../../styles/FormStyles";
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
      icon: <Edit />,
      name: "Editar cultivo",
    },
    {
      action: () => setIsCollectionModalOpen(true),
      icon: <Add />,
      name: "Agregar recolección",
    },
    {
      action: () => navigate(`/dashboard/collections/${cropDetails._id}`),
      icon: <Add />,
      name: "Ver recolecciones",
    },
    {
      action: () => setIsDeleteModalOpen(true),
      icon: <Delete />,
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
        <Dropdown closeDropdown={() => setIsDropdownOpen(false)} items={actions} />
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
