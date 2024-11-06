import React, { SetStateAction, useContext, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
import { DeleteIcon } from "../../icons/Delete";
import { EditIcon } from "../../icons/Edit";
import { MoreOptions } from "../../icons/MoreOptions";
import { ProductI } from "../../interfaces/Product";
import { deleteProductById } from "../../services/product_s";
import { Item } from "../../styles/components/Actions";
import { Dropdown } from "../Dropdown";
import { ProductFormEdit } from "../forms/ProductFormEdit";
import { Modal } from "../modals/Modal";

interface Props {
  productDetails: ProductI;
  refetchProductDetails: React.Dispatch<SetStateAction<number>>;
}

export const ProductActions: React.FC<Props> = ({ productDetails, refetchProductDetails }) => {
  const { backendApiCall } = useContext(ApiContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const actions = [
    {
      action: () => setIsEditModalOpen(true),
      icon: <EditIcon />,
      name: "Editar producto",
    },
    {
      action: () => handleDeleteProduct(productDetails._id),
      icon: <DeleteIcon />,
      name: "Eliminar producto",
    },
  ];

  const handleDeleteProduct = async (id: string) => {
    const response = await deleteProductById(backendApiCall, id);
    if (response.status === "success") {
      refetchProductDetails((prev) => prev + 1);
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
        <Modal title="Editar producto" closeModal={() => setIsEditModalOpen(false)}>
          <ProductFormEdit product={productDetails} refetchProductDetails={refetchProductDetails} />
        </Modal>
      )}
    </>
  );
};
