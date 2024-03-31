import styled from "styled-components";

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  opacity: 0.5;
`;

export const LogoImage = styled.img`
  width: 150%;

  @media screen and (min-width: 768px) {
    width: 750px;
  }
`;
