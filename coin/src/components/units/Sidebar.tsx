import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import * as S from "./Sidebar.styles";
import { useSidebar } from "../commons/SidebarContext";
import { useRecoilState } from "recoil";
import { darkMode } from "../commons/atoms"


export default function SideBar(): JSX.Element {
    const [spotOpen, setSpotOpen] = useState(false);
    const [futuresOpen, setFuturesOpen] = useState(false);
    const { sidebarOpen } = useSidebar();

    const toggleSpot = () => setSpotOpen(!spotOpen);
    const toggleFutures = () => setFuturesOpen(!futuresOpen);

    const [isDarkMode, setIsDarkMode] = useRecoilState(darkMode);

    return (
        <>
            <S.Sidebar open={sidebarOpen} darkMode={isDarkMode}>
                <S.Menu>
                    <S.MenuItem>
                        <S.MenuTitle onClick={toggleSpot} darkMode={isDarkMode}>
                            현물 <S.Icon><FaAngleDown className="FaAngleDown"/></S.Icon>
                        </S.MenuTitle>
                        {spotOpen && (
                            <S.SubMenu darkMode={isDarkMode}>
                                <li>현물 1</li>
                                <li>현물 2</li>
                                <li>현물 3</li>
                                <li>현물 4</li>
                            </S.SubMenu>
                        )}
                    </S.MenuItem>
                    <S.MenuItem>
                        <S.MenuTitle onClick={toggleFutures} darkMode={isDarkMode}>
                            선물 <S.Icon><FaAngleDown /></S.Icon>
                        </S.MenuTitle>
                        {futuresOpen && (
                            <S.SubMenu darkMode={isDarkMode}>
                                <li>선물 1</li>
                                <li>선물 2</li>
                                <li>선물 3</li>
                                <li>선물 4</li>
                            </S.SubMenu>
                        )}
                    </S.MenuItem>
                </S.Menu>
            </S.Sidebar>
        </>
    );
}