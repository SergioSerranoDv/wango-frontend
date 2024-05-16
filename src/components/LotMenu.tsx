import React from "react";
import { Link } from "react-router-dom";
import { useGetById } from "../hooks/useGetById";
import VerCultvos from "../assets/icons/viewCrops.svg";
import AñadirCultivo from "../assets/icons/addCrop.svg";
import HuellaHidrica from "../assets/icons/waterFootprint.svg";
import AnalisisIA from "../assets/icons/analysisAI.svg";
import EditarLote from "../assets/icons/editBatch.svg";
import VerUsuarios from "../assets/icons/viewUsers.svg";
import { MainWrapper, ContentArea, Menu, ItemsMenu, Item, Text } from "../styles/LoteMenuStyles";

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
interface Props {
  lotId?: string;
}

function LoteMenu({ lotId = "" }: Props) {
  const { data } = useGetById({
    endpoint: `v1/lot/info/${lotId}`,
  });
  const MenuItems: MenuProps[] = [
    {
      id: 1,
      elementList: (
        <LinkElement
          src={VerCultvos}
          text="Ver cultivos del lote"
          link={`/lot-menu/crops/${lotId}`}
        />
      ),
    },
    {
      id: 2,
      elementList: (
        <LinkElement
          src={AñadirCultivo}
          text="Añadir nuevo cultivo al lote"
          link={`/lot-menu/new-crop/${lotId}`}
        />
      ),
    },
    {
      id: 3,
      elementList: (
        <LinkElement
          src={HuellaHidrica}
          text="Calcular huella hídrica"
          link={`/lot-menu/water-footprint/${lotId}`}
        />
      ),
    },
    /*{
      id: 4,
      elementList: <LinkElement src={AnalisisIA} text="Análisis IA" link="/analisisIA" />,
    },*/
    {
      id: 5,
      elementList: <LinkElement src={EditarLote} text="Editar lote" link={`/edit-lote/${lotId}`} />,
    },
    /*{
      id: 6,
      elementList: (
        <LinkElement src={VerUsuarios} text="Ver usuarios encargados" link="/verUsers" />
      ),
    },*/
  ];

  return (
    <ContentArea>
      <Text>Lote: {data && data.name}</Text>
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
  );
}

const LinkElement: React.FC<LinkElementProps> = ({ src, text, link }) => (
  <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
    <ItemsMenu>
      <Item src={src} alt={text} />
    </ItemsMenu>
    <Text>{text}</Text>
  </Link>
);

export default LoteMenu;
