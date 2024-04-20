import styled from "styled-components";

const colors = {
  orange: "#ff670f",
  red: "#cf352b",
  green: "#39ca07",
};

interface InputProps {
  $primary?: boolean;
  $custom?: boolean;
  $custom1?: boolean;
  $custom2?: boolean;
  $custom3?: boolean;
}

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  max-width: 400px;
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
`;

export const Label = styled.label<{ $primary?: boolean }>`
  margin: ${(props) => (props.$primary ? "4px 0 -12px 0" : "0 0 -6px 0")};
  font-size: 1rem;
  font-weight: bold;
`;

export const Input = styled.input<InputProps>`
  margin: ${(props) => (props.$primary ? "-12px 0 12px 0" : "6px 0 4px 0")};
  padding: 9.5px;
  font-size: 14px;
  color: ${(props) => (props.$custom ? "#000" : "#4d4d4d")};
  font-weight: 550;
  opacity: 0.85;
  border-radius: 5px;
  width: 100%;
  border: 1px solid #000000;
  box-sizing: border-box;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
`;

export const Button = styled.button<InputProps>`
  font-size: 14px;
  font-weight: 550;
  padding: 10px;
  background-color: ${(props) => colors[(props.color as keyof typeof colors) || "orange"]};
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid ${(props) => colors[(props.color as keyof typeof colors) || "orange"]};
`;

export const Logo = styled.img`
  max-width: 277px;
  max-height: 90px;
  margin-bottom: 20px;
`;

export const SignBoard = styled.p<InputProps>`
  font-size: 13px;
  font-weight: ${(props) => (props.$primary ? "normal" : "620")};
  text-align: center;
  color: ${(props) => (props.$primary ? "#000000" : "#4d4d4d")};
  margin: ${(props) => (props.$primary ? "20px 0" : "0 0 24px 0")};
`;

export const Description = styled.p<InputProps>`
  font-size: ${(props) => (props.$custom1 ? "13px" : "12px")};
  text-align: ${(props) => (props.$custom1 ? "center" : "")};
  margin-top: -20px;
  color: #4d4d4d;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Select = styled.select<{ $primary?: boolean }>`
  color: ${(props) => (props.$primary ? "#cccccc" : "#4d4d4d")};
  padding: 8px;
  font-weight: 550;
  opacity: 0.85;
  border-radius: 5px;
  margin-top: 6px;
  width: 100%;
  border: 1px solid #000000;
`;

export const DivIdentification = styled.div`
  display: flex;
  width: 100%;
  gap: 1em;
`;

export const FormField = styled.div<InputProps>``;

export const InfoContainer = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  gap: 7.5px;
  border-bottom: 1px solid #000000;
  padding-bottom: 18px;
  margin-bottom: 26px;
`;

export const DetailsSign = styled.a<InputProps>`
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => (props.$custom3 ? "#4d4d4d" : "#3dac17")};
`;

export const DetailsItem = styled.a<InputProps>`
  color: #000000;
  font-weight: 300;
`;

export const Link = styled.a<InputProps>`
  color: ${(props) => (props.$primary ? "#548af7" : "#4d4d4d")};
  cursor: pointer;
`;
