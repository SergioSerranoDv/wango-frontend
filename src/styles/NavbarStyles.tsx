import styled from "styled-components";

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
  justify-content: space-between;

  @media (max-width: 768px) {
    padding-left: 0px;
  }
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
`;

export const RightContainer = styled.div`
  flex: 30%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 5%;
  gap: 2rem;
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
