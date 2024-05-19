import React, { useState, useContext, useEffect, Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { TableV2 } from "../components/TableV2";
import { ApiContext } from "../context/ApiContext";
import { SignBoardWithVariablesToCalculateWaterFootprint } from "../components/SignBoard";
import { Crop, CropDataInit } from "../interfaces/crop";
import { Collection, CollectionDataInit } from "../interfaces/collection";
import { Records } from "../interfaces/record";
import { fetchCropDetails } from "../services/crop_s";
import { formatDate } from "../services/Date";
import { getWaterFootprintByCropIdAndCollectionId } from "../services/water_footprint_s";
import { findCollectionById } from "../services/collection_s";
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
  const [crop, setCrop] = useState<Crop>(CropDataInit);

  //Se declara el estado inicial de collection
  const [collection, setCollection] = useState<Collection>(CollectionDataInit);
  const [waterFootprint, setWaterFootprint] = useState<any>({}); // Estado para almacenar la huella hídrica
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(9);
  const [collectionRecords, setCollectionRecords] = useState<Records[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loadingCollectionData, setLoadingCollectionData] = useState(true);
  const [refetch, setRefetch] = useState(0);

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
  }, [backendApiCall, cropId]);

  //Fetch the collection records
  useEffect(() => {
    async function fetchCollectionRecords() {
      if (collectionId) {
        try {
          const collectionRecords = await backendApiCall({
            method: "GET",
            endpoint: `v1/collection-record/paginated?page=${currentPage}&limit=${rowsPerPage}&collection_id=${collectionId}`,
          });
          const formattedRecords = collectionRecords.data.collectionRecords.map((record: any) => ({
            ...record,
            createdAt: new Date(record.createdAt).toLocaleString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          }));
          setCollectionRecords(formattedRecords);
          setTotalPages(collectionRecords.data.meta.total_pages);
          setLoadingCollectionData(false);
        } catch (error) {
          console.log("Error al obtener los datos de la colección:", error);
        }
      }
    }
    fetchCollectionRecords();
  }, [backendApiCall, collectionId]);

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

  return (
    <>
      <MainLayout>
        <FormContainer>
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
                {collectionRecords && collectionRecords.length > 0
                  ? (() => {
                      let eto = collectionRecords.reduce(
                        (acc, record) => acc + record.reference_evotranspiration,
                        0
                      );
                      eto = eto / collectionRecords.length;
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
                {collectionRecords && collectionRecords.length > 0
                  ? (() => {
                      let r = collectionRecords.reduce(
                        (acc, record) => acc + record.daily_performance,
                        0
                      );
                      // convert to kg/year
                      r = r * 365;
                      r = r / collectionRecords.length;
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
                  {collectionRecords && collectionRecords.length > 0
                    ? (() => {
                        let etc = collectionRecords.reduce(
                          (acc, record) => acc + record.actual_crop_evapotranspiration,
                          0
                        );
                        // convert to kg/year
                        etc = etc * 365;
                        etc = etc / collectionRecords.length;
                        let lr = etc / 1.75;
                        return lr.toFixed(2);
                      })()
                    : null}
                  Kg/Ha
                </DetailsItem>
              </DetailsSign2>
            )}
            {type === "grey" && (
              <>
                <DetailsSign2 $custom3>
                  AR ={" "}
                  <DetailsItem>
                    {collectionRecords && collectionRecords.length > 0
                      ? (() => {
                          let ar = collectionRecords.reduce(
                            (acc, record) => acc + record.amount_chemicals_used,
                            0
                          );
                          // convert to kg/year
                          ar = ar * 365;
                          ar = ar / collectionRecords.length;
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
            )}
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
          <SignBoard $custom5>Hechos en el periodo</SignBoard>
          {!loadingCollectionData && collectionRecords.length > 0 && (
            <TableV2
              oddcolor="#FFFFFF"
              evencolor={
                type === "blue"
                  ? "rgb(6, 182, 212, 0.2)"
                  : type === "green"
                    ? "rgb(57, 202, 7, 0.2)"
                    : type === "grey"
                      ? "rgb(115, 115, 115, 0.2)"
                      : ""
              }
              data={collectionRecords}
              pagination={{
                setRefetch,
                rowsPerPage,
                setRowsPerPage,
                currentPage,
                setCurrentPage,
                totalPages: totalPages,
              }}
              columns={["Fecha", "R", "Kc", "ETo", "ETc"]}
              columnMapping={{
                Fecha: "createdAt",
                R: "daily_performance",
                Kc: "current_stage",
                ETo: "reference_evotranspiration",
                ETc: "actual_crop_evapotranspiration",
              }}
              options={{ edit: () => {}, delete: () => {} }}
            />
          )}
        </FormContainer>
      </MainLayout>
    </>
  );
};
