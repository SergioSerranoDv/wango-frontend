import React, { useState } from "react";
import { DropdownButton, DropdownContent, DropdownItem } from "../styles/DropdownStyles";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <DropdownButton onClick={toggleDropdown}>{isOpen ? "×" : "≡"}</DropdownButton>
      <DropdownContent open={isOpen}>
        <DropdownItem>Editar perfil</DropdownItem>
        <DropdownItem>Configurar variables</DropdownItem>
        <DropdownItem>Cerrar sesión</DropdownItem>
      </DropdownContent>
    </div>
  );
}

export default Dropdown;
