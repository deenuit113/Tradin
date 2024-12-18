import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSidebar } from "../../../../contexts/SidebarContext";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, auth } from "../../../../util/firebase";
import { useUser } from "../../../../contexts/UserContext";
import HeaderUI from "./Header.presenter";
import { announcements } from "./MockAnnouncements";
import { useRecoilState } from "recoil";
import { darkMode } from "../../../../util/atoms";
// import { useFetchNews } from "../../../../hooks/useFetchNew";

export default function Header(): JSX.Element {
    const pathname = usePathname();
    const router = useRouter();
    const [currentAnnouncement, setCurrentAnnouncement] = useState<number>(0);
    const { setUser, setLoggedIn, loginType, setLoginType } = useUser();
    const [isDarkMode, setIsDarkMode] = useRecoilState(darkMode);
    // const articles = useFetchNews();

    // Firebase Auth 상태 감지
    useEffect(() => {
        if (loginType === 'google') {
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
        }
    }, [setLoggedIn, setUser, loginType]);

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

    const onClickMoveToProfile = () => {
        router.push("/profile");
    }

    // 로그아웃 처리
    const onClickSignOut = () => {
        signOut(auth) // 구글 로그아웃
            .then(() => {
                setUser({
                    id: null,
                    email: null,
                    displayName: null,
                    photoUrl: null,
                });
                setLoggedIn(false);
                setLoginType(null);
            }).catch((error) => {
                console.log(error);
            });

        if ((window as any).Kakao?.Auth) { // 카카오 로그아웃
            (window as any).Kakao.Auth.logout(() => {
                setUser({
                    id: null,
                    email: null,
                    displayName: null,
                    photoUrl: null,
                });
                setLoggedIn(false);
                setLoginType(null);
            });
        }
    }

   return (
        <>
            <HeaderUI
                handleTitleClick={handleTitleClick}
                currentAnnouncement={currentAnnouncement}
                onClickSignOut={onClickSignOut}
                onClickMoveToProfile={onClickMoveToProfile}
                onClickMoveToLogin={onClickMoveToLogin}
                // articles={articles}
            />
        </>
   );
}