import * as S from "./Login.styles"
import { useSidebar } from "../../../commons/sidebar/SidebarContext";
import { useRecoilState } from "recoil";
import { darkMode } from "../../../commons/atoms";
import NaverLogin from "../naver/NaverLogin";
import GoogleLogin from "../google/GoogleLogin";
import KakaoLogin from "../kakao/KakaoLogin";

export default function LoginPageUI(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const [isDarkMode] = useRecoilState(darkMode);

    return (
        <>
            <S.Container $darkMode={isDarkMode}>
                    <S.MainContent sidebarOpen={sidebarOpen} $darkMode={isDarkMode}>
                        <S.PageTitle>로그인</S.PageTitle>
                        <GoogleLogin/>
                        <NaverLogin/>
                        <KakaoLogin/>
                    </S.MainContent>
            </S.Container>
        </>
    );
}