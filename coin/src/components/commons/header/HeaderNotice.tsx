import { useState, useEffect } from "react";
import Modal from "react-modal";
import * as S from "./HeaderNotice.styles";
import { useRecoilState } from "recoil";
import { darkMode } from "../atoms";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { modalStyles } from "./HeaderNotice.styles";
import ModalContainer from "./HeaderNoticeModal";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

interface Notification {
    message: string;
    read: boolean;
}

const getNotificationsFromLocalStorage = (): Notification[] => {
    if (typeof window !== 'undefined') {
        const storedNotifications = localStorage.getItem('notifications');
        if (storedNotifications) {
            return JSON.parse(storedNotifications) as Notification[];
        }
    }
    return [];
};

// 로컬 스토리지에 알림 저장하기
const saveNotificationsToLocalStorage = (notifications: Notification[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }
};

Modal.setAppElement('#__next');

export default function HeaderNotice() {
    const [isDarkMode] = useRecoilState(darkMode);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notifications, setNotifications] = useState(getNotificationsFromLocalStorage());
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);
    const [showReadOnly, setShowReadOnly] = useState(false);
    const [enableToastAndSound, setEnableToastAndSound] = useState(true);

    const handleNotificationClick = () => {
        setIsModalOpen(prev => !prev);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 더미 알림 추가 함수
    const addDummyNotification = () => {
        const newNotification = { message: `${new Date().toLocaleTimeString()}`, read: false };
        setNotifications(prev => {
            const updatedNotifications = [newNotification, ...prev.slice(0, 100)];
            saveNotificationsToLocalStorage(updatedNotifications);
            return updatedNotifications;
        });
        if (enableToastAndSound) {
            showToast(newNotification.message);
        }
    };

    const showToast = (message: string) => {
        toast(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        playNotificationSound();
    };

    const playNotificationSound = () => {
        const audio = new Audio("/alarmsound.mp3");
        audio.play();
    };

    const deleteNotification = (index: number) => {
        setNotifications(prev => {
            const updatedNotifications = prev.filter((_, i) => i !== index);
            saveNotificationsToLocalStorage(updatedNotifications);
            return updatedNotifications;
        });
    };

    const filteredNotifications = notifications.filter(notification => {
        if (showUnreadOnly) return !notification.read;
        if (showReadOnly) return notification.read;
        return true;
    });

    // 1분마다 더미 알림 추가
    useEffect(() => {
        const intervalId = setInterval(addDummyNotification, 60000); 
        return () => clearInterval(intervalId); 
    }, [enableToastAndSound]);

    useEffect(() => {
        saveNotificationsToLocalStorage(notifications);
    }, [notifications]);

    const modalContent = (
        <ModalContainer
            closeModal={closeModal}
            notifications={filteredNotifications}
            deleteNotification={deleteNotification}
            setNotifications={setNotifications}
            showUnreadOnly={showUnreadOnly}
            showReadOnly={showReadOnly}
            setShowUnreadOnly={setShowUnreadOnly}
            setShowReadOnly={setShowReadOnly}
            enableToastAndSound={enableToastAndSound}
            setEnableToastAndSound={setEnableToastAndSound}
        />
    );

    return (
        <>
            <S.BellIcon>
                <FontAwesomeIcon
                    icon={faBell}
                    style={{ cursor: 'pointer', color: isDarkMode ? '#f0f0f0' : '#333', fontSize: '26px'}}
                    onClick={handleNotificationClick}
                    className="Notification-Switch"
                />
            </S.BellIcon>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Notification Modal"
                style={modalStyles}
            >
                {modalContent}
            </Modal>
            <ToastContainer />
        </>
    );
}
