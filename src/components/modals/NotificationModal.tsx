import React, { useState } from "react";
import { Link } from "react-router-dom";
import errorLogo from "../../assets/icons/errorLogo.svg";
import checkLogo from "../../assets/icons/checkLogo.svg";
import {
  Overlay,
  ModalContainer,
  NotificationHeader,
  NotificationImage,
  NotificationTitle,
  NotificationDescription,
  AcceptButton,
} from "../../styles/components/NotificationModalStyles";

interface NotificationProps {
  status: string;
  title: string;
  description: string;
  buttonText: string;
  onClose: () => void;
  redirectUrl?: string;
}
enum NotificationType {
  ERROR = "error",
  SUCCESS = "success",
}
export const NotificationModal: React.FC<NotificationProps> = ({
  status,
  title,
  description,
  buttonText,
  onClose,
  redirectUrl = "/default-route",
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <>
      {isVisible && (
        <Overlay>
          <ModalContainer>
            <NotificationHeader>
              <NotificationImage
                loading="lazy"
                src={status === NotificationType.SUCCESS ? checkLogo : errorLogo}
                alt="Notification icon"
              />
              <NotificationTitle>{title}</NotificationTitle>
            </NotificationHeader>
            <NotificationDescription dangerouslySetInnerHTML={{ __html: description }} />
            <AcceptButton onClick={handleClose}>{buttonText}</AcceptButton>
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
};
