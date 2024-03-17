import React from "react";
import {
  LeftContainer,
  NavbarContainer,
  NavbarInnerContainer,
  NavbarLink,
  NavbarLinkContainer,
  RightContainer,
  Logo,
} from "../styles/NavbarStyles";
import Dropdown from "../components/Dropdown";
import LogoImg from "../assets/icons/logoNavbar.svg";

function Navbar() {
  return (
    <NavbarContainer>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/myProfile">Editar perfil</NavbarLink>
            <NavbarLink to="/variables">Configurar variables</NavbarLink>
            <NavbarLink to="/logout">Cerrar sesión</NavbarLink>
            <Dropdown></Dropdown>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <NavbarLink to="/">
            <Logo src={LogoImg}></Logo>
          </NavbarLink>
        </RightContainer>
      </NavbarInnerContainer>
    </NavbarContainer>
  );
}

export default Navbar;
