import React, { useRef, useState } from "react";
import { Edit } from "../../icons/Actions";
import { Record } from "../../interfaces/record";
import { RecordFormEdit } from "../forms/RecordFormEdit";
import { Modal } from "../modals/Modal";
import { MoreVert } from "@mui/icons-material";
import { Menu, Typography, Tooltip, IconButton, MenuItem } from "@mui/material";

interface Props {
  collectionId: string;
  crop: {
    name: string;
    latitude: number;
    longitude: number;
  };
  currentGrowth: number;
  record: Record;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
}

export const CollectionRecordActions: React.FC<Props> = ({
  collectionId,
  currentGrowth,
  crop,
  record,
  setRefetch,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const elRef = useRef<HTMLButtonElement>(null);

  const menuItems = [
    {
      action: () => setIsEditModalOpen(true),
      icon: <Edit />,
      name: "Editar registro",
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

      {isEditModalOpen && (
        <Modal title="Editar registro" closeModal={() => setIsEditModalOpen(false)}>
          <RecordFormEdit
            collectionId={collectionId}
            crop={crop}
            currentGrowth={currentGrowth}
            record={record}
            onClose={() => setIsEditModalOpen(false)}
            setRefetch={setRefetch}
          />
        </Modal>
      )}
    </>
  );
};
