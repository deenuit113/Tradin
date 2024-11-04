import { useEffect } from "react";
import * as S from "../main/Login.styles";
import { useUser } from "../../../../contexts/UserContext";

export default function KakaoLogin(): JSX.Element {
    const { setUser, setLoggedIn } = useUser();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        
        const kakaoAppKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
        script.onload = () => {
            if ((window as any).Kakao && kakaoAppKey !== undefined) {
                (window as any).Kakao.init(kakaoAppKey);
                console.log((window as any).Kakao.isInitialized());
            } else {
                console.error("Kakao App Key is undefined.");
            }
        };
    }, []);

    const onClickKakaoLogin = () => {
        if (!(window as any).Kakao?.Auth) return;

        (window as any).Kakao.Auth.login({
            success: function (authObj: any) {
                console.log(authObj);
                (window as any).Kakao.API.request({
                    url: "/v2/user/me",
                    success: (res: any) => {
                        console.log(res);
                        const userData = {
                            id: res.id,
                            email: res.kakao_account?.email ?? null,
                            displayName: res.properties?.nickname ?? null,
                            photoUrl: res.properties?.profile_image ?? null,
                        };
                        setUser(userData);
                        setLoggedIn(true);
                    },
                    fail: function (error: any) {
                        console.log(error);
                    },
                });
            },
            fail: function (err: any) {
                console.error(err);
            },
        });
    };

    return (
        <>
            <S.KakaoLoginButton onClick={onClickKakaoLogin}>
                <img src='/kakao-logo.svg' width={30} height={30}/>
                <p>카카오 아이디로 로그인</p>
            </S.KakaoLoginButton>
        </>
    );
}