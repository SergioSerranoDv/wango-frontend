import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import {
  LeftContainer,
  NavbarContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  RightContainer,
  Logo,
  Text,
} from "../styles/NavbarStyles";
import Dropdown from "../components/Dropdown";
import LogoImg from "../assets/images/logoNavbar.svg";

interface NavbarProps {
  id: number;
  elementList: JSX.Element;
}
interface LinkElementProps {
  text: string;
  link: string;
}

const Navbar: React.FC = () => {
  const { logout } = useAuth0();
  const NavbarItems: NavbarProps[] = [
    {
      id: 1,
      elementList: <LinkElement text="Editar perfil" link="/my-profile" />,
    },
    {
      id: 2,
      elementList: <LinkElement text="Configurar variables" link="/config-vars" />,
    },
    {
      id: 3,
      elementList: (
        <button
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
          onClick={() => logout()}
        >
          <Text>Cerrar sesión</Text>
        </button>
      ),
    },
  ];

  return (
    <NavbarContainer>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <Dropdown></Dropdown>
            {NavbarItems.map((item, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={index}
              >
                {item.elementList}
              </div>
            ))}
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <Link to="/">
            <Logo src={LogoImg} />
          </Link>
        </RightContainer>
      </NavbarInnerContainer>
    </NavbarContainer>
  );
};

const LinkElement: React.FC<LinkElementProps> = ({ text, link }) => (
  <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
    <Text>{text}</Text>
  </Link>
);

export default Navbar;