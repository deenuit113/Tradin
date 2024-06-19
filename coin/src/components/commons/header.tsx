import NavBar from "./Nav";
import { useRouter } from "next/router";
import * as S from "./Header.styles";
import { FaBars } from "react-icons/fa";
import { useSidebar } from "./SidebarContext";

export default function Header(): JSX.Element {
    const router = useRouter();
    const { toggleSidebar } = useSidebar();

    const handleTitleClick = () => {
        if (router.pathname === "/") {
            router.reload();
        } else {
            router.push("/");
        }
    };

    return (
        <S.HeaderContainer>
            <S.Left>
                <S.ToggleButton onClick={toggleSidebar}>
                    <FaBars />
                </S.ToggleButton>
                <S.Title onClick={handleTitleClick}>name</S.Title>
                <NavBar />
            </S.Left>
            <S.Center>
                <S.Marquee>
                    <p>공시 공시 공시 공시 공시 공시 공시 공시 공시 공시 공시 공시 공시</p>
                </S.Marquee>
            </S.Center>
            <S.Right>
                <S.IconList>
                    <S.IconListItem>Icon 1</S.IconListItem>
                    <S.IconListItem>Icon 2</S.IconListItem>
                </S.IconList>
            </S.Right>
        </S.HeaderContainer>
    );
}