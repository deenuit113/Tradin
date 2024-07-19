import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as S from "./Header.styles";
import { FaBars } from "react-icons/fa";
import { useSidebar } from "../sidebar/SidebarContext";
import Switch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBell } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from "recoil";
import { darkMode } from "../atoms";
import NavBar from "../nav/Nav";
import Modal from "react-modal";

const notifications = [
    "알림 메시지 1",
    "알림 메시지 2",
    "알림 메시지 3",
    "알림 메시지 4",
];

Modal.setAppElement('#__next'); // Modal의 접근성을 위해 필수

export default function Header(): JSX.Element {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useRecoilState(darkMode);
    const { toggleSidebar } = useSidebar();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedDarkMode = localStorage.getItem('DarkMode');
            console.log('Loaded DarkMode from localStorage:', savedDarkMode);
            if (savedDarkMode === 'night') {
                setIsDarkMode(true);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('DarkMode', isDarkMode ? 'night' : 'day');
            console.log('Saved DarkMode to localStorage:', isDarkMode ? 'night' : 'day');
        }
    }, [isDarkMode]);

    const handleTitleClick = () => {
        if (router.pathname === "/") {
            router.reload();
        } else {
            router.push("/");
        }
    };

    const handleNotificationClick = () => {
        setIsModalOpen(prev => !prev);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <S.HeaderContainer darkMode={isDarkMode}>
            <S.Left>
                <S.ToggleButton
                    onClick={toggleSidebar}
                    darkMode={isDarkMode}
                >
                    <FaBars className="Fabars"/>
                </S.ToggleButton>
                <S.Title
                    onClick={handleTitleClick}
                    darkMode={isDarkMode}
                >
                    name
                </S.Title>
                <NavBar />
            </S.Left>
            <S.Center>
                <S.Marquee
                    darkMode={isDarkMode}
                >
                    <p>공시 공시 공시 공시 공시 공시 공시 공시 공시 공시 공시 공시 공시</p>
                </S.Marquee>
            </S.Center>
            <S.Right>
                <S.IconList darkMode={isDarkMode}>
                    <S.IconListItem>
                        <Switch
                            onChange={() => setIsDarkMode(prev => !prev)}
                            checked={isDarkMode}
                            offColor="#888"
                            onColor="#0d6efd"
                            uncheckedIcon={<FontAwesomeIcon icon={faSun} style={{ color: 'yellow', padding: '5px' }} />}
                            checkedIcon={<FontAwesomeIcon icon={faMoon} style={{ color: 'white', padding: '5px' }} />}
                            height={30}
                            width={50}
                            aria-label="다크모드 스위치"
                            role="switch"
                            className="DarkMode-Switch"
                        />
                    </S.IconListItem>
                    <S.IconListItem>
                        <FontAwesomeIcon
                            icon={faBell}
                            style={{ cursor: 'pointer', color: isDarkMode ? '#333' : '#f0f0f0', fontSize: '26px'}}
                            onClick={handleNotificationClick}
                        />
                    </S.IconListItem>
                </S.IconList>
            </S.Right>

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
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    },
                }}
            >
                <h2>알림</h2>
                <button onClick={closeModal} style={{ float: 'right' }}>닫기</button>
                <ul>
                    {notifications.map((notification, index) => (
                        <li key={index}>{notification}</li>
                    ))}
                </ul>
            </Modal>
        </S.HeaderContainer>
    );
}