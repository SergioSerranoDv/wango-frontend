import React from "react";
import { Link } from "react-router-dom";
import { MainWrapper, ContentArea, Menu, ItemsMenu, Item, Text } from "../styles/MainMenuStyles";

import MisLotes from "../assets/icons/misLotes.svg";
import MiPerfil from "../assets/icons/miPerfil.svg";
import CrearTrabajador from "../assets/icons/crearUsuarioTrabajador.svg";
import VerTrabajador from "../assets/icons/verMisTrabajadores.svg";
import CerrarSesion from "../assets/icons/cerrarSesion.svg";

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
      link: "/myLotes",
    },
    {
      src: MiPerfil,
      text: "Mi perfil",
      link: "/myProfile",
    },
    {
      src: CrearTrabajador,
      text: "Crear un usuario trabajador",
      link: "/crearTrabajador",
    },
    {
      src: VerTrabajador,
      text: "Ver mis trabajadores",
      link: "/verTrabajador",
    },
    {
      src: CerrarSesion,
      text: "Cerrar sesión",
      link: "/logout",
    },
  ];

  return (
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
