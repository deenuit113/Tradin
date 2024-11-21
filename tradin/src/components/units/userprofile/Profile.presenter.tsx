import { useSidebar } from "../../../contexts/SidebarContext";
import Breadcrumb from "../../commons/breadcrumb/BreadCrumb.container";
import { useUser } from "../../../contexts/UserContext";
import { FaUser } from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { signOut } from "firebase/auth";
import { auth } from "../../../util/firebase";
import { Avatar } from "@/components/ui/avatar";
import { Box, Button, Icon } from "@chakra-ui/react";
import * as C from "./styles/Profile.components";

export default function ProfilePageUI() {
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
            <C.Container>
                <C.Header sidebarOpen={sidebarOpen}>
                    <Breadcrumb/>
                </C.Header>
                <C.MainContent sidebarOpen={sidebarOpen}>
                    <Avatar
                        size="2xl"
                        name={user.displayName ?? 'User'}
                        src={user.photoUrl ?? undefined}
                        icon={<Icon as={FaUser} />}
                        shape="rounded"
                    />
                    <Button size="xs" borderColor="borderColor" rounded="md" variant="outline" onClick={onClickSignOut}>로그아웃</Button>
                    <C.UserInfoContainer>
                        <C.UserInfoTitleContainer>
                            {user.displayName ? <C.UserInfoTitle>이름</C.UserInfoTitle> : <></>}
                            {user.email ? <C.UserInfoTitle>이메일</C.UserInfoTitle> : <></>}
                        </C.UserInfoTitleContainer>

                        <C.UserInfoDataContainer>
                            {user.displayName ? <C.UserInfoData>{user.displayName}</C.UserInfoData> : <></>}
                            {user.email ? <C.UserInfoData>{user.email}</C.UserInfoData> : <></>}
                        </C.UserInfoDataContainer>
                    </C.UserInfoContainer>
                </C.MainContent>
            </C.Container>
        </>
    );
}