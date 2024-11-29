import styled from "styled-components";

export const Item = styled.li`
  display: flex;
  border-radius: 8px;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
  height: 46px;
  margin: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;
