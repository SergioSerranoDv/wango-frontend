import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  LeftContainer,
  NavbarContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  CenterContainer,
  RightContainer,
  Logo,
  Text,
  UserImage,
  DropdownContent,
  DropdownItem,
} from "../../styles/NavbarStyles";
import LogoImg from "../../assets/images/logoNavbar.svg";

interface LinkProps {
  id: number;
  elementList: JSX.Element;
}
interface LinkElementProps {
  text: string;
  link: string;
}
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const { userData } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleDropdown = () => {
    if (window.innerWidth >= 768) {
      navigate("/my-profile");
    } else {
      setIsOpen(!isOpen);
    }
  };

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
            <UserImage onClick={toggleDropdown} src={userData.picture} alt="User profile" />
          </RightContainer>
        </NavbarInnerContainer>
      </NavbarContainer>
      <DropdownContent open={isOpen}>
        {LinkItems.map((item) => (
          <DropdownItem key={item.id}>{item.elementList}</DropdownItem>
        ))}
      </DropdownContent>
    </>
  );
};

const LinkElement: React.FC<LinkElementProps> = ({ text, link }) => (
  <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
    <Text>{text}</Text>
  </Link>
);

export default Navbar;
