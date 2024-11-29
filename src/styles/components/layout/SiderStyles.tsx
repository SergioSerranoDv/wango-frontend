import styled from "styled-components";

export const Aside = styled.aside<{ open: boolean }>`
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 75px);
  max-height: 100vh;
  width: 260px;

  @media (max-width: 768px) {
    z-index: 1;
    transition: transform 0.3s ease-in-out;
    position: fixed !important;
    top: 80px !important;
    left: 0 !important;
    height: 100vh;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  }
`;
