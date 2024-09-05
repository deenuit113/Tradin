import * as S from "./HeaderNotice.styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useCallback } from "react";
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
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [dragX, setDragX] = useState(0);
    const dragStartX = useRef(0);

    const markAsRead = (message: string) => {
        if (props.showUnreadOnly) {
            setRemovingNotifications(prev => [...prev, message]);
        }
        setTimeout(() => {
            props.setNotifications(prev => 
                prev.map(notif => 
                    notif.message === message ? {...notif, read: true} : notif
                )
            );
            if (props.showUnreadOnly) {
                setRemovingNotifications(prev => prev.filter(msg => msg !== message));
            }
        }, 300);
    };

    const handleRemoveNotification = (message: string) => {
        setRemovingNotifications(prev => [...prev, message]);
        setTimeout(() => {
            props.deleteNotification(message);
            setRemovingNotifications(prev => prev.filter(m => m !== message));
        }, 300);
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

    const handleTouchStart = useCallback((e: React.TouchEvent, message: string) => {
        dragStartX.current = e.touches[0].clientX;
        setDraggedItem(message);
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (draggedItem) {
            const currentX = e.touches[0].clientX;
            const diff = currentX - dragStartX.current;
            setDragX(Math.min(0, Math.max(-100, diff)));
        }
    }, [draggedItem]);

    const handleTouchEnd = useCallback(() => {
        if (dragX < -50) {
            handleRemoveNotification(draggedItem!);
        }
        setDraggedItem(null);
        setDragX(0);
    }, [dragX, draggedItem, handleRemoveNotification]);

    const handleMouseDown = useCallback((e: React.MouseEvent, message: string) => {
        dragStartX.current = e.clientX;
        setDraggedItem(message);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (draggedItem) {
            const currentX = e.clientX;
            const diff = currentX - dragStartX.current;
            setDragX(Math.min(0, Math.max(-100, diff)));
        }
    }, [draggedItem]);

    const handleMouseUp = useCallback(() => {
        if (dragX < -50) {
            handleRemoveNotification(draggedItem!);
        }
        setDraggedItem(null);
        setDragX(0);
    }, [dragX, draggedItem, handleRemoveNotification]);

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
                            dragX={notification.message === draggedItem ? dragX : 0}
                            onClick={() => markAsRead(notification.message)}
                            onTouchStart={(e) => handleTouchStart(e, notification.message)}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onMouseDown={(e) => handleMouseDown(e, notification.message)}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            isActive={dragX < -50}
                        >
                            <S.NotificationText>
                                {notification.read ? (
                                    `알림: ${notification.message}`
                                ) : (
                                    <>
                                        <S.NewBadge>New</S.NewBadge> {notification.message}
                                    </>
                                )}
                            </S.NotificationText>
                            <S.TrashIcon
                                icon={faTrashAlt}
                                onClick={(e) => {
                                    e.stopPropagation(); // 이벤트 버블링 방지
                                    handleRemoveNotification(notification.message);
                                }}
                            />
                            <S.DeletedZone opacity={dragX < -40 && notification.message === draggedItem ? 1 : 0}>
                                삭제
                            </S.DeletedZone>
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