import React from "react";
import {
  CloseButton,
  BackDrop,
  Container,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "../../styles/components/modals/ModalStyles";

interface ModalProps {
  title: string;
  children?: React.ReactNode;
  closeModal: () => void;
}


export const Modal: React.FC<ModalProps> = ({ closeModal, children, title }) => {
  return (
    <Container>
      <BackDrop />
      <ModalContainer>
        <ModalContent>
          <ModalHeader>
            <h3>{title}</h3>
            <CloseButton onClick={() => closeModal()}>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 10.586L6.707 5.293 5.293 6.707 10.586 12l-5.293 5.293 1.414 1.414L12 13.414l5.293 5.293 1.414-1.414L13.414 12l5.293-5.293-1.414-1.414L12 10.586z"
                  fill="currentColor"
                ></path>
              </svg>
            </CloseButton>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </ModalContainer>
    </Container>
  );
};
