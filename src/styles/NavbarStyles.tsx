import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ffb032;
  padding-top: 26px;
  border-bottom: 1px solid #000;

  @media (max-width: 768px) {
    background-color: #fff;
  }
`;

export const LeftContainer = styled.div`
  flex: 70%;
  display: flex;
  align-items: center;
  padding-left: 5%;

  @media (max-width: 768px) {
    padding-left: 0px;
  }
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
`;

export const NavbarLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  margin: 10px;
  font-size: 19px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const RightContainer = styled.div`
  flex: 30%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 5%;
`;

export const Logo = styled.img`
  max-width: 121px;
  max-height: auto;
`;

export const NavbarInnerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
`;
