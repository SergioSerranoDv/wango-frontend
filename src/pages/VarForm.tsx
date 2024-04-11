import React, { useContext, useState, useEffect } from "react";
import NotificationModal from "../components/modals/NotificationModal";
import checkLogo from "../assets/icons/checkLogo.svg";
import errorLogo from "../assets/icons/errorLogo.svg";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ApiContext } from "../context/ApiContext";
import Navbar from "../components/Navbar";

import {
  ButtonContainer,
  Button,
  Form,
  FormField,
  Input,
  Label,
  FormContainer,
  SignBoard,
  Description,
} from "../styles/FormStyles";

const VarForm: React.FC = () => {
  const { backendApiCall } = useContext(ApiContext);
  const { userData, setRefetchData } = useContext(AppContext);
  const [editedData, setEditedData] = useState(userData);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationDetails, setNotificationDetails] = useState({
    title: "",
    description: "",
    imageUrl: "",
    redirectUrl: "",
  });

  useEffect(() => {
    setEditedData(userData);
  }, [userData]);

  const handleNotification = (
    title: string,
    description: string,
    imageUrl: string,
    redirectUrl: string
  ) => {
    setNotificationDetails({ title, description, imageUrl, redirectUrl });
    setShowNotification(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulario enviado:", editedData);
    const evf = editedData.environment_variables.fraction;
    if (evf <= 0) {
      handleNotification(
        "Error",
        "La fracción de lixiviación-escorrentia superficial <br /> debe ser mayor a 0",
        errorLogo,
        ""
      );
      return;
    }
    const cmax = editedData.environment_variables.maximum_quantity;
    if (cmax <= 0) {
      handleNotification(
        "Error",
        "La cantidad máxima permitida <br /> debe ser mayor a 0",
        errorLogo,
        ""
      );
      return;
    }

    const cnat = editedData.environment_variables.natural_amount_chemical;
    if (cnat <= 0) {
      handleNotification(
        "Error",
        "La cantidad natural del químico <br /> debe ser mayor a 0",
        errorLogo,
        ""
      );
      return;
    }

    const response = await backendApiCall({
      method: "PUT",
      endpoint: "v1/user/info/update",
      body: editedData,
    });
    if (response.status === "error") {
      console.error(response.message);
      return;
    }
    setShowNotification(true);
    setRefetchData((prevData) => prevData + 1);
    setNotificationDetails({
      title: "Valores cambiados exitosamente",
      description: "¡Excelente! Podrás ver los cambios en la sección de <br /> la configuración.",
      imageUrl: checkLogo,
      redirectUrl: "/",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      environment_variables: {
        ...prevData.environment_variables,
        [name]: value,
      },
    }));
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <>
      <Navbar />
      <FormContainer>
        <SignBoard $custom2>Configuración del sistema</SignBoard>
        <Description>
          Nota: Estas variables se obtuvieron como resultado de estudios que sugerían lo números,
          puedes cambiar los valores, y el resto de acciones a partir de la alteración se realizarán
          con ellos.
        </Description>
        <Form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="fraction">Fracción (α)*</Label>
            <Input
              $custom
              id="fraction"
              type="number"
              name="fraction"
              required
              value={editedData.environment_variables.fraction}
              onChange={handleChange}
            />
          </FormField>
          <FormField>
            <Label htmlFor="maximumQuantity">Cant. Máxima permitida (Cmax) (mg/L)*</Label>
            <Input
              $custom
              id="maximumQuantity"
              type="number"
              name="maximum_quantity"
              required
              value={editedData.environment_variables.maximum_quantity}
              onChange={handleChange}
            />
          </FormField>
          <FormField>
            <Label htmlFor="naturalAmountChemical">Cant. natural del químico (Cnat) (mg/L)*</Label>
            <Input
              $custom
              id="naturalAmountChemical"
              type="number"
              name="natural_amount_chemical"
              required
              value={editedData.environment_variables.natural_amount_chemical}
              onChange={handleChange}
            />
          </FormField>
          <ButtonContainer>
            <Button type="submit" color="green">
              Guardar
            </Button>
            <Button type="button" color="red">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Cancelar
              </Link>
            </Button>
          </ButtonContainer>
        </Form>
        {showNotification && (
          <NotificationModal
            title={notificationDetails.title}
            description={notificationDetails.description}
            imageUrl={notificationDetails.imageUrl}
            buttonText="Aceptar"
            onClose={handleNotificationClose}
            redirectUrl={notificationDetails.redirectUrl}
          />
        )}
      </FormContainer>
    </>
  );
};

export default VarForm;
