import styled from "styled-components";
import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import { ApiContext } from "../context/ApiContext";
import { AddIcon } from "../icons/Add";
import { Input } from "../styles/FormStyles";
import { AddButton } from "../styles/components/modals/ModalStyles";

interface Product {
  _id: string;
  name: string;
  code: string;
  quantity?: number;
}

interface ProductSearchProps {
  onProductSelect: (product: Product) => void;
  productsSelected?: Product[];
  setProductsSelected?: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  onProductSelect,
  productsSelected = [],
  setProductsSelected,
}) => {
  const { backendApiCall } = useContext(ApiContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleProductSelection = (product: Product) => {
    setSelectedProduct(product);
    setIsDropdownVisible(false);
  };

  const addProduct = () => {
    if (!setProductsSelected || !selectedProduct) return;

    const productExists = productsSelected.some((product) => product._id === selectedProduct._id);
    const updatedProducts = productExists
      ? productsSelected.map((product) =>
          product._id === selectedProduct._id
            ? { ...product, quantity: (product.quantity || 0) + parseInt(quantity) }
            : product
        )
      : [...productsSelected, { ...selectedProduct, quantity: parseInt(quantity) }];

    setProductsSelected(updatedProducts);
    resetSelection();
  };

  const resetSelection = () => {
    setSelectedProduct(null);
    setSearchQuery("");
    setQuantity("");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await backendApiCall({
        endpoint: `products/search?search=${searchQuery}`,
        method: "GET",
      });
      if (response.status === "success") {
        setProductList(response.data);
      }
    };

    if (searchQuery) {
      fetchProducts();
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  }, [searchQuery, backendApiCall]);

  console.log("productsSelected", productsSelected);

  return (
    <DropdownContainer>
      <SearchContainer>
        <InputContainer>
          <Input
            type="text"
            placeholder="Buscar producto químico"
            value={
              selectedProduct ? `${selectedProduct.name} - ${selectedProduct.code}` : searchQuery
            }
            onChange={handleSearchQueryChange}
          />
          {isDropdownVisible && productList.length > 0 && (
            <DropdownList>
              {productList.map((product) => (
                <DropdownItem key={product._id} onClick={() => handleProductSelection(product)}>
                  {product.name} - {product.code}
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </InputContainer>
        <Input
          type="number"
          placeholder="Cantidad"
          value={quantity}
          min="1"
          onChange={handleQuantityChange}
        />
        <AddButton type="button" onClick={addProduct}>
          <AddIcon />
        </AddButton>
      </SearchContainer>
    </DropdownContainer>
  );
};

// Styled Components
const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
