import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import { Edit } from "../../icons/Actions";
import { MoreOptions } from "../../icons/MoreOptions";
import { Dropdown } from "../Dropdown";

export const CollectionRecordActions = () => {
  const { backendApiCall } = useContext(ApiContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const actions = [
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
      <MoreOptions
        style={{ pointerEvents: isDropdownOpen ? "none" : "auto" }}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />

      {isDropdownOpen && (
        <Dropdown closeDropdown={() => setIsDropdownOpen(false)} items={actions} />
      )}
    </div>
  );
};
