import styled from "styled-components";

const colors = {
  white: "#fff",
  black: "#000",
  red: "#cf352b",
  green: "#39ca07",
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
  display: block;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 700px;
`;

export const Form = styled.form`
  padding: ${spacing.large};
  background-color: ${colors.white};
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
`;

export const FormHeader = styled.h2`
  margin-top: 56px;
  margin-bottom: 8px;
  color: ${colors.text};
  text-align: center;
  font-size: 16px;
  font-family: "Inter", sans-serif;
  font-weight: 550;
`;

export const FormField = styled.div`
  margin-bottom: ${spacing.medium};
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: ${spacing.small};
`;

export const Dropdown = styled.select`
  flex: 1;
  padding: ${spacing.small};
  border: 1px solid ${colors.black};
  border-radius: 5px;
  height: 34px;
`;

export const DropdownItem = styled.option`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #000;
  background-color: #ffe5d7;
  font-size: 14px;
  height: 30px;
`;

export const IdInput = styled(InputBase)`
  flex: 2;
`;

export const Input = styled(InputBase)`
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${spacing.medium};
`;

export const Button = styled.button`
  padding: ${spacing.medium};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: ${colors.white};
  &:first-child {
    background-color: ${colors.red};
    max-width: 100%;
  }
  &:last-child {
    background-color: ${colors.green};
    max-width: 100%;
  }
`;
