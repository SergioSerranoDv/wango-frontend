import React, { useState, useContext, useEffect } from "react";
import { Form, useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { ApiContext } from "../context/ApiContext";
import { CropFormEdit } from "../components/CropFormEdit";
import {
  ContainerInput,
  DetailsItem,
  DetailsSign,
  DetailsSign2,
  FormContainer,
  InfoContainer,
  Input,
  Label,
  SignBoard,
  SubLabel,
} from "../styles/FormStyles";
import { Crop } from "../interfaces/crop";
import { fetchCropDetails } from "../services/crop_s";
import { TableV1 } from "../components/TableV1";

export const WFGreen: React.FC = () => {
  const { backendApiCall } = useContext(ApiContext);
  const [crop, setCrop] = useState<Crop>({
    _id: "",
    area: 0,
    lot_id: "",
    name: "",
    latitude: "",
    longitude: "",
  });
  const { id } = useParams();
  const cropId = id;
  useEffect(() => {
    console.log("CropID: ", cropId);
    async function loadCropDetails() {
      if (cropId) {
        try {
          const cropDetails = await fetchCropDetails(backendApiCall, cropId);
          if (cropDetails && cropDetails.data) {
            setCrop(cropDetails.data);
          }
        } catch (error) {
          console.log("Error fetching crop details:", error);
        }
      }
    }
    loadCropDetails();
    console.log("Crop: ", crop);
  }, [backendApiCall, cropId]);

  return (
    <>
      <MainLayout>
        <FormContainer>
          <SignBoard $custom4>Registros del cultivo '{crop?.name}' en el periodo</SignBoard>
          <SignBoard $custom3>00/00/00 - 00/00/00</SignBoard>
          <InfoContainer $custom1>
            <br />
            <DetailsSign $custom4>
              R = <DetailsItem> Rendimiento del cultivo (Ton/día).</DetailsItem>
            </DetailsSign>
            <DetailsSign $custom3>
              Kc = <DetailsItem> Coeficiente del cultivo.</DetailsItem>
            </DetailsSign>
            <DetailsSign $custom3>
              ETo = <DetailsItem>Evapotranspiración de referencia (mm/día).</DetailsItem>
            </DetailsSign>
            <DetailsSign $custom3>
              ETc = <DetailsItem>Evapotranspiración real del cultivo (mm/día).</DetailsItem>
            </DetailsSign>
          </InfoContainer>

          <InfoContainer $custom4>
            <br />
            <DetailsSign2 $custom4>
              Área = <DetailsItem>{crop?.area} Ha</DetailsItem>
            </DetailsSign2>
            <DetailsSign2 $custom3>
              ETc = <DetailsItem>000.00 mm/año</DetailsItem>
            </DetailsSign2>
            <DetailsSign2 $custom3>
              R = <DetailsItem>00.0 Ton/año</DetailsItem>
            </DetailsSign2>
          </InfoContainer>

          <ContainerInput>
            <Label htmlFor="WateFGreen" $custom1>
              HH
            </Label>
            <SubLabel>verde</SubLabel>
            =
            <Input disabled type="number" id="HHv" $custom1 />
          </ContainerInput>
          <SignBoard $custom5>Noviembre (11/2023)</SignBoard>
        </FormContainer>
        {/* <TableV1
          evencolor="#FFFFFF"
          oddcolor="rgb(255, 103, 15, 0.2)"
          //data=
          // pagination={{
          //   rowsPerPage,
          //   setRowsPerPage,
          //   currentPage,
          //   setCurrentPage,
          //   setRefetch,
          //   totalPages: data.meta.total_pages,
          // }}
          columns={["Fecha", "R(Ton/dia)", "Kc", "ETo(mm/dia)", "ETc(mm/dia)"]}
          // columnMapping={{
          //   Lote: "name",
          //   Capacidad: "capacity",
          // }}
          //options={{ edit: handleEdit, delete: handleDelete }}
        /> */}
      </MainLayout>
    </>
  );
};
