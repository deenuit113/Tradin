import * as S from "./Profile.styles";
import { useSidebar } from "../../commons/sidebar/SidebarContext";
import Breadcrumb from "../../commons/breadcrumb/BreadCrumb";

export default function ProfilePage() {
    const { sidebarOpen } = useSidebar();

    return (
        <>
            <S.Container>
                <S.ProfileHeader sidebarOpen={sidebarOpen}>
                    <Breadcrumb/>
                </S.ProfileHeader>
                <S.MainContent sidebarOpen={sidebarOpen}>

                </S.MainContent>
            </S.Container>
        </>
    );
}