import { useState } from "react";
import { FaAngleDown, FaPlusCircle } from "react-icons/fa";
import * as S from "./Sidebar.styles";
import { useSidebar } from "../commons/SidebarContext";
import { useRecoilState } from "recoil";
import { darkMode } from "../commons/atoms";
import { useRouter } from 'next/router';
export default function SideBar(): JSX.Element {
    const [spotOpen, setSpotOpen] = useState(false);
    const [futuresOpen, setFuturesOpen] = useState(false);
    const { sidebarOpen } = useSidebar();
    const router = useRouter();

    const toggleSpot = () => setSpotOpen(!spotOpen);
    const toggleFutures = () => setFuturesOpen(!futuresOpen);

    const [isDarkMode, setIsDarkMode] = useRecoilState(darkMode);

    const onClickMoveToSpot = () => {
        router.push('/spot');
    };

    const onClickMoveToFutures = () => {
        router.push('/futures');
    };
    
    return (
        <>
            <S.Sidebar open={sidebarOpen} darkMode={isDarkMode}>
                <S.Menu>
                    <S.ItemContainer>
                        <S.MenuTitle darkMode={isDarkMode} onClick={onClickMoveToSpot}>
                            현물
                        </S.MenuTitle>
                        <S.Icon onClick={toggleSpot} darkMode={isDarkMode}>
                            <FaAngleDown className="FaAngleDown"/>
                        </S.Icon>
                    </S.ItemContainer>
                    {spotOpen && (
                        <S.SubMenu darkMode={isDarkMode}>
                            <S.MenuItem>현물 1</S.MenuItem>
                            <S.MenuItem>현물 2</S.MenuItem>
                            <S.MenuItem>현물 3</S.MenuItem>
                            <S.MenuItem>현물 4</S.MenuItem>
                            <S.MenuItem><FaPlusCircle/></S.MenuItem>
                        </S.SubMenu>
                    )}
                    <S.ItemContainer>
                        <S.MenuTitle darkMode={isDarkMode} onClick={onClickMoveToFutures}>
                            선물
                        </S.MenuTitle>
                        <S.Icon onClick={toggleFutures} darkMode={isDarkMode}>
                            <FaAngleDown className="FaAngleDown"/>
                        </S.Icon>
                    </S.ItemContainer>
                    {futuresOpen && (
                        <S.SubMenu darkMode={isDarkMode}>
                            <S.MenuItem>선물 1</S.MenuItem>
                            <S.MenuItem>선물 2</S.MenuItem>
                            <S.MenuItem>선물 3</S.MenuItem>
                            <S.MenuItem>선물 4</S.MenuItem>
                            <S.MenuItem><FaPlusCircle/></S.MenuItem>
                        </S.SubMenu>
                    )}
                </S.Menu>
            </S.Sidebar>
        </>
    );
}