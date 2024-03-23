import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  imageUrl: string;
  title: string;
  description: string;
  buttonText: string;
  onClose: () => void;
  redirectUrl: string;
}

const NotificationModal: React.FC<NotificationProps> = ({
  imageUrl,
  title,
  description,
  buttonText,
  onClose,
  redirectUrl,
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
              <NotificationImage loading="lazy" src={imageUrl} alt="Notification icon" />
              <NotificationTitle>{title}</NotificationTitle>
            </NotificationHeader>
            <NotificationDescription dangerouslySetInnerHTML={{ __html: description }} />
            {/* Utiliza Link en lugar de button */}
            <Link to={redirectUrl}>
              <AcceptButton onClick={handleClose}>{buttonText}</AcceptButton>
            </Link>
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
};

export default NotificationModal;
