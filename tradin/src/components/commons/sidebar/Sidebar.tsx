'use client';

import { useState } from "react";
import { FaAngleDown, FaCalendarAlt, FaClock, FaExchangeAlt, FaPlusCircle } from "react-icons/fa";
import * as S from "./Sidebar.styles";
import { useSidebar } from "./SidebarContext";
import { useRouter } from 'next/navigation';

export default function SideBar(): JSX.Element {
    const [spotOpen, setSpotOpen] = useState(false);
    const [futuresOpen, setFuturesOpen] = useState(false);
    const { sidebarOpen } = useSidebar();
    const router = useRouter();

    const toggleSpot = () => setSpotOpen(!spotOpen);
    const toggleFutures = () => setFuturesOpen(!futuresOpen);

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

    const onClickMoveToBackTest = () => {
        router.push('/backtest');
    };

    return (
        <>
            <S.Sidebar open={sidebarOpen}>
                <S.Menu>
                    <S.ItemContainer onClick={onClickMoveToSpot}>
                        <S.MenuTitle>
                            <FaExchangeAlt className="MenuIcon"/> <p>현물</p>
                        </S.MenuTitle>
                        <S.Icon onClick={(e) => { e.stopPropagation(); toggleSpot(); }} isOpen={spotOpen}>
                            <FaAngleDown className="FaAngleDown" />
                        </S.Icon>
                    </S.ItemContainer>
                    <S.SubMenu isOpen={spotOpen}>
                        {[1, 2, 3].map((num, index) => (
                            <S.MenuItem key={num} index={4 - index} isOpen={spotOpen} onClick={() => onClickMoveToSpotStrategy(num)}>
                                현물 {num}
                            </S.MenuItem>
                        ))}
                        {/* <S.MenuItem index={0} isOpen={spotOpen}><FaPlusCircle /></S.MenuItem> */}
                        {/* 추후 전략 추가 기능 추가 */}
                    </S.SubMenu>
                    <S.ItemContainer onClick={onClickMoveToFutures}>
                        <S.MenuTitle>
                            <FaClock className="MenuIcon"/><p>선물</p>
                        </S.MenuTitle>
                        <S.Icon onClick={(e) => { e.stopPropagation(); toggleFutures(); }} isOpen={futuresOpen}>
                            <FaAngleDown className="FaAngleDown" />
                        </S.Icon>
                    </S.ItemContainer>
                    <S.SubMenu isOpen={futuresOpen}>
                        {[1, 2, 3].map((num, index) => (
                            <S.MenuItem key={num} index={4 - index} isOpen={futuresOpen} onClick={() => onClickMoveToFutureStrategy(num)}>
                                선물 {num}
                            </S.MenuItem>
                        ))}
                        {/* <S.MenuItem index={0} isOpen={futuresOpen}><FaPlusCircle /></S.MenuItem> */}
                        {/* 추후 전략 추가 기능 추가 */}
                    </S.SubMenu>
                    <S.ItemContainer>
                        <S.MenuTitle onClick={onClickMoveToBackTest}>
                            <FaCalendarAlt className="MenuIcon"/><p>백테스트</p>
                        </S.MenuTitle>
                    </S.ItemContainer>
                </S.Menu>
            </S.Sidebar>
        </>
    );
}