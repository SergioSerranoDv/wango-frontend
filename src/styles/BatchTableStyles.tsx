import styled from "styled-components";

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
