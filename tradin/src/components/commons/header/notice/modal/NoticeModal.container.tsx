// import { faTrashAlt, faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
// import { useRef, useState, useCallback, useEffect } from "react";
// import { useRecoilState } from "recoil";
// import { notification } from "../../../../../util/atoms";
// import { NoticeModalProps } from "./NoticeModal.types";
// import NoticeModalUI from "./NoticeModal.presenter";

// export default function NoticeModal (props: NoticeModalProps): JSX.Element {
//     const modalRef = useRef<HTMLDivElement>(null);
//     const [isNotification, setIsNotification] = useRecoilState(notification);
//     const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
//     const [removingNotifications, setRemovingNotifications] = useState<string[]>([]);

//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             localStorage.setItem('Notification', isNotification ? 'on' : 'off');
//         }
//     }, [isNotification]);

//     const markAsRead = (message: string) => {
//         if (props.showUnreadOnly) {
//             setRemovingNotifications(prev => [...prev, message]);
//         }
//         setTimeout(() => {
//             props.setNotifications(prev => 
//                 prev.map(notif => 
//                     notif.message === message ? {...notif, read: true} : notif
//                 )
//             );
//             if (props.showUnreadOnly) {
//                 setRemovingNotifications(prev => prev.filter(msg => msg !== message));
//             }
//         }, 300);
//     };

//     const handleRemoveNotification = (message: string) => {
//         setRemovingNotifications(prev => [...prev, message]);
//         setTimeout(() => {
//             props.deleteNotification(message);
//             setRemovingNotifications(prev => prev.filter(m => m !== message));
//         }, 300);
//       };

//     const handleDeleteAll = () => {
//         setShowDeleteConfirm(true);
//     };

//     const confirmDeleteAll = () => {
//         props.setNotifications(prev => {
//             if (props.showUnreadOnly) {
//                 return prev.filter(notif => notif.read);
//             } else if (props.showReadOnly) {
//                 return prev.filter(notif => !notif.read);
//             } else {
//                 return [];
//             }
//         });
//         setShowDeleteConfirm(false);
//     };

//     const cancelDeleteAll = () => {
//         setShowDeleteConfirm(false);
//     };

//     const getDeleteConfirmMessage = () => {
//         if (props.showUnreadOnly) {
//             return "읽지 않은 알림을 전체 삭제하시겠습니까?";
//         } else if (props.showReadOnly) {
//             return "읽은 알림을 전체 삭제하시겠습니까?";
//         } else {
//             return "모든 알림을 전체 삭제하시겠습니까?";
//         }
//     };

//     return (
//         <>
//             <NoticeModalUI
//                 modalRef={modalRef}
//                 showUnreadOnly={props.showUnreadOnly}
//                 showReadOnly={props.showReadOnly}
//                 setShowUnreadOnly={props.setShowUnreadOnly}
//                 setShowReadOnly={props.setShowReadOnly}
//                 handleDeleteAll={handleDeleteAll}
//                 isNotification={isNotification}
//                 notifications={props.notifications}
//                 removingNotifications={removingNotifications}
//                 markAsRead={markAsRead}
//                 handleRemoveNotification={handleRemoveNotification}
//                 getDeleteConfirmMessage={getDeleteConfirmMessage}
//                 confirmDeleteAll={confirmDeleteAll}
//                 cancelDeleteAll={cancelDeleteAll}
//                 showDeleteConfirm={showDeleteConfirm}
//             />
//         </>
//     );
// };