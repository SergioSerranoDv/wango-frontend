import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LogoImg from "../../assets/images/logoNavbar.svg";
import { AppContext } from "../../context/AppContext";
import {
  LeftContainer,
  NavbarContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  CenterContainer,
  RightContainer,
  Logo,
  Text,
  Profile,
} from "../../styles/NavbarStyles";
import { Tooltip, IconButton } from "@mui/material";

interface LinkProps {
  id: number;
  elementList: JSX.Element;
}
interface LinkElementProps {
  text: string;
  link: string;
}

interface HeaderProps {
  toogleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toogleSidebar }) => {
  const { logout } = useAuth0();
  const { userData } = useContext(AppContext);

  const LinkItems: LinkProps[] = [
    {
      id: 1,
      elementList: <LinkElement text="Editar perfil" link="/profile" />,
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
    <>
      <NavbarContainer>
        <NavbarInnerContainer>
          <LeftContainer>
            <Link to="/">
              <Logo src={LogoImg} />
            </Link>
          </LeftContainer>
          <RightContainer>
            <CenterContainer>
              <NavbarLinkContainer>
                {LinkItems.map((item) => (
                  <div key={item.id}>{item.elementList}</div>
                ))}
              </NavbarLinkContainer>
            </CenterContainer>
            <Tooltip title="Perfil">
              <IconButton onClick={() => toogleSidebar()}>
                <Profile
                  onClick={() => toogleSidebar()}
                  src={userData.picture}
                  width={40}
                  height={40}
                  alt="User profile"
                />
              </IconButton>
            </Tooltip>
          </RightContainer>
        </NavbarInnerContainer>
      </NavbarContainer>
    </>
  );
};

const LinkElement: React.FC<LinkElementProps> = ({ text, link }) => (
  <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
    <Text>{text}</Text>
  </Link>
);
