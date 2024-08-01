import { useState } from "react";
import Modal from "react-modal";
import * as S from "./HeaderNotice.styles";
import { useRecoilState } from "recoil";
import { darkMode } from "../atoms";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { modalStyles } from "./HeaderNotice.styles";
import ModalContainer from "./HeaderNoticeModal";

const notifications = [
    "알림 메시지 1",
    "알림 메시지 2",
    "알림 메시지 3",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
    "알림 메시지 4",
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

    const modalContent = (
        <ModalContainer
            closeModal={closeModal}
            notifications={notifications}
        />
    );

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
                style={modalStyles}
            >
                {modalContent}
            </Modal>
        </>
    );
}