import { useEffect } from "react";
import { useColorMode } from "@/components/ui/color-mode";
import { IconButton, Image } from "@chakra-ui/react";

export default function NaverLogin(): JSX.Element {
    const { colorMode } = useColorMode();
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

    useEffect(() => {
        console.log(colorMode);
    },[colorMode]);

    return (
        <IconButton variant="outline">
            <Image 
                src={colorMode === 'dark' ? '/naver-dark-logo.png' : '/naver-logo.png'}
                width="38px" height="38px"    
            />
        </IconButton>
    );
}