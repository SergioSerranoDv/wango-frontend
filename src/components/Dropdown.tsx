import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DropdownButton,
  DropdownContent,
  DropdownItem,
  LogoContainer,
  Container,
} from "../styles/DropdownStyles";
import LogoImg from "../assets/images/logo.svg";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <div>
        <DropdownButton onClick={toggleDropdown}>{isOpen ? "×" : "≡"}</DropdownButton>
        <DropdownContent open={isOpen}>
          <Link to="/myProfile">
            <DropdownItem>Editar perfil</DropdownItem>
          </Link>
          <Link to="variables">
            <DropdownItem>Configurar variables</DropdownItem>
          </Link>
          <Link to="logout">
            <DropdownItem>Cerrar sesión</DropdownItem>
          </Link>
        </DropdownContent>
      </div>
      <LogoContainer>
        <Link to="/">
          <img src={LogoImg} alt="Logo" />
        </Link>
      </LogoContainer>
    </Container>
  );
}

export default Dropdown;
