import React, { SetStateAction, useContext, useState, useRef } from "react";
import { ApiContext } from "../../context/ApiContext";
import { ProductI } from "../../interfaces/Product";
import { deleteProductById } from "../../services/product_s";
import { Button } from "../../styles/FormStyles";
import { ProductFormEdit } from "../forms/ProductFormEdit";
import { Modal } from "../modals/Modal";
import { Edit, Delete, MoreVert } from "@mui/icons-material";
import { Menu, Tooltip, IconButton, MenuItem, Typography } from "@mui/material";

interface Props {
  productDetails: ProductI;
  refetchProductDetails: React.Dispatch<SetStateAction<number>>;
}

export const ProductActions: React.FC<Props> = ({ productDetails, refetchProductDetails }) => {
  const { backendApiCall } = useContext(ApiContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const elRef = useRef<HTMLButtonElement>(null);

  const menuItems = [
    {
      action: () => setIsEditModalOpen(true),
      icon: <Edit fontSize="small" />,
      name: "Editar producto",
    },
    {
      action: () => handleDeleteProduct(productDetails._id),
      icon: <Delete fontSize="small" />,
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
