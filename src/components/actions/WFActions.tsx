import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Add } from "../../icons/Actions";
import { MoreOptions } from "../../icons/MoreOptions";
import { WaterFootprintI } from "../../interfaces/WaterFootprint";
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
      icon: <Add />,
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
        <Dropdown closeDropdown={() => setIsDropdownOpen(false)} items={actions} />
      )}
    </>
  );
};
