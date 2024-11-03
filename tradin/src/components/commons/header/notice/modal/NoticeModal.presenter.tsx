import * as S from "./NoticeModal.styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import Switch from "react-switch";
import { NoticeModalUIProps } from "./NoticeModal.types";
import { useRecoilState } from "recoil";
import { notification } from "../../../../../util/atoms";


export default function NoticeModalUI (props: NoticeModalUIProps): JSX.Element {
    const [isNotification, setIsNotification] = useRecoilState(notification);

    return (
        <>
            <S.ModalContainer ref={props.modalRef}>
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
                         <S.DeleteAllIcon onClick={props.handleDeleteAll}>
                            <S.TrashAllIcon icon={faTrashAlt} />
                            <S.Tooltip>전체삭제</S.Tooltip>
                        </S.DeleteAllIcon>
                        <S.SwitchContainer>
                            <S.NotificationIcon>
                                <FontAwesomeIcon 
                                    icon={isNotification ? faBell : faBellSlash} 
                                    color={isNotification ? "#4CAF50" : "#FA3E3E"}
                                />
                            </S.NotificationIcon>
                            <Switch 
                                checked={isNotification} 
                                onChange={() => setIsNotification(prev => !prev)}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                width={30}
                                height={16}
                                handleDiameter={12}
                                offColor="#888888"
                                onColor="#4CAF50"
                                boxShadow="0px 1px 3px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 6px rgba(0, 0, 0, 0.2)"
                                aria-label="알림 스위치"
                                role="switch"
                                className="Notification-Switch"
                            />
                        </S.SwitchContainer>
                    </S.RightContainer>
                </S.ModalHeader>
                <S.NotificationList>
                    {props.notifications.map((notification, index) => (
                        <S.NotificationItem
                            key={notification.message}
                            read={notification.read}
                            isRemoving={props.removingNotifications.includes(notification.message)}
                            moveUp={props.removingNotifications.some(m => 
                                props.notifications.findIndex(n => n.message === m) < index
                            )}
                            dragX={notification.message === props.draggedItem ? props.dragX : 0}
                            onClick={() => props.markAsRead(notification.message)}
                            onTouchStart={(e) => props.handleTouchStart(e, notification.message)}
                            onTouchMove={props.handleTouchMove}
                            onTouchEnd={props.handleTouchEnd}
                            onMouseDown={(e) => props.handleMouseDown(e, notification.message)}
                            onMouseMove={props.handleMouseMove}
                            onMouseUp={props.handleMouseUp}
                            onMouseLeave={props.handleMouseUp}
                            isActive={props.dragX < -50}
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
                                    props.handleRemoveNotification(notification.message);
                                }}
                            />
                            <S.DeletedZone opacity={props.dragX < -40 && notification.message === props.draggedItem ? 1 : 0}>
                                삭제
                            </S.DeletedZone>
                        </S.NotificationItem>
                    ))}
                </S.NotificationList>
            </S.ModalContainer>
            {props.showDeleteConfirm && (
                <S.ConfirmDialog>
                    <p>{props.getDeleteConfirmMessage()}</p>
                    <S.ConfirmButtonContainer>
                        <S.ConfirmButton onClick={props.confirmDeleteAll}>확인</S.ConfirmButton>
                        <S.CancelButton onClick={props.cancelDeleteAll}>취소</S.CancelButton>
                    </S.ConfirmButtonContainer>
                </S.ConfirmDialog>
            )}
        </>
    );
};
