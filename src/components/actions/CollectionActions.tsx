import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import { AddIcon } from "../../icons/Add";
import { DeleteIcon } from "../../icons/Delete";
import { EditIcon } from "../../icons/Edit";
import { MoreOptions } from "../../icons/MoreOptions";
import { Collection } from "../../interfaces/collection";
import { updateCollectionStatus } from "../../services/collection_s";
import { Button } from "../../styles/FormStyles";
import { Item } from "../../styles/components/Actions";
import { Dropdown } from "../Dropdown";
import { CollectionFormEdit } from "../forms/CollectionFormEdit";
import { Modal } from "../modals/Modal";

interface Props {
  collectionDetails: Collection;
  refetchCollections: React.Dispatch<React.SetStateAction<number>>;
}

export const CollectionActions: React.FC<Props> = ({ collectionDetails, refetchCollections }) => {
  const { backendApiCall } = useContext(ApiContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  
  // const handleDeleteConfirmation = async () => {
  //   if (deletingRecordId) {
  //     console.log("Eliminando registro con ID:", deletingRecordId);
  //     try {
  //       const response = await backendApiCall({
  //         method: "DELETE",
  //         endpoint: `collection-record/delete/${deletingRecordId}`,
  //       });
  //       if (response.status === "success") {
  //         setShowNotification(false); // Cerrar el modal de notificación
  //         setRefetch((prev) => prev + 1);
  //         setDeletingRecordId(undefined); // Limpiar el ID del registro a eliminar
  //       } else {
  //         console.log("Error al eliminar el registro:", response.message);
  //       }
  //     } catch (error) {
  //       console.log("Error al eliminar el registro:", error);
  //     }
  //   }
  // };

  const actions = [
    {
      action: () => setIsEditModalOpen(true),
      icon: <EditIcon />,
      name: "Editar recoleción",
    },
    {
      action: () => handleUpdateCollectionStatus(collectionDetails._id, collectionDetails.crop_id),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      name: collectionDetails.status === "in_progress" ? "Detener recolección" : "Reanudar",
    },
    {
      action: () => navigate(`/dashboard/collections/records/${collectionDetails._id}`),
      icon: <AddIcon />,
      name: "Ver registros",
    },
    {
      action: () => setIsDeleteModalOpen(true),
      icon: <DeleteIcon />,
      name: "Eliminar recolección",
    },
  ];

  const handleUpdateCollectionStatus = async (collectionId: string, crop_id: string) => {
    try {
      const response = await updateCollectionStatus(backendApiCall, collectionId, {
        crop_id: crop_id,
        status: "completed",
      });
      if (response.status === "success") {
        refetchCollections((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
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
        <Modal
          footer={
            <Button
              form="collection-form-update"
              type="submit"
              className="text-primary-500 hover:text-primary-400"
            >
              Guardar
            </Button>
          }
          title="Editar recolección"
          closeModal={() => setIsEditModalOpen(false)}
        >
          <CollectionFormEdit
            collection={collectionDetails}
            refetchCollections={refetchCollections}
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal
          footer={
            <Button
              $background="#C32F26"
              $hoverBackground="#A52A21"
              onClick={() =>
                handleUpdateCollectionStatus(collectionDetails._id, collectionDetails.crop_id)
              }
            >
              Eliminar
            </Button>
          }
          title="Eliminar recolección"
          closeModal={() => setIsDeleteModalOpen(false)}
        >
          <p>¿Estás seguro de que deseas eliminar la recolección?</p>
        </Modal>
      )}
    </>
  );
};
