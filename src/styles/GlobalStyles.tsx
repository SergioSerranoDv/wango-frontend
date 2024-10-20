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
