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
    timestamp: Date;
}

const getNotificationsFromLocalStorage = (): Notification[] => {
    if (typeof window !== 'undefined') {
        const storedNotifications = localStorage.getItem('notifications');
        if (storedNotifications) {
            return JSON.parse(storedNotifications, (key, value) => {
                if (key === 'timestamp') return new Date(value);
                return value;
            });
        }
    }
    return [];
};

const saveNotificationsToLocalStorage = (notifications: Notification[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }
};

Modal.setAppElement('#__next');

export default function HeaderNotice() {
    const [isDarkMode] = useRecoilState(darkMode);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>(getNotificationsFromLocalStorage());
    const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);
    const [showReadOnly, setShowReadOnly] = useState(false);
    const [enableToastAndSound, setEnableToastAndSound] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);

    const handleNotificationClick = () => {
        setIsModalOpen(prev => !prev);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const addDummyNotification = () => {
        const newNotification: Notification = { 
            message: `${new Date().toLocaleTimeString()}`, 
            read: false,
            timestamp: new Date()
        };
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

    const deleteNotification = (message: string) => {
        setNotifications(prev => {
            const updatedNotifications = prev.filter(notif => notif.message !== message);
            saveNotificationsToLocalStorage(updatedNotifications);
            return updatedNotifications;
        });
    };

    const deleteOldNotifications = () => {
        const currentTime = new Date();
        setNotifications(prev => {
            const updatedNotifications = prev.filter(notif => 
                !notif.read || (currentTime.getTime() - new Date(notif.timestamp).getTime()) < 24 * 60 * 60 * 1000
            );
            saveNotificationsToLocalStorage(updatedNotifications);
            return updatedNotifications;
        });
    };

    useEffect(() => {
        const filteredNotifs = notifications.filter(notification => {
            if (showUnreadOnly) return !notification.read;
            if (showReadOnly) return notification.read;
            return true;
        });
        setFilteredNotifications(filteredNotifs);
    }, [notifications, showUnreadOnly, showReadOnly]);

    useEffect(() => {
        const intervalId = setInterval(addDummyNotification, 20000);
        const cleanupIntervalId = setInterval(deleteOldNotifications, 60000);
        return () => {
            clearInterval(intervalId);
            clearInterval(cleanupIntervalId);
        };
    }, [enableToastAndSound]);

    useEffect(() => {
        saveNotificationsToLocalStorage(notifications);
    }, [notifications]);

    useEffect(() => {
        const unreadNotifications = notifications.filter(notif => !notif.read);
        setUnreadCount(unreadNotifications.length);
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
            <S.BellIconContainer>
                <S.BellIcon>
                    <FontAwesomeIcon
                        icon={faBell}
                        style={{ cursor: 'pointer', color: isDarkMode ? '#f0f0f0' : '#333', fontSize: '26px'}}
                        onClick={handleNotificationClick}
                        className="Notification-Switch"
                    />
                </S.BellIcon>
                {unreadCount > 0 && (
                    <S.UnreadBadge>{unreadCount}</S.UnreadBadge>
                )}
            </S.BellIconContainer>
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