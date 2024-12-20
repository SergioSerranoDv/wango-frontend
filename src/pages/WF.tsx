import React, { useState, useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingAnimation } from "../components/Loading";
import { SignBoardWithVariablesToCalculateWaterFootprint } from "../components/SignBoard";
import { TableV1 } from "../components/tables/TableV1";
import { ApiContext } from "../context/ApiContext";
import { UseGet } from "../hooks/UseGet";
import { UsePagination } from "../hooks/UsePagination";
import { Collection, CollectionDataInit } from "../interfaces/collection";
import { Crop, CropDataInit } from "../interfaces/crop";
import { Record } from "../interfaces/record";
import { MainLayout } from "../layouts/MainLayout";
import { formatDate } from "../services/Date";
import { findCollectionById } from "../services/collection_s";
import { findCropById } from "../services/crop_s";
import { getWaterFootprintByCropIdAndCollectionId } from "../services/water_footprint_s";
import {
  ContainerInput,
  DetailsItem,
  DetailsSign2,
  FormContainer,
  InfoContainer,
  Input,
  Label,
  SignBoard,
  SubLabel,
} from "../styles/FormStyles";

export const WF: React.FC = () => {
  const { backendApiCall } = useContext(ApiContext);
  const { id, type } = useParams<{ id: string; type: string }>();
  const collectionId = id;
  const { currentPage, setCurrentPage, rowsPerPage, setRowsPerPage } = UsePagination();
  const [crop, setCrop] = useState<Crop>(CropDataInit);
  const { data, loading, setRefetch } = UseGet({
    endpoint: `v1/collection-record/paginated?page=${currentPage}&limit=${rowsPerPage}&collection_id=${collectionId}`,
  });

  //Se declara el estado inicial de collection
  const [collection, setCollection] = useState<Collection>(CollectionDataInit);
  const [waterFootprint, setWaterFootprint] = useState<any>({}); // Estado para almacenar la huella hídrica
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");

  useEffect(() => {
    async function loadCollectionDetails() {
      if (collectionId) {
        try {
          const collectionDetails = await findCollectionById(backendApiCall, collectionId);
          if (collectionDetails && collectionDetails.data) {
            setCollection(collectionDetails.data);
            setInitialDate(formatDate(collectionDetails.data.createdAt));
            setFinalDate(formatDate(collectionDetails.data.updatedAt));
          }
        } catch (error) {
          console.log("Error fetching crop details:", error);
        }
      }
    }
    loadCollectionDetails();
  }, [backendApiCall, collectionId]);

  const cropId = collection?.crop_id;

  useEffect(() => {
    async function fetchCropDetails() {
      if (cropId) {
        try {
          const cropDetails = await findCropById(backendApiCall, cropId);
          if (cropDetails && cropDetails.data) {
            setCrop(cropDetails.data);
          }
        } catch (error) {
          console.log("Error fetching crop details:", error);
        }
      }
    }
    fetchCropDetails();
  }, [backendApiCall, cropId]);

  useEffect(() => {
    async function fetchWaterFootprint() {
      if (collectionId && cropId) {
        try {
          const waterFootprint = await getWaterFootprintByCropIdAndCollectionId(
            backendApiCall,
            collectionId,
            cropId
          );
          if (waterFootprint && waterFootprint.data) {
            setWaterFootprint(waterFootprint.data);
          }
        } catch (error) {
          console.log("Error fetching water footprint:", error);
        }
      }
    }
    fetchWaterFootprint();
  }, [backendApiCall, collectionId, cropId]);

  const columns = useCallback(
    () => [
      {
        title: "Fecha de creación",
        dataIndex: "createdAt",
        render: (record: Record) =>
          record.createdAt ? formatDate(record.createdAt.toString()) : "N/A",
      },

      {
        title: "Rendimiento diario (kg)",
        dataIndex: "daily_performance",
        render: (record: Record) => record.daily_performance,
      },
      {
        title: "Etapa actual",
        dataIndex: "current_stage",
        render: (record: Record) => record.current_stage,
      },
      {
        title: "ETo (mm/día)",
        dataIndex: "reference_evotranspiration",
        render: (record: Record) => record.reference_evotranspiration,
      },
      {
        title: "ETc (mm/día)",
        dataIndex: "actual_crop_evapotranspiration",
        render: (record: Record) => record.actual_crop_evapotranspiration,
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
          <SignBoard $custom4>Registros del cultivo '{crop?.name}' en el periodo</SignBoard>
          <SignBoard $custom3>
            {initialDate ? `${initialDate} - ` : ""}
            {finalDate ? `${finalDate}` : ""}
          </SignBoard>
          <SignBoardWithVariablesToCalculateWaterFootprint type={type} />
          <InfoContainer $custom4>
            <br />
            <DetailsSign2 $custom4>
              Área = <DetailsItem>{crop?.area} Ha</DetailsItem>
            </DetailsSign2>
            <DetailsSign2 $custom3>
              ETo ={" "}
              <DetailsItem>
                {data.collectionRecords.length > 0
                  ? (() => {
                      let eto = data.collectionRecords.reduce(
                        (acc: number, record: Record) => acc + record.reference_evotranspiration,
                        0
                      );
                      eto = eto / data.collectionRecords.length;
                      eto = eto * 365;
                      return eto.toFixed(2);
                    })()
                  : null}
                mm/año
              </DetailsItem>
            </DetailsSign2>
            <DetailsSign2 $custom3>
              R ={" "}
              <DetailsItem>
                {data.collectionRecords.length > 0
                  ? (() => {
                      let r = data.collectionRecords.reduce(
                        (acc: number, record: Record) => acc + record.daily_performance,
                        0
                      );
                      // convert to kg/year
                      r = r * 365;
                      r = r / data.collectionRecords.length;
                      r = r / 1000; // Convert to tons/year
                      return r.toFixed(2);
                    })()
                  : null}
                Ton/año
              </DetailsItem>
            </DetailsSign2>
            {type === "blue" && (
              <DetailsSign2 $custom3>
                {}
                Ir ={" "}
                <DetailsItem>
                  {data.collectionRecords.length > 0
                    ? (() => {
                        let etc = data.collectionRecords.reduce(
                          (acc: number, record: Record) =>
                            acc + record.actual_crop_evapotranspiration,
                          0
                        );
                        // convert to kg/year
                        etc = etc * 365;
                        etc = etc / data.collectionRecords.length;
                        let lr = etc / 1.75;
                        return lr.toFixed(2);
                      })()
                    : null}
                  Kg/Ha
                </DetailsItem>
              </DetailsSign2>
            )}
            {/* {type === "grey" && (
              <>
                <DetailsSign2 $custom3>
                  AR ={" "}
                  <DetailsItem>
                    {data.collectionRecords.length > 0
                      ? (() => {
                          let ar = data.collectionRecords.reduce(
                            (acc: number, record: Record) => acc + record.chemicals_used,
                            0
                          );
                          // convert to kg/year
                          ar = ar * 365;
                          ar = ar / data.collectionRecords.length;
                          return ar.toFixed(2);
                        })()
                      : null}
                    m3/año
                  </DetailsItem>
                </DetailsSign2>
                <DetailsSign2 $custom3>
                  C<SubLabel>max</SubLabel>=<DetailsItem> 50mg/L</DetailsItem>
                </DetailsSign2>
                <DetailsSign2 $custom3>
                  C<SubLabel>nat</SubLabel>=<DetailsItem> 50mg/L</DetailsItem>
                </DetailsSign2>
              </>
            )} */}
          </InfoContainer>
          <ContainerInput>
            <Label htmlFor="WateFGreen" $custom1>
              HH
            </Label>
            <SubLabel>
              {type === "blue"
                ? "azul"
                : type === "green"
                  ? "verde"
                  : type === "grey"
                    ? "gris"
                    : ""}
            </SubLabel>
            =
            <Input
              disabled
              type="number"
              id="HHv"
              $custom1
              value={
                type === "blue"
                  ? waterFootprint.blue_component
                  : type === "green"
                    ? waterFootprint.green_component
                    : type === "grey"
                      ? waterFootprint.grey_component
                      : ""
              }
            />
          </ContainerInput>
          {data.collectionRecords.length > 0 && (
            <TableV1
              data={data.collectionRecords}
              evencolor={
                type === "blue"
                  ? "rgb(6, 182, 212, 0.2)"
                  : type === "green"
                    ? "rgb(57, 202, 7, 0.2)"
                    : type === "grey"
                      ? "rgb(115, 115, 115, 0.2)"
                      : ""
              }
              oddcolor="#FFFFFF"
              pagination={{
                setRefetch,
                rowsPerPage,
                setRowsPerPage,
                currentPage,
                setCurrentPage,
                totalPages: data.meta.total_pages,
              }}
              columns={columns()}
              title="Registros de la recolección"
            />
          )}
        </>
      )}
    </MainLayout>
  );
};
