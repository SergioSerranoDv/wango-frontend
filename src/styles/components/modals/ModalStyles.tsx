import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
`;

export const BackDrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s;
`;

export const ModalContainer = styled.div`
  display: flex;
  height: 100%;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  opacity: 1;
  transition: all 0.3s;
`;

export const ModalContent = styled.div`
  margin: 32px;
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  width: calc(100% - 64px);
  max-width: 40rem;
  border-radius: 4px;
  max-height: calc(100% - 64px);
  min-height: 20rem;
  background-color: #fff;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
`;

export const ModalBody = styled.div`
  padding: 16px;
`;

export const CloseButton = styled.button`
  display: flex;
  background-color: rgb(215, 215, 215);
  border-radius: 50%;
  border: none;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgb(200, 200, 200);
    cursor: pointer;
  }
`;

export const AddButton = styled.button`
  display: flex;
  background-color: rgb(215, 215, 215);
  border-radius: 50%;
  border: none;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgb(200, 200, 200);
    cursor: pointer;
  }
`;
