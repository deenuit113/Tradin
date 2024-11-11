import { useEffect } from "react";
import { useUser } from "../../../../contexts/UserContext";
import { IconButton, Image } from "@chakra-ui/react"

export default function KakaoLogin(): JSX.Element {
    const { setUser, setLoggedIn, setLoginType } = useUser();

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
                        setLoginType("kakao");
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
            <IconButton variant="outline" onClick={onClickKakaoLogin}>
                <Image src='/kakao-logo.svg' width="37px" height="37px"/>
            </IconButton>
        </>
    );
}