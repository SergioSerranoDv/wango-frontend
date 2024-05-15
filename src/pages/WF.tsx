import React, { useState, useContext, useEffect, Dispatch, SetStateAction } from "react";
import { Form, useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { ApiContext } from "../context/ApiContext";
import { CropFormEdit } from "../components/CropFormEdit";
import { Records } from "../interfaces/record";
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
import { getWaterFootprintByCollectionId } from "../services/water_footprint_s";
import { Collection, CollectionDataInit } from "../interfaces/collection";
import { findCollectionById } from "../services/collection_s";
import { TableV2 } from "../components/TableV2";

export const WF: React.FC = () => {
  const { backendApiCall } = useContext(ApiContext);
  const { id, type } = useParams<{ id: string; type: string }>();
  const collectionId = id;
  const [crop, setCrop] = useState<Crop>({
    _id: "",
    area: 0,
    lot_id: "",
    name: "",
    latitude: "",
    longitude: "",
  });

  //Se declara el estado inicial de collection
  const [collection, setCollection] = useState<Collection>(CollectionDataInit);
  const [formattedCollection, setFormattedCollection] = useState<Collection[]>([]); // Estado para formatear
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
    console.log("Tipo de componente: ", type);
    console.log("CollectionID: ", collectionId);
    async function loadCollectionDetails() {
      if (collectionId) {
        try {
          const collectionDetails = await findCollectionById(backendApiCall, collectionId);
          if (collectionDetails && collectionDetails.data) {
            setCollection(collectionDetails.data);
            // setFormattedCollection(collectionDetails.data);
            console.log("Collection Data: ", collectionDetails.data);

            // Verifica si las fechas son válidas antes de intentar formatearlas
            if (collectionDetails && collectionDetails.data) {
              const initialDate = collectionDetails.data.createdAt;
              const finalDate = collectionDetails.data.updatedAt;
              const formattedInitialDate = new Date(initialDate).toLocaleString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              const formattedFinalDate = new Date(finalDate).toLocaleString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              setInitialDate(formattedInitialDate);
              setFinalDate(formattedFinalDate);
            }

            // console.log("InitialDate: ", initialDate);
            // console.log("FinallDate: ", finalDate);
          }
        } catch (error) {
          console.log("Error fetching crop details:", error);
        }
      }
    }
    loadCollectionDetails();
    console.log("Collection V2: ", collection);
  }, [backendApiCall, collectionId]);

  const cropId = collection?.crop_id;

  useEffect(() => {
    console.log("CropID: ", collection?.crop_id);
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
          console.log("Registros de la colección: ", formattedRecords);
        } catch (error) {
          console.log("Error al obtener los datos de la colección:", error);
        }
      }
    }
    fetchCollectionRecords();
  }, [backendApiCall, collectionId]);

  useEffect(() => {
    async function fetchWaterFootprint() {
      if (collectionId) {
        console.log("Fetching water footprint for collection: ", collectionId);
        try {
          const waterFootprint = await getWaterFootprintByCollectionId(
            backendApiCall,
            collectionId
          );
          console.log("WaterFootprint: ", waterFootprint);
          if (waterFootprint && waterFootprint.data) {
            setWaterFootprint(waterFootprint.data);
          }
        } catch (error) {
          console.log("Error fetching water footprint:", error);
        }
      }
    }
    fetchWaterFootprint();
  }, [backendApiCall, collectionId]);

  return (
    <>
      <MainLayout>
        <FormContainer>
          <SignBoard $custom4>Registros del cultivo '{crop?.name}' en el periodo</SignBoard>
          <SignBoard $custom3>
            {initialDate ? `${initialDate} - ` : ""}
            {finalDate ? `${finalDate}` : ""}
          </SignBoard>

          <InfoContainer $custom1 typeColor={type === "grey" ? "#FB9E0B" : undefined}>
            <br />
            <DetailsSign $custom4>
              R = <DetailsItem> Rendimiento del cultivo (Ton/día).</DetailsItem>
            </DetailsSign>

            <DetailsSign $custom3>
              Kc = <DetailsItem> Coeficiente del cultivo.</DetailsItem>
            </DetailsSign>

            {type === "grey" && (
              <DetailsSign $custom3>
                C<SubLabel>max</SubLabel>=
                <DetailsItem> Cantidad máxima permitida de químico.</DetailsItem>
              </DetailsSign>
            )}
            {type === "grey" && (
              <DetailsSign $custom3>
                C<SubLabel>nat</SubLabel>=
                <DetailsItem> Cantidad natural del químico en el agua.</DetailsItem>
              </DetailsSign>
            )}

            {(type === "blue" || type === "green") && (
              <DetailsSign $custom3>
                ETo = <DetailsItem>Evapotranspiración de referencia (mm/día).</DetailsItem>
              </DetailsSign>
            )}

            <DetailsSign $custom3>
              ETc = <DetailsItem>Evapotranspiración real del cultivo (mm/día).</DetailsItem>
            </DetailsSign>

            {type === "grey" && (
              <DetailsSign $custom3>
                α = <DetailsItem>Fracción de lixiviación-escorrentía superficial.</DetailsItem>
              </DetailsSign>
            )}

            {type === "grey" && (
              <DetailsSign $custom3>
                AR = <DetailsItem>Cant. aplicada de productos químicos (Kg/Ha).</DetailsItem>
              </DetailsSign>
            )}

            {type === "blue" && (
              <DetailsSign $custom3>
                Ir = <DetailsItem>Agua de riego basada en evapotranspiración (mm/día).</DetailsItem>
              </DetailsSign>
            )}
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
            {type === "blue" && (
              <DetailsSign2 $custom3>
                Ir = <DetailsItem>000.00 Kg/Ha</DetailsItem>
              </DetailsSign2>
            )}
            {type === "grey" && (
              <>
                <DetailsSign2 $custom3>
                  AR = <DetailsItem>000.00 m3/año</DetailsItem>
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
                rowsPerPage,
                setRowsPerPage,
                currentPage,
                setCurrentPage,
                setRefetch,
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
