import { useState } from "react";
import * as S from "./Main.styles";
import { useSidebar } from "../commons/SidebarContext";
import SideBar from "./Sidebar";

import { useRecoilState } from "recoil";
import { darkMode } from "../commons/atoms"

export default function SpotPage(): JSX.Element {
    const [widgets, setWidgets] = useState<string[]>([]);
    const [menuOpen, setMenuOpen] = useState<number | null>(null);

    const [isDarkMode, setIsDarkMode] = useRecoilState(darkMode);


    return (
        <S.Container darkMode={isDarkMode}>
            <SideBar />
        </S.Container>
    );
}