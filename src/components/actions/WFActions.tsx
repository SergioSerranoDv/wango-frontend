import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "../../icons/Add";
import { MoreOptions } from "../../icons/MoreOptions";
import { WaterFootprintI } from "../../interfaces/WaterFootprint";
import { Item } from "../../styles/components/Actions";
import { Dropdown } from "../Dropdown";

interface WFActionsProps {
  WFDetails: WaterFootprintI;
}

export const WFActions: React.FC<WFActionsProps> = ({ WFDetails }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const actions = [
    {
      action: () => navigate(`/dashboard/collections/records/${WFDetails.collectionData?._id}`),
      icon: <AddIcon />,
      name: "Ver registros",
    },
  ];

  return (
    <>
      <MoreOptions
        style={{ pointerEvents: isDropdownOpen ? "none" : "auto" }}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
      {isDropdownOpen && (
        <Dropdown closeDropdown={() => setIsDropdownOpen(false)}>
          {actions.map((action) => (
            <Item
              key={action.name}
              onClick={() => {
                action.action();
                setIsDropdownOpen(false);
              }}
            >
              <span style={{ marginRight: "8px" }}>{action.icon}</span>
              <div>{action.name}</div>
            </Item>
          ))}
        </Dropdown>
      )}
    </>
  );
};
