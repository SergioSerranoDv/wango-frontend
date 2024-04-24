import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.section`
  border-radius: 7px;
  border: 1px solid rgba(0, 0, 0, 1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: rgba(0, 0, 0, 0.7);
  padding: 19px 21px;
  position: relative;
`;

export const NotificationHeader = styled.header`
  align-self: stretch;
  display: flex;
  gap: 10px;
`;

export const NotificationImage = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  width: 20px;
`;

export const NotificationTitle = styled.h2`
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 700;
  flex-grow: 1;
  margin: auto 0;
`;

export const NotificationDescription = styled.div`
  margin: 0;
  text-align: justify;
  margin-top: 10px;
  font:
    400 11px Inter,
    sans-serif;

  align-items: center;
  margin-left: calc(20px + 10px);
`;

export const AcceptButton = styled.button`
  width: 83px;
  height: 30px;
  border-radius: 6px;
  background-color: #39ca07;
  color: #fff;
  padding: 7px 15px;
  font:
    600 12px Inter,
    sans-serif;
  cursor: pointer;
  border: none;
  align-self: flex-end;
  margin-top: 10px;
`;
