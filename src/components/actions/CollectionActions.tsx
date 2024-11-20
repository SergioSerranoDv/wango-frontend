import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import { Add, Edit } from "../../icons/Actions";
import { MoreOptions } from "../../icons/MoreOptions";
import { Collection } from "../../interfaces/collection";
import { updateCollectionStatus } from "../../services/collection_s";
import { Button } from "../../styles/FormStyles";
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

  // const deleteCollection = async (id: string) => {
  //   try {
  //     const response = await backendApiCall({
  //       method: "DELETE",
  //       endpoint: `v1/collection-record/delete/${id}`,
  //     });

  //     if (response.status === "success") {
  //       refetchCollections((prev) => prev + 1);
  //       setIsDeleteModalOpen(false);
  //     }
  //   } catch (error) {
  //     console.log("Error al eliminar el registro:", error);
  //   }
  // };

  const actions = [
    {
      action: () => setIsEditModalOpen(true),
      icon: <Edit />,
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
      icon: <Add />,
      name: "Ver registros",
    },
    // {
    //   action: () => setIsDeleteModalOpen(true),
    //   icon: <DeleteIcon />,
    //   name: "Eliminar recolección",
    // },
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
        <Dropdown closeDropdown={() => setIsDropdownOpen(false)} items={actions} />
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

      {/* {isDeleteModalOpen && (
        <Modal
          footer={
            <Button
              $background="#C32F26"
              $hoverBackground="#A52A21"
              onClick={() => deleteCollection(collectionDetails._id)}
            >
              Eliminar
            </Button>
          }
          title="Eliminar recolección"
          closeModal={() => setIsDeleteModalOpen(false)}
        >
          <p>¿Estás seguro de que deseas eliminar la recolección?</p>
        </Modal>
      )} */}
    </>
  );
};
