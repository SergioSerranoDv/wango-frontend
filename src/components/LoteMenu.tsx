import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { MainWrapper, ContentArea, Menu, ItemsMenu, Item, Text } from "../styles/LoteMenuStyles";

import VerCultvos from "../assets/icons/verCultivos.svg";
import AñadirCultivo from "../assets/icons/añadirCultivo.svg";
import HuellaHidrica from "../assets/icons/huellHidrica.svg";
import AnalisisIA from "../assets/icons/analisisIA.svg";
import EditarLote from "../assets/icons/editLote.svg";
import VerUsuarios from "../assets/icons/verUsuarios.svg";

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
  const MenuItems: MenuProps[] = [
    {
      id: 1,
      elementList: (
        <LinkElement src={VerCultvos} text="Ver cultivos del lote" link="/verCultivos" />
      ),
    },
    {
      id: 2,
      elementList: (
        <LinkElement src={AñadirCultivo} text="Añadir nuevo cultivo al lote" link="/addCultivo" />
      ),
    },
    {
      id: 3,
      elementList: (
        <LinkElement src={HuellaHidrica} text="Calcular huella hídrica" link="/huellaHidrica" />
      ),
    },
    {
      id: 4,
      elementList: <LinkElement src={AnalisisIA} text="Análisis IA" link="/analisisIA" />,
    },
    {
      id: 5,
      elementList: <LinkElement src={EditarLote} text="Editar lote" link="/editLote" />,
    },
    {
      id: 6,
      elementList: (
        <LinkElement src={VerUsuarios} text="Ver usuarios encargados" link="/verUsers" />
      ),
    },
  ];

  return (
    <>
      <MainWrapper>
        <ContentArea>
          <Text>Lote: {userData.name}</Text>
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
