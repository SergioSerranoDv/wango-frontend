import styled from "styled-components";

export const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background-color: transparent;
  margin: 0 4px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(60, 64, 67, 0.08);
  }
`;
