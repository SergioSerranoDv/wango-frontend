import styled from "styled-components";

interface InputProps {
  $primary?: boolean;
  $custom?: boolean;
  $custom1?: boolean;
  $custom2?: boolean;
  $custom3?: boolean;
  $custom4?: boolean;
}

export const SignBoard = styled.p<InputProps>`
  //padding-top: ${(props) => (props.$custom4 ? "10px" : "")};
  font-size: ${(props) => (props.$primary ? "13px" : "13px")};
  font-weight: ${(props) => (props.$primary ? "" : "620")};
  text-align: ${(props) => (props.$custom3 ? "" : "center")};
  font-weight: ${(props) => (props.$custom3 ? "450" : "")};
  color: ${(props) => (props.$primary ? "#000000" : "#4d4d4d")};
  margin: ${(props) => (props.$primary ? "20px 0 20px 0" : "0 0 24px 0")};
  margin-top: ${(props) => (props.$custom1 ? "-230px" : "10px")};
  margin-bottom: ${(props) => (props.$custom1 ? "40px" : "10px")};
  margin-top: ${(props) => (props.$custom2 ? "10px" : "")};
  margin-bottom: ${(props) => (props.$custom2 ? "42px" : "")};
  margin: ${(props) => (props.$custom ? "-24px 0px 35px 0px" : "")};
  font-weight: ${(props) => (props.$custom ? "450" : "")};
  color: ${(props) => (props.$custom ? "#D80000" : "")};
  opacity: 0.95;
  padding: ${(props) => (props.$custom3 ? "8px 0 20px 0" : "")};
  border-bottom: ${(props) => (props.$custom3 ? "1px solid #000000" : "")};
`;

export const SignBoard3 = styled.p<InputProps>`
  font-size: 13px;
  font-weight: 620;
  text-align: center;
  color: #4d4d4d;
  margin: -18px 0 24px 0;
  opacity: 0.95;
`;

export const InfoContainer = styled.div<InputProps>`
  font-size: ${(props) => (props.$custom1 ? "14px" : "")};
  display: flex;
  flex-direction: column;
  gap: 7.5px;
  box-sizing: border-box;
  //border-bottom: 1px solid #000000;
  padding-bottom: ${(props) => (props.$custom1 ? "28px" : "8px")};
  margin-bottom: -8px;
  margin-top: -6px;
`;

export const DetailsSign = styled.a<InputProps>`
  font-size: ${(props) => (props.$custom3 ? "14px" : "13px")};
  font-weight: bold;
  color: ${(props) => (props.$custom3 ? "#4d4d4d" : "#3dac17")};
  //color: #3dac17;
`;

export const DetailsItem = styled.a<InputProps>`
  color: #000000;
  font-weight: 300;
`;
