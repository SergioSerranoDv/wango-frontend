import styled from "styled-components";

const colors = {
  orange: "#ff670f",
  red: "#cf352b",
  green: "#39ca07",
  blue: "#06b6d4",
  gray: "#737373",
  amber: "#FB9E0B",
};

interface InputProps {
  $primary?: boolean;
  $custom?: boolean;
  $custom1?: boolean;
  $custom2?: boolean;
  $custom3?: boolean;
  $custom4?: boolean;
  $gray?: boolean;
  $blue?: boolean;
  $orange?: boolean;
  $amber?: boolean;
  $custom5?: boolean;
  typeColor?: string;
}

export const FormContainer = styled.div<InputProps>`
  display: flex;
  max-width: 720px;
  width: 100%;
  flex-direction: column;
  margin: auto;
  position: relative; /* Añade posición relativa */
`;

export const Form = styled.form``;

export const FormContent = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const ContainerInput = styled.div<InputProps>`
  margin-top: ${(props) => (props.$custom1 ? "20px" : "")};
  margin-top: ${(props) => (props.$custom4 ? "20px" : "")};
  margin-top: ${(props) => (props.$custom2 ? "30px" : "")};
  width: ${(props) => (props.$custom2 ? "95%" : "")};
  border-bottom: ${(props) => (props.$custom2 ? "3px solid #FF670F" : "")};
  margin-bottom: 15px;
`;

export const Label = styled.label<InputProps>`
  position: static;
  margin-bottom: 8px;
  font-size: ${(props) => (props.$custom1 ? "18px" : "14px")};
  font-weight: 500;
  user-select: none;
`;

export const Input = styled.input<InputProps>`
  padding: 9.5px;
  font-size: 14px;
  color: ${(props) => (props.$custom ? "#000" : "#4d4d4d")};
  opacity: 0.85;
  border-radius: 5px;
  border: 1px solid #000000;
  margin-left: ${(props) => (props.$custom1 ? "10px" : "")};
`;

export const SelectInput = styled.select<InputProps>`
  margin: ${(props) => (props.$primary ? "-12px 0 12px 0" : "6px 0 4px 0")};
  padding: 9.5px;
  font-size: 14px;
  color: ${(props) => (props.$custom ? "#000" : "#4d4d4d")};
  font-weight: 550; /*semibold*/
  opacity: 0.85;
  border-radius: 5px;
  width: ${(props) => (props.$custom1 ? "72%" : "100%")};
  border: 1px solid #000000;
  box-sizing: border-box;
  margin-left: ${(props) => (props.$custom1 ? "10px" : "")};
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

interface ButtonProps {
  $background?: string;
  $hoverBackground?: string;
}

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) => props.$background || "#ff7a33"};
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 5px;
  border: 1px solid #fff;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.$hoverBackground || "#ff670f"};
  }
`;
export const CancelButton = styled.button`
  background-color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ButtonSubmit = styled.button<InputProps>`
  font-size: 14px;
  font-weight: 550; /*semibold*/
  padding: 11px;
  text-align: center;
  background-color: ${(props) =>
    props.$gray
      ? colors.gray
      : props.$orange
        ? colors.orange
        : props.$blue
          ? colors.blue
          : props.$amber
            ? colors.amber
            : colors[(props.color as keyof typeof colors) || "green"]};
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
  //border: 1px solid
  ${(props) =>
    props.$gray
      ? colors.gray
      : props.$blue
        ? colors.blue
        : colors[(props.color as keyof typeof colors) || "green"]};
  margin-bottom: ${(props) => (props.$custom1 ? "-10px" : "")};
  margin-bottom: ${(props) => (props.$primary ? "10px" : "")};
  margin-top: ${(props) => (props.$custom1 ? "10px" : "")};
`;

export const Logo = styled.img`
  max-width: 277px;
  max-height: 90px;
  margin: 0 auto;
  margin-bottom: -22px; /* Espacio entre el logo Wango y el formulario */
`;

export const SignBoard = styled.p<InputProps>`
  font-size: ${(props) => (props.$primary ? "13px" : "13px")};
  font-size: ${(props) => (props.$custom4 ? "14px" : "")};
  font-size: ${(props) => (props.$custom3 ? "12.5px" : "")};
  font-size: ${(props) => (props.$custom5 ? "14px" : "")};
  font-weight: ${(props) => (props.$custom5 ? "650" : "620")};
  font-weight: ${(props) => (props.$custom4 ? "600" : "")};
  font-weight: ${(props) => (props.$primary ? "" : "")};
  text-align: center;
  color: ${(props) => (props.$primary ? "#000000" : "#4d4d4d")};
  margin-top: ${(props) => (props.$custom3 ? "10px" : "0px")};
  margin-bottom: ${(props) => (props.$custom1 ? "40px" : "10px")};
  margin-bottom: ${(props) => (props.$custom2 ? "42px" : "")};
  font-weight: ${(props) => (props.$custom ? "450" : "")};
  color: ${(props) => (props.$custom ? "#D80000" : "")};
  opacity: 0.95;
`;
export const SignBoard2 = styled.p<InputProps>`
  color: ${(props) => (props.$custom1 ? "#3DAC17" : "#D80000")};
  margin-top: ${(props) => (props.$custom2 ? "-5px" : "")};
  margin-bottom: ${(props) => (props.$custom2 ? "25px" : "")};
  text-align: center;
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
  align-items: center;
`;

export const FormField = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  text-align: left;
`;

export const InfoContainer = styled.div<InputProps>`
  align-items: ${(props) => (props.$custom2 ? "center" : "right")};
  background: ${(props) => (props.$custom4 ? "transparent" : "")};
  display: flex;
  flex-direction: column;
  gap: 7.5px;
  box-sizing: border-box;
  border-bottom: ${(props) => (props.$custom1 ? "0px" : "1px solid #000000")};
  border-bottom: ${(props) => (props.$custom4 ? "0px" : "")};
  padding-bottom: 18px;
  margin-bottom: ${(props) => (props.$custom1 ? "5px" : "26px")};
  margin-bottom: ${(props) => (props.$custom4 ? "0px" : "")};
  margin-top: ${(props) => (props.$custom1 ? "15px" : "-6px")};
  padding: ${(props) => (props.$custom1 ? "0px 15px 20px 15px" : "-6px")};
  border-radius: ${(props) => (props.$custom1 ? "15px" : "0px")};
  align-items: ${(props) => (props.$custom4 ? "center" : "")};
`;
export const InfoContainer2 = styled.div<InputProps>`
  background: ${(props) => (props.$custom1 ? "transparent" : "")};
  display: flex;
  flex-direction: column;
  gap: 7.5px;
  box-sizing: border-box;
  padding-bottom: 18px;
  margin-bottom: ${(props) => (props.$custom1 ? "5px" : "26px")};
  margin-top: ${(props) => (props.$custom1 ? "15px" : "-6px")};
  padding: ${(props) => (props.$custom1 ? "0px 15px 20px 0px" : "-6px")};
`;

export const DetailsSign = styled.a<InputProps>`
  margin-top: ${(props) => (props.$custom4 ? "-7px" : "")};
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => (props.$custom3 ? "#4d4d4d" : "#3dac17")};
  color: ${(props) => (props.$custom4 ? "#4d4d4d" : "")};
  //color: #3dac17;
`;
export const DetailsSign2 = styled.a<InputProps>`
  margin-top: ${(props) => (props.$custom4 ? "-7px" : "")};
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => (props.$custom3 ? "#4d4d4d" : "#3dac17")};
  color: ${(props) => (props.$custom4 ? "#4d4d4d" : "")};
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

export const SubLabel = styled.span`
  padding-right: 1px;
  font-weight: bold;
  margin-top: 10px;
  font-size: 0.6rem;
  margin-right: 5px; /* Espacio entre el label principal y el subnivel */
`;

export const Adder = styled.a`
  color: #ff670f;
  font-size: 28px;
  font-weight: bold;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export const Suggestion = styled.p`
  white-space: pre-line;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #4d4d4d;
  margin-top: 10px;
`;
