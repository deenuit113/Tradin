import { useEffect } from "react";
import * as S from "../main/Login.styles";
import { useSetRecoilState } from 'recoil';
import { userInfo, loggedIn } from "../../../commons/util/atoms";

export default function KakaoLogin(): JSX.Element {
    const setUserData = useSetRecoilState(userInfo);
    const setIsLoggedIn = useSetRecoilState(loggedIn);

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
                        setUserData(userData); // Recoil 상태 업데이트
                        setIsLoggedIn(true); // 로그인 상태 업데이트
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

    const onClickKakaoLogout = () => {
        if (!(window as any).Kakao?.Auth) return;

        (window as any).Kakao.Auth.logout(() => {
            console.log("Logged out from Kakao");
            setUserData(null); // 사용자 정보 초기화
            setIsLoggedIn(false); // 로그인 상태 초기화
        });
    };

    return (
        <>
            <S.KakaoLoginButton onClick={onClickKakaoLogin}>
                <p>카카오 아이디로 로그인</p>
            </S.KakaoLoginButton>
        </>
    );
}