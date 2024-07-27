import { useState } from "react";
import Modal from "react-modal";
import * as S from "./HeaderNotice.styles";
import { useRecoilState } from "recoil";
import { darkMode } from "../atoms";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const notifications = [
    "알림 메시지 1",
    "알림 메시지 2",
    "알림 메시지 3",
    "알림 메시지 4",
];

Modal.setAppElement('#__next'); // Modal의 접근성을 위해 필수

export default function HeaderNotice() {
    const [isDarkMode] = useRecoilState(darkMode);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNotificationClick = () => {
        setIsModalOpen(prev => !prev);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <FontAwesomeIcon
                icon={faBell}
                style={{ cursor: 'pointer', color: isDarkMode ? '#333' : '#f0f0f0', fontSize: '26px'}}
                onClick={handleNotificationClick}
            />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Notification Modal"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        background: isDarkMode ? '#333' : '#fff',
                        color: isDarkMode ? '#fff' : '#000',
                        width: '500px',
                        height: '500px',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    },
                }}
            >
                <h2>알림</h2>
                <S.CloseButton onClick={closeModal}>닫기</S.CloseButton>
                <S.NotificationList>
                    {notifications.map((notification, index) => (
                        <S.NotificationItem key={index}>{notification}</S.NotificationItem>
                    ))}
                </S.NotificationList>
            </Modal>
        </>
    );
}