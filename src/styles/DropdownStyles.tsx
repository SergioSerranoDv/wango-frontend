import styled from "styled-components";

export const DropdownButton = styled.button`
  border: none;
  width: 70px;
  height: 50px;
  background: none;
  cursor: pointer;
  font-size: 45px;

  @media (min-width: 768px) {
    display: none;
  }
`;

type DropdownContentProps = {
  open: boolean;
};

export const DropdownContent = styled.div<DropdownContentProps>`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  background-color: #ffb032;
  width: 100%;
  margin-top: 17px;
  padding-right: 5%;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const DropdownItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  height: 36px;
  border-bottom: 1px solid #ffdda8;

  &:hover {
    background-color: #ffdda8;
  }
`;
