import * as S from "./Login.styles"
import { useSidebar } from "../sidebar/SidebarContext";
import { useRecoilState } from "recoil";
import { darkMode } from "../atoms";
import SideBar from "../sidebar/Sidebar";
import NaverLogin from "./naver/NaverLogin";
import GoogleLogin from "./google/GoogleLogin";

export default function LoginPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const [isDarkMode] = useRecoilState(darkMode);

    return (
        <S.Container $darkMode={isDarkMode}>
            <SideBar />
                <S.MainContent sidebarOpen={sidebarOpen} $darkMode={isDarkMode}>
                    <S.PageTitle>로그인</S.PageTitle>
                    <GoogleLogin/>
                    <NaverLogin/>
                </S.MainContent>
        </S.Container>
    );
}