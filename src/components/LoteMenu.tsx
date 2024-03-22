import React from "react";
import { Link } from "react-router-dom";
import { MainWrapper, ContentArea, Menu, ItemsMenu, Item, Text } from "../styles/LoteMenuStyles";

import VerCultvos from "../assets/icons/viewCrops.svg";
import AñadirCultivo from "../assets/icons/addCrop.svg";
import HuellaHidrica from "../assets/icons/waterFootprint.svg";
import AnalisisIA from "../assets/icons/analysisAI.svg";
import EditarLote from "../assets/icons/editBatch.svg";
import VerUsuarios from "../assets/icons/viewUsers.svg";

interface TextoItem {
  src: string;
  text: string;
  link: string;
}

const LoteMenu: React.FC = () => {
  const MenuItems: TextoItem[] = [
    {
      src: VerCultvos,
      text: "Ver cultivos del lote",
      link: "/verCultivos",
    },
    {
      src: AñadirCultivo,
      text: "Añadir nuevo cultivo al lote",
      link: "/addCultivo",
    },
    {
      src: HuellaHidrica,
      text: "Calcular huella hídrica",
      link: "/huellaHidrica",
    },
    {
      src: AnalisisIA,
      text: "Análisis IA",
      link: "/analisisIA",
    },
    {
      src: EditarLote,
      text: "Editar lote",
      link: "/editLote",
    },
    {
      src: VerUsuarios,
      text: "Ver usuarios encargados",
      link: "/verUsers",
    },
  ];

  return (
    <MainWrapper>
      <ContentArea>
        <Text>Lote: MisPruebas01</Text>
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

export default LoteMenu;
