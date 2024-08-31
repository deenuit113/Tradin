import * as S from "./HeaderNotice.styles";
import { useRef } from "react";

interface IModalProps {
    closeModal: () => void;
    notifications: string[];
}

const ModalContainer = (props: IModalProps): JSX.Element => {
    const modalRef = useRef<HTMLDivElement>(null);

    return (
        <S.ModalContainer ref={modalRef}>
            <h2>알림</h2>
                <S.CloseButton onClick={props.closeModal}>&times;</S.CloseButton>
                <S.NotificationList>
                    {props.notifications.map((notification, index) => (
                        <S.NotificationItem key={index}>{notification}</S.NotificationItem>
                    ))}
                </S.NotificationList>
        </S.ModalContainer>
        
    );
};

export default ModalContainer;