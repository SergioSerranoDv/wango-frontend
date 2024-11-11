import styled from "styled-components";

export const Container = styled.div`
  padding: 4rem;
  height: auto;
  background-color: #f5f5f5;
  flex-wrap: wrap;
  justify-content: center;
  flex: 1;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const SubContainer = styled.div`
  position: relative;
  max-width: 960px;
  margin: 0 auto;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Options = styled.button`
  display: flex;
  background-color: rgb(233, 233, 233);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgb(150, 150, 150);
  }
`;
