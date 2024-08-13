import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as S from "./Header.styles";
import { FaBars } from "react-icons/fa";
import { useSidebar } from "../sidebar/SidebarContext";
import Switch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from "recoil";
import { darkMode } from "../atoms";
import NavBar from "../nav/Nav";
import HeaderNotice from "./HeaderNotice";

export default function Header(): JSX.Element {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useRecoilState(darkMode);
    const { toggleSidebar } = useSidebar();

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

    const onClickMoveToLogin = () => {
        router.push("/login");
    }

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
                        <HeaderNotice />
                    </S.IconListItem>
                    <S.Login onClick={onClickMoveToLogin}>로그인 / 회원가입</S.Login>
                </S.IconList>
            </S.Right>
        </S.HeaderContainer>
    );
}