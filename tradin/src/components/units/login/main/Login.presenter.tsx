import * as S from "./Login.styles"
import { useSidebar } from "../../../../contexts/SidebarContext";
import NaverLogin from "../naver/NaverLogin";
import GoogleLogin from "../google/GoogleLogin";
import KakaoLogin from "../kakao/KakaoLogin";

export default function LoginPageUI(): JSX.Element {
    const { sidebarOpen } = useSidebar();

    return (
        <>
            <S.Container>
                    <S.MainContent sidebarOpen={sidebarOpen}>
                        <S.PageTitle>로그인</S.PageTitle>
                        <GoogleLogin/>
                        <NaverLogin/>
                        <KakaoLogin/>
                    </S.MainContent>
            </S.Container>
        </>
    );
}