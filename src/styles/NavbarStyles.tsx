import styled from "styled-components";
import SVG from "react-inlinesvg";

export const Text = styled.div`
  font-family: Inter, sans-serif;
  margin: 10px;
  font-size: 19px;
  text-align: center;
  color: black;
  @media (max-width: 768px) {
    display: none;
  }
`;

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

export const NavbarLink = styled.span`
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

export const NavbarInner = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
`;
