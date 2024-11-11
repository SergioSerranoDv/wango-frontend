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

export const FormHeader = styled.p`
  color: ${colors.text};
  text-align: center;
  font-weight: 550;
  margin-bottom: ${spacing.large};
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

export const ButtonSecondary = styled.button`
  padding: 12px 16px;
  border: none;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  background-color: #ff670f;
  min-width: 64px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #ff6f00;
  }
`;
