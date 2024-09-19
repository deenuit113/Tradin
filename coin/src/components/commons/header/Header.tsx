import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import * as S from "./Header.styles";
import { useSidebar } from "../sidebar/SidebarContext";
import Switch from 'react-switch';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from "recoil";
import { darkMode } from "../util/atoms";
import NavBar from "../nav/Nav";
import HeaderNotice from "./HeaderNotice";
import SidebarButton from "./SidebarButton";

export default function Header(): JSX.Element {
    const pathname = usePathname();
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useRecoilState(darkMode);
    const { toggleSidebar } = useSidebar();
    const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

    const announcements = [
        { title: "공시 1", content: "공시 1에 대한 내용" },
        { title: "공시 2", content: "공시 2에 대한 내용" },
        { title: "공시 3", content: "공시 3에 대한 내용" },
        { title: "공시 4", content: "공시 4에 대한 내용" },
        { title: "공시 5", content: "공시 5에 대한 내용" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
        }, 5000); // 5초마다 공시 변경

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedDarkMode = localStorage.getItem('DarkMode');
            console.log(savedDarkMode);
            if (savedDarkMode === 'night') {
                setIsDarkMode(true);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('DarkMode', isDarkMode ? 'night' : 'day');
        }
    }, [isDarkMode]);

    const handleTitleClick = () => {
        if (pathname === "/") {
            router.refresh();
        } else {
            router.push("/");
        }
    };

    const onClickMoveToLogin = () => {
        router.push("/login");
    }

    return (
        <S.HeaderContainer>
            <S.Left>
                <S.SidebarButtonContainer>
                    <SidebarButton onClick={toggleSidebar}/>
                </S.SidebarButtonContainer>
                <S.Title
                    onClick={handleTitleClick}>
                    <svg className="logo" xmlns="http://www.w3.org/2000/svg" width="264" height="132">
                        <rect x="8" y="53.7" width="18" height="3.4" className="logo" id="t-bar" fill="#2c3e50"/>
                        <rect x="14.91" y="54.91" width="3.4" height="22.1" className="logo" fill="#2c3e50"/>
                        <text x="21.82" y="76.74" fontFamily="Arial, sans-serif" fontSize="25.3" fontWeight="bold" className="logo" fill="#2c3e50">
                            radin
                        </text>
                    </svg>
                </S.Title>
                <NavBar />
            </S.Left>
            <S.Center>
                {/* <S.Marquee key={currentAnnouncement}>
                    <p>
                        {`${announcements[currentAnnouncement].title}: ${announcements[currentAnnouncement].content}`}
                    </p>
                </S.Marquee> */}
            </S.Center>
            <S.Right>
                <S.IconList>
                    <S.IconListItem>
                        <Switch
                            onChange={() => setIsDarkMode(prev => !prev)}
                            checked={isDarkMode}
                            offColor="#888"
                            onColor="#0d6efd"
                            uncheckedIcon={<S.SunIcon icon={faSun} style={{ color: 'yellow', padding: '5px' }} className="SunIcon" />}
                            checkedIcon={<S.MoonIcon icon={faMoon} style={{ color: 'white', padding: '5px' }} className="MoonIcon"/>}
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
                    <S.IconListItem>
                        {/* <S.Login onClick={onClickMoveToLogin}>로그인</S.Login>
                        <S.LoginSignUpLabel>&nbsp;/&nbsp;</S.LoginSignUpLabel>
                        <S.SignUp onClick={onClickMoveToLogin}>회원가입</S.SignUp> */}
                    </S.IconListItem>
                </S.IconList>
            </S.Right>
        </S.HeaderContainer>
    );
}