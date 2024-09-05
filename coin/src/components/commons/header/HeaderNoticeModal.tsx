import * as S from "./HeaderNotice.styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from "react";
import Switch from "react-switch";

interface Notification {
    message: string;
    read: boolean;
    timestamp: Date;
}

interface IModalProps {
    closeModal: () => void;
    notifications: Notification[];
    deleteNotification: (message: string) => void;
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
    showUnreadOnly: boolean;
    showReadOnly: boolean;
    setShowUnreadOnly: React.Dispatch<React.SetStateAction<boolean>>;
    setShowReadOnly: React.Dispatch<React.SetStateAction<boolean>>;
    enableToastAndSound: boolean;
    setEnableToastAndSound: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContainer = (props: IModalProps): JSX.Element => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [removingNotifications, setRemovingNotifications] = useState<string[]>([]);

    const markAsRead = (message: string) => {
        props.setNotifications(prev => 
            prev.map(notif => 
                notif.message === message ? {...notif, read: true} : notif
            )
        );
    };

    const handleRemoveNotification = (message: string) => {
        setRemovingNotifications(prev => [...prev, message]);
        setTimeout(() => {
          props.deleteNotification(message);
          setRemovingNotifications(prev => prev.filter(m => m !== message));
        }, 300); // 애니메이션 지속 시간과 일치
    };

    const handleDeleteAll = (e: React.MouseEvent) => {
        setShowDeleteConfirm(true);
    };

    const confirmDeleteAll = () => {
        props.setNotifications(prev => {
            if (props.showUnreadOnly) {
                return prev.filter(notif => notif.read);
            } else if (props.showReadOnly) {
                return prev.filter(notif => !notif.read);
            } else {
                return [];
            }
        });
        setShowDeleteConfirm(false);
    };

    const cancelDeleteAll = () => {
        setShowDeleteConfirm(false);
    };

    const getDeleteConfirmMessage = () => {
        if (props.showUnreadOnly) {
            return "읽지 않은 알림을 전체 삭제하시겠습니까?";
        } else if (props.showReadOnly) {
            return "읽은 알림을 전체 삭제하시겠습니까?";
        } else {
            return "모든 알림을 전체 삭제하시겠습니까?";
        }
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
                    <S.RightContainer>
                         <S.DeleteAllIcon onClick={handleDeleteAll}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                            <S.Tooltip>전체삭제</S.Tooltip>
                        </S.DeleteAllIcon>
                        <S.SwitchContainer>
                            <S.NotificationIcon>
                                <FontAwesomeIcon 
                                    icon={props.enableToastAndSound ? faBell : faBellSlash} 
                                    color={props.enableToastAndSound ? "#4CAF50" : "#F44336"}
                                />
                            </S.NotificationIcon>
                            <Switch 
                                checked={props.enableToastAndSound} 
                                onChange={props.setEnableToastAndSound} 
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </S.SwitchContainer>
                    </S.RightContainer>
                </S.ModalHeader>
                <S.NotificationList>
                    {props.notifications.map((notification, index) => (
                    <S.NotificationItem
                        key={notification.message}
                        read={notification.read}
                        isRemoving={removingNotifications.includes(notification.message)}
                        moveUp={removingNotifications.some(m => 
                        props.notifications.findIndex(n => n.message === m) < index
                        )}
                        onClick={() => markAsRead(notification.message)}
                    >
                        <span>
                        {notification.read ? `알림: ${notification.message}` : `새 알림: ${notification.message}`}
                        </span>
                        <S.TrashIcon
                        icon={faTrashAlt}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveNotification(notification.message);
                        }}
                        />
                    </S.NotificationItem>
                    ))}
                </S.NotificationList>
            </S.ModalContainer>
            {showDeleteConfirm && (
                <S.ConfirmDialog>
                    <p>{getDeleteConfirmMessage()}</p>
                    <S.ConfirmButtonContainer>
                        <S.ConfirmButton onClick={confirmDeleteAll}>확인</S.ConfirmButton>
                        <S.CancelButton onClick={cancelDeleteAll}>취소</S.CancelButton>
                    </S.ConfirmButtonContainer>
                </S.ConfirmDialog>
            )}
        </>
    );
};

export default ModalContainer;