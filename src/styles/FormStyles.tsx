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

export const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative; /* Añade posición relativa */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
`;

export const Label = styled.label<{ $primary?: boolean }>`
  //color: "#000000";
  margin: ${(props) => (props.$primary ? "4px 0px -12px 0" : "0 0 -6px 0")};
  font-size: 1rem;
  font-size: 14px;
  font-weight: bold;
  line-height: 0.01;
  //background-color: #000;
`;

export const Input = styled.input<InputProps>`
  margin: ${(props) => (props.$primary ? "-12px 0 12px 0" : "6px 0 4px 0")};
  padding: 9.5px;
  font-size: 14px;
  color: ${(props) => (props.$custom ? "#000" : "#4d4d4d")};
  font-weight: 550; /*semibold*/
  opacity: 0.85;
  border-radius: 5px;
  width: 100%;
  border: 1px solid #000000;
  box-sizing: border-box;
  //background-color: #ff0078;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
`;
export const ButtonContainer2 = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4%;
`;

export const Button = styled.button<InputProps>`
  font-size: 14px;
  font-weight: 550; /*semibold*/
  padding: 10px;
  background-color: ${(props) => colors[(props.color as keyof typeof colors) || "orange"]};
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid ${(props) => colors[(props.color as keyof typeof colors) || "orange"]};
  margin-bottom: ${(props) => (props.$custom1 ? "-10px" : "")};
  margin-bottom: ${(props) => (props.$primary ? "10px" : "")};
  margin-top: ${(props) => (props.$custom1 ? "10px" : "")};
`;

export const ButtonSubmit = styled.button<InputProps>`
  font-size: 14px;
  font-weight: 550; /*semibold*/
  padding: 10px;
  background-color: ${(props) => colors[(props.color as keyof typeof colors) || "green"]};
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid ${(props) => colors[(props.color as keyof typeof colors) || "green"]};
  margin-bottom: ${(props) => (props.$custom1 ? "-10px" : "")};
  margin-bottom: ${(props) => (props.$primary ? "10px" : "")};
  margin-top: ${(props) => (props.$custom1 ? "10px" : "")};
`;

export const Logo = styled.img`
  max-width: 277px;
  max-height: 90px;
  align-self: center;
  margin-bottom: -22px; /* Espacio entre el logo Wango y el formulario */
`;

export const SignBoard = styled.p<InputProps>`
  font-size: ${(props) => (props.$primary ? "13px" : "13px")};
  font-weight: ${(props) => (props.$primary ? "" : "620")};
  text-align: center;
  color: ${(props) => (props.$primary ? "#000000" : "#4d4d4d")};
  margin: ${(props) => (props.$primary ? "20px 0 20px 0" : "0 0 24px 0")};
  margin-top: ${(props) => (props.$custom1 ? "-250px" : "10px")};
  margin-bottom: ${(props) => (props.$custom1 ? "40px" : "10px")};
  margin-top: ${(props) => (props.$custom2 ? "10px" : "")};
  margin-bottom: ${(props) => (props.$custom2 ? "42px" : "")};
  margin: ${(props) => (props.$custom ? "-24px 0px 35px 0px" : "")};
  font-weight: ${(props) => (props.$custom ? "450" : "")};
  color: ${(props) => (props.$custom ? "#D80000" : "")};
  opacity: 0.95;
`;
export const SignBoard2 = styled.p<InputProps>`
  color: ${(props) => (props.$custom1 ? "#3DAC17" : "#D80000")};
  text-align: center;
  font-weight: 300;
  font-size: 13px;
`;

export const Description = styled.p<InputProps>`
  font-size: ${(props) => (props.$custom1 ? "13px" : "12px")};
  text-align: ${(props) => (props.$custom1 ? "center" : "")};
  //color: ${(props) => (props.$primary ? "#a0cac5" : "#a0cac5")};
  //background: ${(props) => (props.$custom1 ? "#bb9de4" : "#bb9de4")};
  border-bottom: ${(props) => (props.$custom1 ? "10px solid #000000" : "")};
  margin-top: "-20px";
  color: #4d4d4d;
  opacity: 0.95;
  border: 0px;

  &.customDescription {
    margin-top: -10px; /* Ajusta este valor según sea necesario */
  }
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
  box-sizing: border-box;
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
  box-sizing: border-box;
  border-bottom: 1px solid #000000;
  padding-bottom: 18px;
  margin-bottom: 26px;
  margin-top: -6px;
`;

export const DetailsSign = styled.a<InputProps>`
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => (props.$custom3 ? "#4d4d4d" : "#3dac17")};
  //color: #3dac17;
`;

export const DetailsItem = styled.a<InputProps>`
  color: #000000;
  font-weight: 300;
`;

export const Link = styled.a<InputProps>`
  color: ${(props) => (props.$primary ? "#548af7" : "#4d4d4d")};
  cursor: pointer;
`;
