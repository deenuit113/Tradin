import NavBar from "./nav";
import Link from "next/link";
import { useRouter } from "next/router";
import * as S from "./header.styles"

export default function Header(): JSX.Element {
    const router = useRouter();

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