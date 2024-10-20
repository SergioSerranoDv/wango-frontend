import styled from "styled-components";

interface InputProps {
  $primary?: boolean;
  $custom?: boolean;
  $custom1?: boolean;
  $custom2?: boolean;
  $custom3?: boolean;
}

export const Container = styled.div<InputProps>`
  display: block;
  max-width: 700px;
  margin: auto;
  padding: 0px;
  box-sizing: border-box;
`;

export const TableContainer = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 16px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Table = styled.table<InputProps>`
  padding: 20px;
  width: 100%;
  border-collapse: collapse;
  margin-top: ${(props) => (props.$custom ? "14px" : "4px")};
`;

export const TableRow = styled.tr<{ $index: number; $evenColor: string; $oddColor: string }>`
  // background-color: ${(props) => (props.$index % 2 === 0 ? props.$evenColor : props.$oddColor)};
  font-weight: ${(props) => (props.$index === -1 ? "bold" : "")};
  font-size: ${(props) => (props.$index === -1 ? "14px" : "12.5px")};
  color: ${(props) => (props.$index === -1 ? "#737373" : "#4c443f")};
`;

export const TableRow2 = styled.tr<{ $index: number }>`
  background-color: ${(props) => (props.$index % 2 === 0 ? "#ffffff" : "#d4eff5")};
  background-color: ${(props) => (props.$index === -1 ? "#ffffff" : "")};
  font-weight: ${(props) => (props.$index === -1 ? "bold" : "")};
  font-size: ${(props) => (props.$index === -1 ? "14px" : "12.5px")};
  color: ${(props) => (props.$index === -1 ? "#737373" : "#4c443f")};
`;

export const TableCell = styled.td<InputProps>`
  font-weight: ${(props) => (props.$custom1 ? "600" : "")};
  padding: ${(props) => (props.$custom ? "4px 8px 4px 8px" : "11px")};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
export const PrevArrow = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const NextArrow = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const ContainerNavigationControls = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  padding-right: 1rem;
`;
