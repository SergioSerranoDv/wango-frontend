import React, { useCallback } from "react";
import { LoadingAnimation } from "../components/Loading";
import { ProductActions } from "../components/actions/ProductActions";
import { ProductForm } from "../components/forms/ProductForm";
import { Modal } from "../components/modals/Modal";
import { TableV1 } from "../components/tables/TableV1";
import { UseGet } from "../hooks/UseGet";
import { UsePagination } from "../hooks/UsePagination";
import { ProductI } from "../interfaces/Product";
import { MainLayout } from "../layouts/MainLayout";
import { ButtonSecondary } from "../styles/AddLoteStyles";
import { Text } from "../styles/MainMenuStyles";

export const Products: React.FC = () => {
  const { currentPage, setCurrentPage, rowsPerPage, setRowsPerPage } = UsePagination();
  const { data, loading, setRefetch } = UseGet({
    endpoint: `products?page=${currentPage}&limit=${rowsPerPage}`,
  });
  const [isModalOpen, setEditModalOpen] = React.useState(false);

  const columns = useCallback(
    () => [
      {
        title: "Nombre",
        dataIndex: "name",
        render: (product: ProductI) => <span>{product.name}</span>,
      },
      {
        title: "Tipo",
        dataIndex: "type",
        render: (product: ProductI) => <span>{product.type}</span>,
      },
      {
        title: "Acciones",
        dataIndex: "_id",
        render: (product: ProductI) => (
          <ProductActions productDetails={product} refetchProductDetails={setRefetch} />
        ),
      },
    ],
    [setRefetch]
  );

  return (
    <MainLayout>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px" }}>
            <Text>Tus productos quimicos registrados.</Text>
            <ButtonSecondary onClick={() => setEditModalOpen(true)}>
              <span>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: "6px" }}
                >
                  <path d="M11 13v6h2v-6h6v-2h-6V5h-2v6H5v2h6z" fill="currentColor"></path>
                </svg>
              </span>
              Crear Producto
            </ButtonSecondary>
          </div>
          <TableV1
            columns={columns()}
            data={data.products}
            evencolor="#FFFFFF"
            oddcolor="rgb(6, 182, 212, 0.2)"
            pagination={{
              rowsPerPage,
              setRowsPerPage,
              currentPage,
              setCurrentPage,
              setRefetch,
              totalPages: data.meta.pages,
            }}
            title="Productos quimicos"
          />
        </>
      )}
      {isModalOpen && (
        <Modal title="Nuevo producto" closeModal={() => setEditModalOpen(false)}>
          <ProductForm
            refetchProductDetails={setRefetch}
            closeModal={() => setEditModalOpen(false)}
          />
        </Modal>
      )}
    </MainLayout>
  );
};
