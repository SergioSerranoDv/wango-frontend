import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: absolute;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 0.8rem;
  z-index: 10;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    left: -100%;
    top: -100%;
  }
`;
