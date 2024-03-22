import React from "react";
import { Link } from "react-router-dom";
import { MainWrapper, ContentArea, Menu, ItemsMenu, Item, Text } from "../styles/MainMenuStyles";
import Navbar from "../components/Navbar";

import MisLotes from "../assets/icons/myBatches.svg";
import MiPerfil from "../assets/icons/myProfile.svg";
import CrearTrabajador from "../assets/icons/createWorkerUser.svg";
import VerTrabajador from "../assets/icons/viewMyWorkers.svg";
import CerrarSesion from "../assets/icons/logout.svg";

interface TextoItem {
  src: string;
  text: string;
  link: string;
}

const MainMenu: React.FC = () => {
  const MenuItems: TextoItem[] = [
    {
      src: MisLotes,
      text: "Mis lotes",
      link: "/BatchManage",
    },
    {
      src: MiPerfil,
      text: "Mi perfil",
      link: "/MyProfile",
    },
    {
      src: CrearTrabajador,
      text: "Crear un usuario trabajador",
      link: "/crear-trabajador",
    },
    {
      src: VerTrabajador,
      text: "Ver mis trabajadores",
      link: "/ver-trabajadores",
    },
    {
      src: CerrarSesion,
      text: "Cerrar sesión",
      link: "/cerrar-sesion",
    },
  ];

  return (
    <>
      <Navbar />
      <MainWrapper>
        <ContentArea>
          <Text>¡Bienvenido Carlos Mario!</Text>
          <Menu>
            {MenuItems.map((item, index) => (
              <IconText key={index} src={item.src} text={item.text} link={item.link} />
            ))}
          </Menu>
        </ContentArea>
      </MainWrapper>
    </>
  );
};

const IconText: React.FC<TextoItem> = ({ src, text, link }) => (
  <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
    <ItemsMenu>
      <Item src={src} alt={text} />
    </ItemsMenu>
    <Text>{text}</Text>
  </Link>
);

export default MainMenu;
