import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import errorLogo from "../../assets/icons/errorLogo.svg";
import checkLogo from "../../assets/icons/checkLogo.svg";
import { Input } from "../../styles/FormStyles";
import {
  Overlay,
  ModalContainer,
  NotificationHeader,
  NotificationImage,
  NotificationTitle,
  NotificationDescription,
  AcceptButton,
} from "../../styles/components/NotificationModalStyles";

interface CollectionModalProps {
  children?: React.ReactNode;
  data: {
    crop_id: string;
  };
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
export const LastCollectionModal: React.FC<CollectionModalProps> = ({
  children,
  status,
  title,
  data,
  description,
  buttonText,
  onClose,
}) => {
  const navigate = useNavigate();
  const { backendApiCall } = useContext(ApiContext);
  const [name, setName] = useState("");
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
            <AcceptButton
              onClick={async () => {
                navigate(`/lot-menu/edit-crop/register-view/${data.crop_id}`);
                handleClose();
              }}
            >
              {buttonText}
            </AcceptButton>
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
};
