import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  background-color: rgb(233, 233, 233);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgb(150, 150, 150);
  }
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: rgb(233, 233, 233);
  }
`;
