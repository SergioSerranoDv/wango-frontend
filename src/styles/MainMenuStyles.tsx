import styled from "styled-components";

export const Hero = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const Text = styled.div`
  font-family: Inter, sans-serif;
  margin-top: 8px;
  font-size: 14px;
  text-align: center;
  color: black;
`;

export const TopCardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;
