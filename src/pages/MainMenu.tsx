import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

import { MainWrapper, ContentArea, Menu, ItemsMenu, Item, Text } from "../styles/MainMenuStyles";
import Navbar from "../components/Navbar";

import MisLotes from "../assets/icons/myBatches.svg";
import MiPerfil from "../assets/icons/myProfile.svg";
import CrearTrabajador from "../assets/icons/createWorkerUser.svg";
import VerTrabajador from "../assets/icons/viewMyWorkers.svg";
import CerrarSesion from "../assets/icons/logoutIcon.svg";
import { useAuth0 } from "@auth0/auth0-react";

interface MenuProps {
  id: number;
  elementList: JSX.Element;
}
interface LinkElementProps {
  src: string;
  text: string;
  link: string;
  alt?: string;
}
const MainMenu: React.FC = () => {
  const { userData } = useContext(AppContext);
  const { logout } = useAuth0();
  const MenuItems: MenuProps[] = [
    {
      id: 1,
      elementList: <LinkElement src={MisLotes} text="Mis lotes" link="/lots-manage" />,
    },
    {
      id: 2,
      elementList: <LinkElement src={MiPerfil} text="Mi perfil" link="/my-profile" />,
    },
    {
      id: 3,
      elementList: (
        <LinkElement
          src={CrearTrabajador}
          text="Crear un usuario trabajador"
          link="/crear-trabajador"
        />
      ),
    },
    {
      id: 4,
      elementList: (
        <LinkElement src={VerTrabajador} text="Ver mis trabajadores" link="/ver-trabajadores" />
      ),
    },
    {
      id: 5,
      elementList: (
        <button
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
          onClick={() => logout()}
        >
          <Item src={CerrarSesion} alt="Cerrar Sesion" />
          <Text>Cerrar sesión</Text>
        </button>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <MainWrapper>
        <ContentArea>
          <Text>¡Bienvenido {userData.name}!</Text>
          <Menu>
            {MenuItems.map((item, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={index}
              >
                {item.elementList}
              </div>
            ))}
          </Menu>
        </ContentArea>
      </MainWrapper>
    </>
  );
};

const LinkElement: React.FC<LinkElementProps> = ({ src, text, link }) => (
  <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
    <ItemsMenu>
      <Item src={src} alt={text} />
    </ItemsMenu>
    <Text>{text}</Text>
  </Link>
);

export default MainMenu;
