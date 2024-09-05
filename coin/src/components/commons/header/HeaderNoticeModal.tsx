import * as S from "./HeaderNotice.styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useRef } from "react";
import Switch from "react-switch";

interface IModalProps {
    closeModal: () => void;
    notifications: { message: string, read: boolean }[];
    deleteNotification: (index: number) => void;
    setNotifications: React.Dispatch<React.SetStateAction<{ message: string, read: boolean }[]>>;
    showUnreadOnly: boolean;
    showReadOnly: boolean;
    setShowUnreadOnly: React.Dispatch<React.SetStateAction<boolean>>;
    setShowReadOnly: React.Dispatch<React.SetStateAction<boolean>>;
    enableToastAndSound: boolean;
    setEnableToastAndSound: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContainer = (props: IModalProps): JSX.Element => {
    const modalRef = useRef<HTMLDivElement>(null);

    const markAsRead = (index: number) => {
    props.setNotifications(prev => {
        if (index < 0 || index >= prev.length) {
            return prev;
        }
        const newNotifications = [...prev];
        newNotifications[index].read = true;
        return newNotifications;
    });
};

    return (
        <>
            <S.ModalContainer ref={modalRef}>
                <S.ModalHeader>
                    <S.ModalButtonContainer>
                    <S.ReadButton
                            active={!props.showUnreadOnly && !props.showReadOnly}
                            onClick={() => { 
                                props.setShowUnreadOnly(false); 
                                props.setShowReadOnly(false); 
                            }}
                        >
                            전체
                        </S.ReadButton>
                    <S.ReadButton
                            active={props.showUnreadOnly}
                            onClick={() => { props.setShowReadOnly(false); props.setShowUnreadOnly(true); }}
                        >
                            읽지 않음
                        </S.ReadButton>
                        <S.ReadButton
                            active={props.showReadOnly}
                            onClick={() => { props.setShowReadOnly(true); props.setShowUnreadOnly(false); }}
                        >
                            읽음
                        </S.ReadButton>
                    </S.ModalButtonContainer>
                    <Switch 
                        checked={props.enableToastAndSound} 
                        onChange={props.setEnableToastAndSound} 
                        uncheckedIcon={false}
                        checkedIcon={false}
                    />
                </S.ModalHeader>
                <S.NotificationList>
                    {props.notifications.map((notification, index) => (
                        <S.NotificationItem key={index} read={notification.read} onClick={() => markAsRead(index)}>
                            <span>
                                {notification.read ? `알림: ${notification.message}` : `새 알림: ${notification.message}`}
                            </span>
                            <S.TrashIcon icon={faTrashAlt} onClick={() => props.deleteNotification(index)} />
                        </S.NotificationItem>
                    ))}
                </S.NotificationList>
            </S.ModalContainer>
        </>
    );
};

export default ModalContainer;