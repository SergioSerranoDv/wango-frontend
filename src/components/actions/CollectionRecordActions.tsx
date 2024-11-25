import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import { Edit } from "../../icons/Actions";
import { MoreVert } from "@mui/icons-material";
import { Menu, Typography, Tooltip, IconButton, MenuItem } from "@mui/material";

export const CollectionRecordActions = () => {
  const { backendApiCall } = useContext(ApiContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const elRef = useRef<HTMLButtonElement>(null);

  const menuItems = [
    {
      action: () => setIsEditModalOpen(true),
      icon: <Edit />,
      name: "Editar registro",
    },

    // {
    //   action: () => setIsDeleteModalOpen(true),
    //   icon: <DeleteIcon />,
    //   name: "Eliminar recolección",
    // },
  ];
  return (
    <div>
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
    </div>
  );
};
