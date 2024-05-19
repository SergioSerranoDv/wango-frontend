import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { Menu, ItemsMenu, Item, Text, Description } from "../styles/HomeStyles";

import { MainLayout } from "../layouts/MainLayout";

import MisLotes from "../assets/icons/myBatches.svg";
import MiPerfil from "../assets/icons/myProfile.svg";
// import CrearTrabajador from "../assets/icons/createWorkerUser.svg";
// import VerTrabajador from "../assets/icons/viewMyWorkers.svg";
// import CerrarSesion from "../assets/icons/logoutIcon.svg";

interface LinkElementProps {
  src: string;
  text: string;
  link: string;
  alt?: string;
}

const LinkElement: React.FC<LinkElementProps> = ({ src, text, link }) => (
  <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
    <ItemsMenu>
      <Item src={src} alt={text} />
      <Text>{text}</Text>
    </ItemsMenu>
  </Link>
);

const MainMenu: React.FC = () => {
  const { userData } = useContext(AppContext);

  const menuItems = [
    { id: 1, src: MisLotes, text: "Mis lotes", link: "/lots-manage" },
    { id: 2, src: MiPerfil, text: "Mi perfil", link: "/my-profile" },
  ];

  return (
    <>
      <MainLayout>
        <Text>¡Bienvenido {userData.name}!</Text>
        <Description>
          Wango es un software diseñado para el cultivo del mango colombiano, específicamente de la
          variedad "Tommy Atkins". Esta herramienta es esencial para cuantificar la huella hídrica
          en todas sus dimensiones y sugerir estrategias para su reducción. Al combinar tecnología y
          agricultura, Wango promueve un enfoque integral que preserva los recursos y maximiza la
          producción del mango.
        </Description>
        <Menu>
          {menuItems.map(({ id, src, text, link }) => (
            <LinkElement key={id} src={src} text={text} link={link} />
          ))}
        </Menu>
      </MainLayout>
    </>
  );
};

export default MainMenu;
