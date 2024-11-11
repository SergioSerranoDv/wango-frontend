import React, { useCallback } from "react";
import { Header } from "../components/Header";
import { LoadingAnimation } from "../components/Loading";
import { ProductActions } from "../components/actions/ProductActions";
import { ProductForm } from "../components/forms/ProductForm";
import { Modal } from "../components/modals/Modal";
import { TableV1 } from "../components/tables/TableV1";
import { UseGet } from "../hooks/UseGet";
import { UsePagination } from "../hooks/UsePagination";
import { ProductI } from "../interfaces/Product";
import { MainLayout } from "../layouts/MainLayout";
import { formatDate } from "../services/Date";
import { Button } from "../styles/FormStyles";

export const Products: React.FC = () => {
  const { currentPage, setCurrentPage, rowsPerPage, setRowsPerPage } = UsePagination();
  const { data, loading, setRefetch } = UseGet({
    endpoint: `products?page=${currentPage}&limit=${rowsPerPage}`,
  });
  const [isModalOpen, setEditModalOpen] = React.useState(false);

  const columns = useCallback(
    () => [
      {
        title: "Fecha de creación",
        dataIndex: "createdAt",
        render: (product: any) => formatDate(product.createdAt),
      },
      {
        title: "Nombre",
        dataIndex: "name",
        render: (product: ProductI) => product.name,
      },
      {
        title: "Tipo",
        dataIndex: "type",
        render: (product: ProductI) => product.type,
      },
      {
        title: "Código (ICA)",
        dataIndex: "code",
        render: (product: ProductI) => product.code,
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
          <Header
            description="Tus productos quimicos registrados."
            title="Crear producto"
            openModal={() => setEditModalOpen(true)}
          />

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
        <Modal
          footer={
            <Button form="product-form" type="submit">
              Crear
            </Button>
          }
          title="Nuevo producto"
          closeModal={() => setEditModalOpen(false)}
        >
          <ProductForm
            refetchProductDetails={setRefetch}
            closeModal={() => setEditModalOpen(false)}
          />
        </Modal>
      )}
    </MainLayout>
  );
};
