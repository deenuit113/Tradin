import { useEffect } from "react";
import * as S from "../main/Login.styles";
import { useRecoilState } from "recoil";
import { darkMode } from "../../../../util/atoms";

export default function NaverLogin(): JSX.Element {
    const [isDarkMode, setIsDarkMode] = useRecoilState(darkMode);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
        script.defer = true;
        script.charset = "utf-8";
        document.body.appendChild(script);

        script.onload = () => {
            // 스크립트 로드 후 실행할 코드
            const naverLogin = new (window as any).naver.LoginWithNaverId({
                clientId: "mBumTUOt1vMDFmGCay8f",
                callbackUrl: "http://localhost:3000", // 콜백 URL
                isPopup: true, 
                loginButton: { color: "green", type: 1, width: 40, height: 40 }, 
            });
            naverLogin.init();
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <S.NaverLoginButton>
            <S.NaverLogo src={isDarkMode ? '/naver-dark-logo.png' : '/naver-logo.png'} />
            {/* <div id="naverIdLogin" /> */}
        </S.NaverLoginButton>
    );
}