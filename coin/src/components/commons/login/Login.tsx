import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../util/firebase";
import * as S from "./Login.styles"
import { useSidebar } from "../sidebar/SidebarContext";
import { useRecoilState } from "recoil";
import { darkMode } from "../atoms";
import SideBar from "../sidebar/Sidebar";
import GoogleIcon from '@mui/icons-material/Google';
import NaverLogin from "./naver/NaverLogin";

export default function LoginPage(): JSX.Element {

    const { sidebarOpen } = useSidebar();
    const [isDarkMode] = useRecoilState(darkMode);

    const onClickGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log("User Info:", user);
        } catch (error) {
            console.error("Error during login", error);
        }
    };

    return (
        <S.Container $darkMode={isDarkMode}>
            <SideBar />
                <S.MainContent sidebarOpen={sidebarOpen} $darkMode={isDarkMode}>
                    <S.PageTitle>로그인</S.PageTitle>
                    <S.LoginButton onClick={onClickGoogleLogin}>
                        <GoogleIcon />
                        <p>Sign in with Google</p>
                    </S.LoginButton>
                    <NaverLogin/>
                </S.MainContent>
        </S.Container>
    );
}