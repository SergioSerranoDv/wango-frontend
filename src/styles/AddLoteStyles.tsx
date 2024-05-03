import styled from "styled-components";

const colors = {
  white: "#fff",
  black: "#000",
  red: "#cf352b",
  green: "#39ca07",
  orange: "#ff670f",
  text: "rgba(0, 0, 0, 0.7)",
};

const spacing = {
  small: "8px",
  medium: "15px",
  large: "40px",
};

const InputBase = styled.input`
  padding: ${spacing.small};
  border: 1px solid ${colors.black};
  border-radius: 5px;
  height: 34px;
  box-sizing: border-box;
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 800px;
`;

export const Form = styled.form`
  background-color: ${colors.white};
  border-radius: 10px;
  width: 100%;
`;

export const FormHeader = styled.p`
  color: ${colors.text};
  text-align: center;
  font-weight: 550;
  margin-bottom: ${spacing.large};
`;

export const FormField = styled.div`
  margin-bottom: ${spacing.medium};
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: ${spacing.small};
`;

export const Input = styled(InputBase)`
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${spacing.large};
`;

export const Button = styled.button`
  padding: ${spacing.medium};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: ${colors.white};
  background-color: ${colors.orange};
  width: 100%;
`;
