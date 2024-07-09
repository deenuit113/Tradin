import { useState } from "react";
import { FaAngleDown, FaPlusCircle } from "react-icons/fa";
import * as S from "./Sidebar.styles";
import { useSidebar } from "./SidebarContext";
import { useRecoilState } from "recoil";
import { darkMode } from "../atoms";
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
        router.push('/future');
    };

    const onClickMoveToSpotStrategy = (id: number) => {
        router.push(`/spot/${id}`);
    };

    const onClickMoveToFutureStrategy = (id: number) => {
        router.push(`/future/${id}`);
    };
    
    return (
        <>
            <S.Sidebar open={sidebarOpen} darkMode={isDarkMode}>
                <S.Menu>
                    <S.ItemContainer darkMode={isDarkMode} onClick={onClickMoveToSpot}>
                        <S.MenuTitle darkMode={isDarkMode}>
                            현물
                        </S.MenuTitle>
                        <S.Icon onClick={toggleSpot} darkMode={isDarkMode}>
                            <FaAngleDown className="FaAngleDown"/>
                        </S.Icon>
                    </S.ItemContainer>
                    {spotOpen && (
                        <S.SubMenu darkMode={isDarkMode}>
                            {[1, 2, 3, 4].map((num) => (
                                <S.MenuItem key={num} onClick={() => onClickMoveToSpotStrategy(num)}>
                                    현물 {num}
                                </S.MenuItem>
                            ))}
                            <S.MenuItem><FaPlusCircle /></S.MenuItem>
                        </S.SubMenu>
                    )}
                    <S.ItemContainer darkMode={isDarkMode} onClick={onClickMoveToFutures}>
                        <S.MenuTitle darkMode={isDarkMode}>
                            선물
                        </S.MenuTitle>
                        <S.Icon onClick={toggleFutures} darkMode={isDarkMode}>
                            <FaAngleDown className="FaAngleDown"/>
                        </S.Icon>
                    </S.ItemContainer>
                    {futuresOpen && (
                        <S.SubMenu darkMode={isDarkMode}>
                            {[1, 2, 3, 4].map((num) => (
                                <S.MenuItem key={num} onClick={() => onClickMoveToFutureStrategy(num)}>
                                    선물 {num}
                                </S.MenuItem>
                            ))}
                            <S.MenuItem><FaPlusCircle /></S.MenuItem>
                        </S.SubMenu>
                    )}
                </S.Menu>
            </S.Sidebar>
        </>
    );
}