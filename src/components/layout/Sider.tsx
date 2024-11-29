import React from "react";
import fertilizer from "../../assets/icons/fertilizer.svg";
import lot from "../../assets/icons/lot.svg";
import water from "../../assets/icons/water.svg";
import { Menu } from "../menu/index.d";
import { Dashboard } from "@mui/icons-material";

interface SiderProps {
  isOpen: boolean;
}

export const Sider: React.FC<SiderProps> = ({ isOpen }) => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: <Dashboard fontSize="small" />,
      link: "/",
    },
    {
      title: "Lotes",
      icon: <img src={lot} width={20} height={20} alt="Lots" />,
      link: "/dashboard/lots",
    },
    {
      title: "Huella hidrica",
      icon: <img src={water} width={20} height={20} alt="Water footprint" />,
      link: "/dashboard/water-footprint",
    },
    {
      title: "Productos",
      icon: <img src={fertilizer} width={20} height={20} alt="Products" />,
      link: "/dashboard/products",
    },
  ];

  return <Menu items={menuItems} open={isOpen} />;
};
