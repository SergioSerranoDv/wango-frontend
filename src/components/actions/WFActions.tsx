import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { WaterFootprintI } from "../../interfaces/WaterFootprint";
import { generatePDF } from "../../utils/pdf-report";
import { Add, Download, MoreVert } from "@mui/icons-material";
import { Menu, Tooltip, IconButton, MenuItem, Typography } from "@mui/material";

interface WFActionsProps {
  WFDetails: WaterFootprintI;
}

export const WFActions: React.FC<WFActionsProps> = ({ WFDetails }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const elRef = useRef<HTMLButtonElement>(null);

  const menuItems = [
    {
      action: () => navigate(`/dashboard/collections/records/${WFDetails.collectionData?._id}`),
      icon: <Add fontSize="small" />,
      name: "Ver registros",
    },
    {
      action: () => generatePDF(WFDetails),
      icon: <Download fontSize="small" />,
      name: "Generar reporte",
    },
  ];

  return (
    <>
      <Tooltip title="Opciones" placement="top">
        <IconButton ref={elRef} onClick={() => setIsMenuOpen(true)}>
          <MoreVert />
        </IconButton>
      </Tooltip>

      <Menu open={isMenuOpen} anchorEl={elRef.current} onClose={() => setIsMenuOpen(false)}>
        {menuItems.map((item, index) => (
          <MenuItem
            color="#4c443f"
            key={index}
            onClick={() => {
              setIsMenuOpen(false);
              item.action();
            }}
          >
            <span style={{ marginRight: "4px" }}>{item.icon}</span>
            <Typography fontSize={12}>{item.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
