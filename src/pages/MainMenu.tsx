import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { TopCard } from "../sections/analytics/TopCard";
import farm from "../assets/icons/farm.svg";
import crop from "../assets/icons/crop.svg";
import performance from "../assets/icons/performance.svg";
import { ItemsMenu, Item, Text } from "../styles/MainMenuStyles";
import MisLotes from "../assets/icons/myBatches.svg";
import MiPerfil from "../assets/icons/myProfile.svg";
import CerrarSesion from "../assets/icons/logoutIcon.svg";
import { MainLayout } from "../layouts/MainLayout";
import { useAuth0 } from "@auth0/auth0-react";
import { WaterFootprintPieChart } from "../sections/analytics/WaterFootprintPieChart";

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
  {
    /* <Menu>
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
          </Menu> */
  }
  const data = {
    blue_component: 97986.86,
    green_component: 292803,
    grey_component: 40965.21,
  };

  return (
    <MainLayout>
      {/* <Text>¡Bienvenido {userData.name}!</Text> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          width: "100%",
          marginBottom: "2rem",
        }}
      >
        <TopCard
          background="#FFB032"
          description="Lotes de este mes"
          icon={farm}
          endpoint="v1/user/analytics/lots/quantity/by-month"
        />
        <TopCard
          background="#4CAF50"
          description="Cultivos de este mes"
          icon={crop}
          endpoint="v1/user/analytics/crops/quantity/by-month"
        />
        <TopCard
          background="#6C4E31"
          description="Producción de este mes"
          icon={performance}
          endpoint="v1/user/analytics/collections/daily-performance/quantity/by-month"
        />
      </div>
      <WaterFootprintPieChart data={data} />
    </MainLayout>
  );
};

export default MainMenu;
