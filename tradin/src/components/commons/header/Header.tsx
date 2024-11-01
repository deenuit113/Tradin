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
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, auth } from "../util/firebase";
import { FaUser } from "react-icons/fa";
import { useUser } from "../../../contexts/UserContext";

export default function Header(): JSX.Element {
    const pathname = usePathname();
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useRecoilState(darkMode);
    const { toggleSidebar } = useSidebar();
    const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
    const { user, setUser, loggedIn, setLoggedIn } = useUser();

    const announcements = [
        { title: "공시 1", content: "공시 1에 대한 내용" },
        { title: "공시 2", content: "공시 2에 대한 내용" },
        { title: "공시 3", content: "공시 3에 대한 내용" },
        { title: "공시 4", content: "공시 4에 대한 내용" },
        { title: "공시 5", content: "공시 5에 대한 내용" },
    ];

    // 디버깅용 로그 추가
    useEffect(() => {
        console.log("Logged in state:", loggedIn);
        console.log("User data:", user);
    }, [loggedIn, user]);

    // Firebase Auth 상태 감지
    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true);
                setUser({
                    id: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoUrl: user.photoURL,
                });
            } else {
                console.log("No user logged in");
                setLoggedIn(false);
                setUser({
                    id: null,
                    email: null,
                    displayName: null,
                    photoUrl: null,
                });
            }
        });

        return () => unsubscribe();
    }, [setLoggedIn, setUser]);

    // 공시 변경 로직
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
        }, 5000); // 5초마다 공시 변경

        return () => clearInterval(interval);
    }, []);

    // 다크 모드 설정 로직
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedDarkMode = localStorage.getItem('DarkMode');
            if (savedDarkMode === 'night') {
                setIsDarkMode(true);
            }
        }
    }, []);

    // 다크 모드 상태를 localStorage에 저장
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('DarkMode', isDarkMode ? 'night' : 'day');
        }
    }, [isDarkMode]);

    // 타이틀 클릭 시 홈으로 이동 또는 새로고침
    const handleTitleClick = () => {
        if (pathname === "/") {
            router.refresh();
        } else {
            router.push("/");
        }
    };

    // 로그인 페이지로 이동
    const onClickMoveToLogin = () => {
        router.push("/login");
    }

    // 로그아웃 처리
    const onClickSignOut = () => {
        signOut(auth) // 구글 로그아웃
            .then(() => {
                console.log("Signed out successfully");
                setUser({
                    id: null,
                    email: null,
                    displayName: null,
                    photoUrl: null,
                });
                setLoggedIn(false);
            }).catch((error) => {
                console.log(error);
            });

        if ((window as any).Kakao?.Auth) { // 카카오 로그아웃
            (window as any).Kakao.Auth.logout(() => {
                console.log("Logged out from Kakao");
                setUser({
                    id: null,
                    email: null,
                    displayName: null,
                    photoUrl: null,
                });
                setLoggedIn(false);
            });
        }
    }

   return (
        <S.HeaderContainer>
            <S.Left>
                <S.SidebarButtonContainer>
                    <SidebarButton onClick={toggleSidebar}/>
                </S.SidebarButtonContainer>
                <S.Title onClick={handleTitleClick}>
                    <svg className="logo" xmlns="http://www.w3.org/2000/svg" width="264" height="132">
                        <rect x="8" y="53.7" width="18" height="3.4" className="logo" id="t-bar" fill="#2c3e50"/>
                        <rect x="14.91" y="54.91" width="3.4" height="22.1" className="logo" fill="#2c3e50"/>
                        <text x="21.82" y="76.74" fontFamily="Arial, sans-serif" fontSize="25.3" fontWeight="bold" className="logo" fill="#2c3e50">
                            radin
                        </text>
                    </svg>
                    <text className="Title-SVP">Tradin</text>
                </S.Title>
                <NavBar />
            </S.Left>
            <S.Center>
                <S.Marquee key={currentAnnouncement}>
                    <p>
                        {`${announcements[currentAnnouncement].title}: ${announcements[currentAnnouncement].content}`}
                    </p>
                </S.Marquee>
            </S.Center>
            <S.Right>
                <S.IconList>
                    <S.IconListItem>
                        <Switch
                            onChange={() => setIsDarkMode(prev => !prev)}
                            checked={isDarkMode}
                            offColor="#888"
                            onColor="#0d6efd"
                            uncheckedIcon={<S.SunIcon icon={faSun} style={{ color: 'yellow', padding: '5px' }} className="SunIcon"/>}
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
                        {(loggedIn && user && user.id) ? (
                            <>
                                <S.UserProfile>
                                    {user?.photoUrl ? (
                                        <S.UserImg
                                            src={user.photoUrl}
                                            alt={user.displayName ?? 'User profile picture'}
                                        />
                                    ) : (
                                        <FaUser className="userIcon"/>
                                    )}
                                    <S.UserDropDown className="userDropDown">
                                        <S.UserDropDownItem onClick={onClickSignOut}>Sign Out</S.UserDropDownItem>
                                        <S.UserDropDownItem>Profile</S.UserDropDownItem>
                                    </S.UserDropDown>
                                </S.UserProfile>
                            </>
                        ) : (
                            <>
                                <S.SignInUpContainer>
                                    <S.SignInUp onClick={onClickMoveToLogin}>Sign in / up</S.SignInUp>
                                </S.SignInUpContainer>
                            </>
                        )}
                    </S.IconListItem>

                </S.IconList>
            </S.Right>
        </S.HeaderContainer>
   );
}