import styled from "styled-components";

export const Container = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f5f5f5;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0
    padding: 1rem;
  }
`;

export const SubContainer = styled.div`
  position: relative;
  max-width: 960px;
  margin: 0 auto;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: auto;
  height: 100vh;
  padding-top: 80px;
  overflow: hidden;

  @media (max-width: 768px) {
    display: block;
    height: auto;
  }
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;
  flex: 1;
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
