import styled from "styled-components";

interface InputProps {
  $primary?: boolean;
  $custom?: boolean;
  $custom1?: boolean;
  $custom2?: boolean;
}

export const RegisterFormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 20px;
  display: flex; /* Utiliza flexbox para centrar verticalmente */
  flex-direction: column;
  justify-content: center; /* Centrar verticalmente */
  height: 100vh; /* Establece la altura al 100% del viewport para centrar en toda la pantalla */
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
  margin: ${(props) => (props.$primary ? "-12px 0 8px 0" : "6px 0 4px 0")};
  padding: 9.5px;
  font-size: 14px;
  color: #4d4d4d;
  font-weight: 550; /*semibold*/
  opacity: 0.85;
  border-radius: 5px;
  width: 100%;
  border: 1px solid #000000;
  box-sizing: border-box;
  //background-color: #ff0078;
`;

export const Button = styled.button`
  font-size: 14px;
  font-weight: 550; /*semibold*/
  padding: 10px;
  background-color: #ff670f;
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
  border: 1px #ff670f;
`;

export const Logo = styled.img`
  max-width: 277px;
  max-heigh: 90px;
  align-self: center;
  margin-bottom: -22px; /* Espacio entre el logo Wango y el formulario */
`;

export const SignBoard = styled.p<InputProps>`
  font-size: ${(props) => (props.$primary ? "13px" : "14px")};
  font-weight: ${(props) => (props.$primary ? "" : "620")};
  text-align: center;
  color: ${(props) => (props.$primary ? "#000000" : "#4d4d4d")};
  margin: ${(props) => (props.$primary ? "20px 0 20px 0" : "0 0 40px 0")};
  opacity: 0.95;
`;

export const Description = styled.p<InputProps>`
  font-size: 12px;
  //color: ${(props) => (props.$primary ? "#a0cac5" : "#a0cac5")};
  padding: 0px;
  color: #4d4d4d;
  opacity: 0.95;
  border: 0px #;
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

export const Link = styled.a<InputProps>`
  color: ${(props) => (props.$primary ? "#548af7" : "#4d4d4d")};
  cursor: pointer;
`;
