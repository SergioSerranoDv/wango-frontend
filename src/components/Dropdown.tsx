import React from "react";
import { DropdownContainer } from "../styles/components/DropdownStyles";

interface DropdownProps {
  children: React.ReactNode;
}
export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  return <DropdownContainer>{children}</DropdownContainer>;
};
