import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { DropdownButton, DropdownContent, DropdownItem, Text } from "../styles/DropdownStyles";

interface DropdownProps {
  id: number;
  elementList: JSX.Element;
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
      elementList: (
        <button
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            display: "inline-block",
            width: "100%",
          }}
          onClick={() => (window.location.href = "/my-profile")}
        >
          <Text>Editar perfil</Text>
        </button>
      ),
    },
    {
      id: 2,
      elementList: (
        <button
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            display: "inline-block",
            width: "100%",
          }}
          onClick={() => (window.location.href = "/config-vars")}
        >
          <Text>Editar variables</Text>
        </button>
      ),
    },
    {
      id: 3,
      elementList: (
        <button
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            display: "inline-block",
            width: "100%",
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
      <DropdownButton onClick={toggleDropdown}>{isOpen ? "×" : "≡"}</DropdownButton>
      <DropdownContent open={isOpen}>
        {DropdownItems.map((item, index) => (
          <DropdownItem key={index}>{item.elementList}</DropdownItem>
        ))}
      </DropdownContent>
    </>
  );
};

export default Dropdown;
