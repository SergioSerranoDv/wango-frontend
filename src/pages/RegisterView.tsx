import { useState, useContext, useEffect } from "react";
import { UseGet } from "../hooks/UseGet";
import { Calendar } from "../components/modals/Calendar";
import { AddRegistry } from "../components/modals/FormModal";
import { useParams } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import { Crop } from "../interfaces/crop";
import { fetchCropDetails, getCropStatus } from "../services/crop_s";
import { fetchWeatherApi } from "openmeteo";
import {
  ButtonContainer,
  Button,
  Description,
  FormContainer,
  SignBoard,
} from "../styles/FormStyles";
import { MainLayout } from "../layouts/MainLayout";
import { TableV1 } from "../components/TableV1";
interface LastCollection {
  _id: string;
  name: string;
}

export const RegisterView = () => {
  const { id } = useParams();
  const cropId = id;
  const { backendApiCall } = useContext(ApiContext);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cropStatus, setCropStatus] = useState(null);
  const [lastCollection, setLastCollection] = useState<LastCollection | null>(null);
  const [eto, setEto] = useState<number>(0);
  const [etc, setEtc] = useState<number>(0);
  const { data, loading, setRefetch } = UseGet({
    endpoint: `v1/collection-record/paginated?page=${currentPage}&limit=${rowsPerPage}&collection_id=${lastCollection?._id}`,
  });
  const [cropData, setCropData] = useState({} as Crop);
  const [formData, setFormData] = useState({
    nameCollection: "",
    cropName: "",
    initialCollectionDate: "",
    selectedDate: new Date(), // Estado para almacenar la fecha seleccionada
    latitude: "",
    longitude: "",
    currentStage: "",
  });
  const handleDateChange = (date: Date) => {
    setFormData({
      ...formData,
      selectedDate: date,
    });
  };

  useEffect(() => {
    console.log("CropId: ", cropId);
    async function loadCropstatus() {
      if (cropId) {
        try {
          const cropStatus = await getCropStatus(backendApiCall, cropId);
          setCropStatus(cropStatus.data.status);
          if (cropStatus) {
            //console.log("Estado del crop: ", cropStatus.data.status);
            setCropStatus(cropStatus.data.status);
            setLastCollection(cropStatus.data);
          }
        } catch (error) {
          console.log("Error getting crop status:", error);
        }
      }
    }
    loadCropstatus();
    console.log("CropStatus Mira: ", cropStatus);
  }, [backendApiCall, cropId, cropStatus]);

  const handleRegisterButton = () => {
    if (cropStatus == "in_progress") {
      if (lastCollection) {
        console.log("Latest collection: ", lastCollection);
      }
    }
  };

  useEffect(() => {
    handleRegisterButton();
  }, [backendApiCall, cropId, cropStatus]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCropDetails(backendApiCall, cropId as string);
      if (response.status === "success" && response.data !== undefined) {
        setCropData(response.data);
      }

      // Obtener los valores de ET0 y ETc del clima
      const params = {
        latitude: 2.9273,
        longitude: -75.2819,
        hourly: ["evapotranspiration", "et0_fao_evapotranspiration"],
        timezone: "auto",
        forecast_days: 1,
      };
      const url = "https://api.open-meteo.com/v1/forecast";
      const weatherResponse = await fetchWeatherApi(url, params);
      const weatherData = weatherResponse[0].hourly()!;
      const et0Array = weatherData.variables(1)!.valuesArray()!;
      const etcArray = weatherData.variables(0)!.valuesArray()!;

      // Calcular la suma de los valores de ET0 y ETc
      const et0Sum = et0Array.reduce((acc, value) => acc + Number(value), 0);
      const etcSum = etcArray.reduce((acc, value) => acc + Number(value), 0);

      // Calcular el promedio de ET0 y ETc
      //const et0Average = et0Sum / et0Array.length;
      //const etcAverage = etcSum / etcArray.length;

      // Redondear los promedios a dos decimales
      //const roundedEt0Average = et0Average.toFixed(2);
      //const roundedEtcAverage = etcAverage.toFixed(2);

      // Actualizar el estado de formData con los valores de ET0 y ETc
      const eto = et0Sum.toFixed(2); // Promedio de ET0
      const etc = etcSum.toFixed(2); // Promedio de ETc

      setEto(parseFloat(eto));
      setEtc(parseFloat(etc));
    };
    fetchData();
  }, [backendApiCall, cropId]);

  const [showFormModal, setShowFormModal] = useState<boolean>(false);

  const handleShowFormModal = () => {
    setShowFormModal(true);
  };

  const handleFormModalClose = () => {
    setShowFormModal(false);
  };

  const handleDelete = () => {};

  const handleEdit = () => {};

  return (
    <MainLayout>
      <FormContainer>
        <SignBoard $custom2>Registros del cultivo {cropData.name}</SignBoard>
        <Description className="customDescription">
          Nota: Siendo administrador puedes ver los registros hechos por los usuarios encargados que
          has asignado a este cultivo. Incluso puedes hacer uno tu.
        </Description>
        {!loading && data.collectionRecord.length > 0 && (
          <TableV1
            evencolor="#FFFFFF"
            oddcolor="rgb(6, 182, 212, 0.2)"
            data={data.collectionRecord}
            pagination={{
              rowsPerPage,
              setRowsPerPage,
              currentPage,
              setCurrentPage,
              setRefetch,
              totalPages: data.meta.total_pages,
            }}
            columns={["ID", "Nombre", "Fecha", "Acciones"]}
            columnMapping={{
              Nombre: "name",
              Fecha: "createdAt",
            }}
            options={{ edit: handleEdit, delete: handleDelete }}
          />
        )}
        <ButtonContainer style={{ alignItems: "center" }}>
          <div style={{ maxHeight: "20px" }}>
            <Calendar selected={formData.selectedDate} onChange={handleDateChange} />
          </div>
          <Button style={{ margin: "0" }} onClick={handleShowFormModal} $custom1>
            Hacer un registro
          </Button>
        </ButtonContainer>
      </FormContainer>
      {showFormModal && (
        <AddRegistry
          collectionId={lastCollection?._id as string}
          cropname={cropData.name}
          eto={eto}
          currentGrowth={1.75}
          etc={etc}
          onClose={handleFormModalClose}
        />
      )}
    </MainLayout>
  );
};
