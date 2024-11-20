import React, { SetStateAction, useContext, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
import { Edit, Delete } from "../../icons/Actions";
import { MoreOptions } from "../../icons/MoreOptions";
import { ProductI } from "../../interfaces/Product";
import { deleteProductById } from "../../services/product_s";
import { Button } from "../../styles/FormStyles";
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
      icon: <Edit />,
      name: "Editar producto",
    },
    {
      action: () => handleDeleteProduct(productDetails._id),
      icon: <Delete />,
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
        <Dropdown closeDropdown={() => setIsDropdownOpen(false)} items={actions} />
      )}

      {isEditModalOpen && (
        <Modal
          footer={
            <Button form="product-form-update" type="submit">
              Guardar
            </Button>
          }
          title="Editar producto"
          closeModal={() => setIsEditModalOpen(false)}
        >
          <ProductFormEdit product={productDetails} refetchProductDetails={refetchProductDetails} />
        </Modal>
      )}
    </>
  );
};
