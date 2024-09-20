import { useState, useEffect, useRef, useCallback } from "react";
import Modal from "react-modal";
import * as S from "./HeaderNotice.styles";
import { useRecoilState } from "recoil";
import { darkMode, notification } from "../util/atoms";
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

// 로컬스토리지에 볼륨 가져오기
const getVolumeFromLocalStorage = (): number => {
    if (typeof window !== 'undefined') {
        const storedVolume = localStorage.getItem('volume');
        if (storedVolume) {
            return parseFloat(storedVolume);
        }
    }
    return 1;
};

// 로컬스토리지에 볼륨 저장
const saveVolumeToLocalStorage = (volume: number) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('volume', volume.toString());
    }
};

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

export default function HeaderNotice() {
    const [isDarkMode] = useRecoilState(darkMode);
    const [isNotification, setIsNotification] = useRecoilState(notification);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>(getNotificationsFromLocalStorage());
    const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);
    const [showReadOnly, setShowReadOnly] = useState(false);
    const [enableToastAndSound, setEnableToastAndSound] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);
    const [volume, setVolume] = useState(getVolumeFromLocalStorage());
    const [isDragging, setIsDragging] = useState(false);
    const [dragDistance, setDragDistance] = useState(0);
    const bellIconRef = useRef<HTMLDivElement>(null);
    const dragStartX = useRef(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

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
        if (isNotification) {
            showToast(newNotification.message);
        }
    };

    const showToast = (message: string) => {
        // toast(message, {
        //     position: "bottom-right",
        //     autoClose: 3001,
        //     hideProgressBar: true,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        // });
        playNotificationSound();
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

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // 이벤트 버블링을 막음
        setIsDragging(true);
        dragStartX.current = e.clientX;
    }, []);
    
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging && bellIconRef.current) {
            const rect = bellIconRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const distance = e.clientX - centerX;
            const maxDistance = 100; // 최대 드래그 거리
            const normalizedDistance = Math.max(-maxDistance, Math.min(maxDistance, distance));
            setDragDistance(normalizedDistance);
            
            // 볼륨 설정
            const newVolume = (normalizedDistance / maxDistance) * 0.5 + 0.5;
            console.log(`Normalized Distance: ${normalizedDistance}, New Volume: ${newVolume}`); // 디버깅용 로그
            setVolume(Math.max(0, Math.min(1, newVolume)));
        }
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setDragDistance(0);
    }, []);

    useEffect(() => {
        Modal.setAppElement(document.getElementById('__next') || document.body);
      }, []);
    

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedNotification = localStorage.getItem('Notification');
            console.log(savedNotification);
            if (savedNotification === 'on') {
                setIsNotification(true);
            } else if (savedNotification === 'off') {
                setIsNotification(false);
            }
        }
    }, []);
    
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    // 컴포넌트가 마운트될 때, 오디오 객체를 초기화
    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio("/alarmsound.mp3");
        }
        audioRef.current.volume = getVolumeFromLocalStorage();
    }, []);

    // 볼륨 변경 시, 즉시 오디오 객체에 반영 & 로컬스토리지 저장
    useEffect(() => {
        saveVolumeToLocalStorage(volume);
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const playNotificationSound = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
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
        const intervalId = setInterval(addDummyNotification, 120000);
        const cleanupIntervalId = setInterval(deleteOldNotifications, 60000);
        return () => {
            clearInterval(intervalId);
            clearInterval(cleanupIntervalId);
        };
    }, [isNotification]);

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
        />
    );

    return (
        <>
            <S.BellIconContainer
                ref={bellIconRef}
                onMouseDown={handleMouseDown}
                isDragging={isDragging}
                dragDistance={dragDistance}
            >
                <S.BellIcon>
                    <FontAwesomeIcon
                        icon={faBell}
                        style={{ cursor: 'pointer', color: isDarkMode ? '#f0f0f0' : '#333', fontSize: '26px'}}
                        onClick={handleNotificationClick}
                        className="Notification-Icon"
                    />
                </S.BellIcon>
                {unreadCount > 0 && (
                    <S.UnreadBadge>{unreadCount}</S.UnreadBadge>
                )}
                {isDragging && (
                    <S.VolumeSliderContainer>
                        <S.VolumeSlider volume={volume} />
                    </S.VolumeSliderContainer>
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