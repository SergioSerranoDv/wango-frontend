import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

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
import LogoImg from "../assets/images/logo_navbar.svg";

interface MenuProps {
  id: number;
  elementList: JSX.Element;
}
interface LinkElementProps {
  text: string;
  link: string;
}

const Navbar: React.FC = () => {
  const { logout } = useAuth0();
  const MenuItems: MenuProps[] = [
    {
      id: 1,
      elementList: <LinkElement text="Editar perfil" link="/BatchManage" />,
    },
    {
      id: 2,
      elementList: <LinkElement text="Configurar variables" link="/MyProfile" />,
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
          <svg
            width="32"
            height="32"
            viewBox="0 0 79 79"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.5482 0.111145C28.2918 1.1003 24.3186 5.16507 23.4219 10.4508C23.3137 11.069 23.2673 13.0319 23.2982 15.4893L23.3446 19.5232L23.762 20.1414C24.3959 21.0996 25.1534 21.5015 26.3593 21.5015C27.5652 21.5015 28.3227 21.0996 28.9566 20.1414L29.374 19.5232L29.4668 15.2575C29.5441 11.3009 29.575 10.9299 29.8996 10.0954C30.5644 8.39526 31.9404 7.08154 33.6873 6.47878C34.4294 6.21604 35.5116 6.20058 51.2499 6.20058H68.024L68.9207 6.55606C70.6367 7.25156 71.9354 8.61163 72.5383 10.3581C72.8011 11.1 72.8166 12.6146 72.8166 39.507C72.8166 66.3995 72.8011 67.9141 72.5383 68.656C71.9354 70.4025 70.6367 71.7625 68.9207 72.458L68.024 72.8135H51.2499C35.5116 72.8135 34.4294 72.798 33.6873 72.5353C31.9404 71.9325 30.5644 70.6188 29.8996 68.9187C29.575 68.0841 29.5441 67.7132 29.4668 63.7721C29.374 59.6455 29.3585 59.5064 29.003 58.9345C28.802 58.61 28.3536 58.1618 28.0135 57.9299C27.4879 57.5744 27.2096 57.5126 26.3593 57.5126C25.509 57.5126 25.2307 57.5744 24.7051 57.9299C24.365 58.1618 23.9166 58.61 23.7156 58.9345C23.3446 59.5218 23.3446 59.5527 23.3446 64.0812C23.3446 68.9651 23.391 69.3979 24.2413 71.4998C25.3389 74.2199 28.3227 77.1565 30.9973 78.1611C33.3472 79.042 32.1877 78.9957 51.1726 78.9957C70.1575 78.9957 68.998 79.042 71.3479 78.1611C74.0225 77.1565 77.0062 74.2199 78.1039 71.4998C79.0779 69.0887 79.0006 71.5771 79.0006 39.507C79.0006 7.43703 79.0779 9.92535 78.1039 7.5143C77.0062 4.79414 74.0225 1.85761 71.3633 0.853004C68.9825 -0.0279541 70.2966 0.0184097 51.5591 0.00296021C41.4019 -0.0124969 33.9965 0.0338669 33.5482 0.111145Z"
              fill="white"
            />
            <path
              d="M36.1764 26.3375C35.5116 26.5694 34.8314 27.0794 34.4294 27.6667C34.0738 28.1767 34.012 28.4395 34.012 29.2895C34.012 30.6187 34.2748 30.9896 37.3204 34.0189L39.6549 36.3372L20.8246 36.4145L1.99434 36.4918L1.36048 36.9091C0.3865 37.5427 0 38.3001 0 39.521C0 40.3556 0.0773 40.6338 0.41742 41.1593C0.64932 41.4993 1.09766 41.9475 1.42232 42.1485L2.0098 42.5194L20.8401 42.5967L39.6549 42.6739L37.3204 44.9923C34.2748 48.0215 34.012 48.3924 34.012 49.7216C34.012 50.5871 34.0738 50.8344 34.4603 51.3753C35.1406 52.3645 35.8208 52.72 37.0267 52.72C37.7842 52.72 38.1553 52.6427 38.5727 52.38C38.8664 52.1945 40.9071 50.2471 43.087 48.037C46.751 44.3586 47.1066 43.9413 47.6168 42.8749C48.6835 40.6184 48.6835 38.3928 47.6168 36.1517C47.1066 35.0699 46.751 34.6526 43.1798 31.0669C41.0463 28.9032 39.0365 26.9712 38.7118 26.7548C38.1243 26.3375 36.7948 26.1212 36.1764 26.3375Z"
              fill="white"
            />
          </svg>
        </button>
      ),
    },
  ];
  return (
    <NavbarContainer>
      <NavbarInnerContainer>
        <LeftContainer>
          {MenuItems.map((item, index) => (
            <NavbarLink>{item.elementList}</NavbarLink>
          ))}
          <Dropdown></Dropdown>
        </LeftContainer>
        <RightContainer>
          <Logo src={LogoImg} />
        </RightContainer>
      </NavbarInnerContainer>
    </NavbarContainer>
  );
};

const LinkElement: React.FC<LinkElementProps> = ({ text, link }) => (
  <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
    <NavbarLink>{text}</NavbarLink>
  </Link>
);

export default Navbar;
