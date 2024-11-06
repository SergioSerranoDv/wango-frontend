import React, { SetStateAction, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../Dropdown";
import { Crop } from "../../interfaces/crop";
import { EditIcon } from "../../icons/Edit";
import { AddIcon } from "../../icons/Add";
import { DeleteIcon } from "../../icons/Delete";
import { Modal } from "../modals/Modal";
import { CollectionForm } from "../forms/CollectionForm";
import { CropFormEdit } from "../CropFormEdit";
import { ApiContext } from "../../context/ApiContext";
import { Item } from "../../styles/components/Actions";
import { deleteCropById } from "../../services/crop_s";
import { MoreOptions } from "../../icons/MoreOptions";

interface Props {
  cropDetails: Crop;
  refetchLotDetails: React.Dispatch<SetStateAction<number>>;
}

export const CropActions: React.FC<Props> = ({ cropDetails, refetchLotDetails }) => {
  const navigate = useNavigate();
  const { backendApiCall } = useContext(ApiContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
      action: () => handleDeleteCrop(cropDetails._id),
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
        <Modal title="Editar cultivo" closeModal={() => setIsEditModalOpen(false)}>
          <CropFormEdit crop={cropDetails} />
        </Modal>
      )}

      {isCollectionModalOpen && (
        <Modal title="Agregar recolección" closeModal={() => setIsCollectionModalOpen(false)}>
          <CollectionForm cropId={cropDetails._id} />
        </Modal>
      )}
    </>
  );
};
