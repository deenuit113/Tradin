import * as S from "./HeaderNotice.styles";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { darkMode } from "../atoms";

interface IModalProps {
    closeModal: () => void;
    notifications: string[];
}

const ModalContainer = (props: IModalProps): JSX.Element => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isDarkMode] = useRecoilState(darkMode);

    return (
        <S.ModalContainer ref={modalRef} darkMode={isDarkMode}>
            <h2>알림</h2>
                <S.CloseButton onClick={props.closeModal} darkMode={isDarkMode}>&times;</S.CloseButton>
                <S.NotificationList>
                    {props.notifications.map((notification, index) => (
                        <S.NotificationItem key={index}>{notification}</S.NotificationItem>
                    ))}
                </S.NotificationList>
        </S.ModalContainer>
        
    );
};

export default ModalContainer;