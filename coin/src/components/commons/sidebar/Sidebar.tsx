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
                            <p>현물</p>
                        </S.MenuTitle>
                        <S.Icon onClick={(e) => { e.stopPropagation(); toggleSpot(); }} darkMode={isDarkMode} isOpen={spotOpen}>
                            <FaAngleDown className="FaAngleDown" />
                        </S.Icon>
                    </S.ItemContainer>
                    <S.SubMenu darkMode={isDarkMode} isOpen={spotOpen}>
                        {[1, 2, 3, 4].map((num, index) => (
                            <S.MenuItem key={num} index={4 - index} isOpen={spotOpen} onClick={() => onClickMoveToSpotStrategy(num)}>
                                현물 {num}
                            </S.MenuItem>
                        ))}
                        <S.MenuItem index={0} isOpen={spotOpen}><FaPlusCircle /></S.MenuItem>
                    </S.SubMenu>
                    <S.ItemContainer darkMode={isDarkMode} onClick={onClickMoveToFutures}>
                        <S.MenuTitle darkMode={isDarkMode}>
                            <p>선물</p>
                        </S.MenuTitle>
                        <S.Icon onClick={(e) => { e.stopPropagation(); toggleFutures(); }} darkMode={isDarkMode} isOpen={futuresOpen}>
                            <FaAngleDown className="FaAngleDown" />
                        </S.Icon>
                    </S.ItemContainer>
                    <S.SubMenu darkMode={isDarkMode} isOpen={futuresOpen}>
                        {[1, 2, 3, 4].map((num, index) => (
                            <S.MenuItem key={num} index={4 - index} isOpen={futuresOpen} onClick={() => onClickMoveToFutureStrategy(num)}>
                                선물 {num}
                            </S.MenuItem>
                        ))}
                        <S.MenuItem index={0} isOpen={futuresOpen}><FaPlusCircle /></S.MenuItem>
                    </S.SubMenu>
                </S.Menu>
            </S.Sidebar>
        </>
    );
}