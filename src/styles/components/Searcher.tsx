import styled from "styled-components";

export const SearchResultItem = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  cursor: pointer; /* Cambia el cursor a pointer */
  transition: background-color 0.2s ease-in-out;
  border-radius: 5px;
  &:hover {
    background-color: #eee; /* Cambia el color de fondo al hacer hover */
  }
`;

export const ButtonSearch = styled.button`
  background-color: #ff8c00;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin: 6px 0 4px 0;
  &:hover {
    background-color: #ffb032;
  }
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: auto;
`;
