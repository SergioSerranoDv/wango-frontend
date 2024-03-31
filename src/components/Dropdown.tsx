import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import {
  DropdownButton,
  DropdownContent,
  DropdownItem,
  Container,
  Text,
} from "../styles/DropdownStyles";

interface DropdownProps {
  id: number;
  elementList: JSX.Element;
}

interface LinkElementProps {
  text: string;
  link: string;
}

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const { logout } = useAuth0();
  const DropdownItems: DropdownProps[] = [
    {
      id: 1,
      elementList: <LinkElement text="Editar perfil" link="/MyProfile" />,
    },
    {
      id: 2,
      elementList: <LinkElement text="Configurar variables" link="/variables" />,
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
    <Container>
      <div>
        <DropdownButton onClick={toggleDropdown}>{isOpen ? "×" : "≡"}</DropdownButton>
        <DropdownContent open={isOpen}>
          {DropdownItems.map((item, index) => (
            <DropdownItem key={index}>{item.elementList}</DropdownItem>
          ))}
        </DropdownContent>
      </div>
    </Container>
  );
};

const LinkElement: React.FC<LinkElementProps> = ({ text, link }) => (
  <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
    <Text>{text}</Text>
  </Link>
);

export default Dropdown;
