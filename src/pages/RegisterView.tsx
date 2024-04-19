import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Calendar } from "../components/modals/Calendar";
import { AddRegistry } from "../components/modals/FormModal";
import { NotificationModal } from "../components/modals/NotificationModal";
import { useParams } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import { Crop } from "../interfaces/crop";
import { fetchCropDetails } from "../services/crop_s";
import { createNewCollection } from "../services/collection_s";
import { NotificationDataInit, NotificationI } from "../interfaces/notification";
import { fetchWeatherApi } from "openmeteo";
import {
  Button,
  ButtonSubmit,
  Description,
  DetailsItem,
  DetailsSign,
  Form,
  InfoContainer,
  Input,
  Label,
  Select,
  FormContainer,
  SignBoard,
} from "../styles/FormStyles";
import { Container, Table, TableRow, TableCell, TableRow2 } from "../styles/LotsTableStyles";
import { MainLayout } from "../layouts/MainLayout";

export const RegisterView = () => {
  const { id } = useParams();
  const cropId = id;
  const { userData } = useContext(AppContext);
  const { backendApiCall } = useContext(ApiContext);
  const [refetch, setRefetch] = useState<number>(0);
  const [cropData, setCropData] = useState({} as Crop);
  const [formData, setFormData] = useState({
    nameCollection: "",
    cropName: "",
    initialCollectionDate: "",
    selectedDate: new Date(), // Estado para almacenar la fecha seleccionada
    latitude: "",
    longitude: "",
    eto: "", // Agrega la propiedad eto para ET0
    currentStage: "",
    etc: "", // Agrega la propiedad etc para ETc
  });
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationDetails, setNotificationDetails] =
    useState<NotificationI>(NotificationDataInit);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleDateChange = (date: Date) => {
    setFormData({
      ...formData,
      selectedDate: date, // Actualiza el estado con la nueva fecha seleccionada
    });
  };

  const handleNotification = (
    title: string,
    description: string,
    status: string,
    redirectUrl: string
  ) => {
    setNotificationDetails({ title, description, status, redirectUrl });
    setShowNotification(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!cropId) {
        handleNotification("Error", "No se ha encontrado el ID del cultivo", "error", "");
        return;
      }
      const response: any = await createNewCollection(backendApiCall, {
        crop_id: cropId as string,
        final_date: formData.selectedDate,
        name: formData.nameCollection,
        status: "in_progress",
        user: userData.user,
      });
      if (response.status === "success") {
        setRefetch((prev) => prev + 1);
        setShowNotification(true);
        setNotificationDetails({
          title: "Estás cambiando un parámetro",
          description:
            "Si cambias la etapa de crecimiento en la que <br />  está el día, los registros de este también lo <br /> harán.",
          status: "error",
          redirectUrl: "",
        });
        return;
      }
      throw new Error("Server responded with status other than success.");
    } catch (error) {
      console.error(error);
    }
  };

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
      setFormData((prevState) => ({
        ...prevState,
        eto: et0Sum.toFixed(2), // Promedio de ET0
        etc: etcSum.toFixed(2), // Promedio de ETc
      }));
    };
    fetchData();
  }, [backendApiCall, cropId, refetch]);

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  const [showFormModal, setShowFormModal] = useState<boolean>(false);

  const handleShowFormModal = () => {
    setShowFormModal(true);
  };

  const handleFormModalClose = () => {
    setShowFormModal(false);
  };

  return (
    <MainLayout>
      <FormContainer>
        <SignBoard $custom2>Registros del día hechos en el cultivo {cropData.name}</SignBoard>
        <InfoContainer>
          <DetailsSign>
            Fecha de inicio de recolección: <DetailsItem>Proximamente</DetailsItem>
          </DetailsSign>
        </InfoContainer>
        <Description className="customDescription">
          Nota: Siendo administrador puedes ver los registros hechos por los usuarios encargados que
          has asignado a este cultivo. Incluso puedes hacer uno tu.
        </Description>
        <Calendar selected={formData.selectedDate} onChange={handleDateChange} />
        <SignBoard $custom2>Parámetros del día para el cultivo</SignBoard>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="nameCollection">Nombre de la recolección</Label>
          <Input
            type="text"
            id="nameCollection"
            name="nameCollection"
            value={formData.nameCollection}
            onChange={handleChange}
            required
          />
          <Label htmlFor="eto">Evapotranspiración de referencia (ETo)</Label>
          <Input
            type="number"
            id="eto"
            name="eto"
            value={formData.eto} // Mostrar el valor de ET0
            onChange={handleChange}
            required
            disabled
          />

          <Label htmlFor="currentStage">Etapa actual de crecimiento</Label>
          <Input
            type="text"
            id="currentStage"
            name="currentStage"
            defaultValue="Frutificación (Kc = 1.75)"
            required
            disabled
          >
            {/* Está por default, pero el orden correcto es como está abajo */
            /* <option value="0.9">Crecimiento vegetativo (Kc = 0.9)</option>
            <option value="1.35">Floración (Kc = 1.35)</option>
            <option value="1.75">Frutificación (Kc = 1.75)</option>
            <option value="1.5">Promedio (Kc = 1.5)</option> */}
          </Input>

          <Label htmlFor="etc">Evapotranspiración real del cultivo (ETc)</Label>
          <Input
            type="number"
            id="etc"
            name="etc"
            value={formData.etc} // Mostrar el valor de ETc
            onChange={handleChange}
            required
            disabled
          />

          <ButtonSubmit type="submit" $custom1>
            Guardar cambios
          </ButtonSubmit>

          <Button onClick={handleShowFormModal} $custom1>
            Hacer un registro
          </Button>

          <SignBoard $custom3>Registros de datos hechos hoy</SignBoard>
          <Container>
            <Table $custom1>
              <thead>
                <TableRow index={-1}>
                  <TableCell $custom>ID</TableCell>
                  <TableCell $custom>Nombres</TableCell>
                  <TableCell $custom>Acciones</TableCell>
                </TableRow>
              </thead>
              <tbody>
                <TableRow2 index={1}>
                  <TableCell $custom1>1</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <a href="#">Edi </a>
                    <a href="#"> Eli </a>
                  </TableCell>
                </TableRow2>
                <TableRow2 index={2}>
                  <TableCell $custom1>2</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <a href="#">Edi </a>
                    <a href="#"> Eli </a>
                  </TableCell>
                </TableRow2>
                <TableRow2 index={3}>
                  <TableCell $custom1>3</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <a href="#">Edi </a>
                    <a href="#"> Eli </a>
                  </TableCell>
                </TableRow2>
              </tbody>
            </Table>
          </Container>
        </Form>
      </FormContainer>
      {showFormModal && (
        <AddRegistry
          cropname={cropData.name}
          initialCollectionDate={formData.selectedDate}
          selectedDate={formData.selectedDate}
          eto={parseFloat(formData.eto)}
          currentGrowth="Frutificación (Kc = 1.75)"
          etc={parseFloat(formData.etc)}
          onClose={handleFormModalClose}
        />
      )}
      {showNotification && (
        <NotificationModal
          title={notificationDetails.title}
          description={notificationDetails.description}
          status={notificationDetails.status}
          buttonText="Aceptar"
          onClose={handleNotificationClose}
          redirectUrl={notificationDetails.redirectUrl}
        />
      )}
    </MainLayout>
  );
};
