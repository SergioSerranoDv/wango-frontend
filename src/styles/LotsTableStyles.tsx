import styled from "styled-components";

export const Container = styled.div`
  display: block;
  max-width: 700px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr<{ index: number }>`
  background-color: ${(props) => (props.index % 2 === 0 ? "#FFFFFF" : "#FFE1CF")};
`;

export const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ccc;
`;
