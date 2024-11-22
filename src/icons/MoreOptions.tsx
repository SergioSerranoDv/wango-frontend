import React from "react";
import { Options } from "../styles/GlobalStyles";

interface Props {
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  style?: React.CSSProperties;
}

export const MoreOptions: React.FC<Props> = ({ isDropdownOpen, setIsDropdownOpen, style }) => {
  return (
    <Options onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={style}>
      <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
          fillRule="evenodd"
        />
      </svg>
    </Options>
  );
};
