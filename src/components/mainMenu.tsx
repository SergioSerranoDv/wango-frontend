import React from "react";
import { Link } from "react-router-dom";
import {
  MainWrapper,
  TopBar,
  BurguerMenuNav,
  WangoLogoTiny,
  ContentArea,
  Menu,
  ItemsMenu,
  Item,
  Text,
} from "../styles/components/mainMenu";

import MisLotes from "../assets/mis_lotes.svg";
import MiPerfil from "../assets/mi_perfil.svg";
import CrearTrabajador from "../assets/crear_usuario_trabajador.svg";
import VerTrabajador from "../assets/ver_mis_trabajadores.svg";
import CerrarSesion from "../assets/cerrar_sesion.svg";
import BurguerMenu from "../assets/burguer_menu.svg";
import WangoTiny from "../assets/wango_tiny.svg";

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
      link: "/mis-lotes",
    },
    {
      src: MiPerfil,
      text: "Mi perfil",
      link: "/mi-perfil",
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
    <MainWrapper>
      <TopBar>
        <BurguerMenuNav src={BurguerMenu} alt="MenuHamburguesa" />
        <WangoLogoTiny src={WangoTiny} alt="Wango Tiny" />
      </TopBar>
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
