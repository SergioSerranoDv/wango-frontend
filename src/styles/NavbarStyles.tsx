import styled from "styled-components";

export const Text = styled.div`
  color: black;
  font-family: Inter, sans-serif;
  font-size: 20px;
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
  border-bottom: 1px solid #000;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  @media (max-width: 768px) {
    background-color: #fff;
  }
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
  flex: 60%;
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

export const UserImage = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;

export const DropdownContent = styled.div<{ open: boolean }>`
  align-items: center;
  background-color: #ffb032;
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  height: 100%;
  position: relative;
  right: 0;
  width: 100%;
  z-index: 1;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const DropdownItem = styled.div`
  align-items: center;
  border-bottom: 2px solid #ffdda8;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  height: 36px;
  justify-content: center;
  width: 80%;

  &:hover {
    background-color: #ffdda8;
  }
`;
