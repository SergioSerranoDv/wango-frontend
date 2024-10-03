import styled from "styled-components";

export const Aside = styled.aside`
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 75px);
  max-height: 100vh;
  width: 260px;

  @media (max-width: 768px) {
    display: none;
  }
`;
export const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-left: 2rem;
  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

export const ItemMenu = styled.li`
  text-decoration: none;
  margin: 1rem 0;
`;
