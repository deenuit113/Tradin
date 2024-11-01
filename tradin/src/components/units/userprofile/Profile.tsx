import * as S from "./Profile.styles";
import { useSidebar } from "../../commons/sidebar/SidebarContext";
import Breadcrumb from "../../commons/breadcrumb/BreadCrumb";
import { useUser } from "../../../contexts/UserContext";
import { FaUser } from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { signOut } from "firebase/auth";
import { auth } from "../../commons/util/firebase";

export default function ProfilePage() {
    const { sidebarOpen } = useSidebar();
    const { user, setUser, loggedIn, setLoggedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loggedIn) {
            router.push('/'); // 사용자가 로그인되어 있으면 메인 페이지로 리다이렉트
        }
    }, [loggedIn, router]);

    const onClickSignOut = () => {
        signOut(auth) // 구글 로그아웃
            .then(() => {
                console.log("Signed out successfully");
                setUser({
                    id: null,
                    email: null,
                    displayName: null,
                    photoUrl: null,
                });
                setLoggedIn(false);
            }).catch((error) => {
                console.log(error);
            });

        if ((window as any).Kakao?.Auth) { // 카카오 로그아웃
            (window as any).Kakao.Auth.logout(() => {
                console.log("Logged out from Kakao");
                setUser({
                    id: null,
                    email: null,
                    displayName: null,
                    photoUrl: null,
                });
                setLoggedIn(false);
            });
        }
    }

    return (
        <>
            <S.Container>
                <S.ProfileHeader sidebarOpen={sidebarOpen}>
                    <Breadcrumb/>
                </S.ProfileHeader>
                <S.MainContent sidebarOpen={sidebarOpen}>
                    {user?.photoUrl ? (
                        <S.UserImg
                            src={user.photoUrl}
                            alt={user.displayName ?? 'User profile picture'}
                        />
                    ) : (
                        <FaUser/>
                    )}
                    <S.SignOutButton onClick={onClickSignOut}>로그아웃</S.SignOutButton>
                    <S.UserInfoContainer>
                        <S.UserInfoTitleContainer>
                            {user.displayName ? <S.UserInfoTitle>이름</S.UserInfoTitle> : <></>}
                            {user.email ? <S.UserInfoTitle>이메일</S.UserInfoTitle> : <></>}
                        </S.UserInfoTitleContainer>

                        <S.UserInfoDataContainer>
                            {user.displayName ? <S.UserInfoData>{user.displayName}</S.UserInfoData> : <></>}
                            {user.email ? <S.UserInfoData>{user.email}</S.UserInfoData> : <></>}
                        </S.UserInfoDataContainer>
                    </S.UserInfoContainer>
                </S.MainContent>
            </S.Container>
        </>
    );
}