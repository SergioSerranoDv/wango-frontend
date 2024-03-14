import styled from "styled-components";

export const MainWrapper = styled.div`
  background-color: #fff;
  display: flex;
  max-width: 720px;
  max-height: 1280px;
  width: 100%;
  flex-direction: column;
  margin: 0 auto;
  padding: 26px 0 80px;
`;

export const Text = styled.div`
  font-family: Inter, sans-serif;
  margin-top: 8px;
  font-size: 14px;
  text-align: center;
  color: black;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 1);
  padding: 0px 20px 7px;
`;

export const BurguerMenuNav = styled.img`
  width: 27px;
  object-fit: contain;
`;

export const WangoLogoTiny = styled.img`
  width: 121px;
  max-width: 100%;
  object-fit: contain;
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 0 72px;
`;

export const Menu = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin-top: 25px;
`;

export const ItemsMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
`;

export const Item = styled.img`
  width: 76px;
  max-width: 100%;
  object-fit: contain;

  &.small {
    width: 50px;
  }
`;
