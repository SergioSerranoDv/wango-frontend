import styled from "styled-components";

export const Text = styled.div`
  color: black;
  font-family: Inter, sans-serif;
  font-size: 16px;
  margin: 10px;
  text-align: center;
  @media (max-width: 874px) {
    width: 90px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
    width: 100%;
  }
`;

export const NavbarContainer = styled.nav`
  background-color: #ffb032;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 20;
  top: 0;
  width: 100%;
`;

export const LeftContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 20%;
  justify-content: flex-start;
  padding-left: 5%;
`;

export const CenterContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const RightContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 20%;
  justify-content: flex-end;
  padding-right: 5%;
`;

export const NavbarLinkContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const Logo = styled.img`
  max-height: auto;
  max-width: 121px;
`;

export const NavbarInnerContainer = styled.div`
  display: flex;
  height: 80px;
  width: 100%;
`;

export const Profile = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;
