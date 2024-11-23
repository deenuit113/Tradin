'use client';

import { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaCalendarAlt, FaClock, FaExchangeAlt, FaPlusCircle } from "react-icons/fa";
import * as S from "./Sidebar.styles";
import { useSidebar } from "../../../contexts/SidebarContext";
import { useRouter } from 'next/navigation';

export default function SideBar(): JSX.Element {
    const [spotOpen, setSpotOpen] = useState(false);
    const [futuresOpen, setFuturesOpen] = useState(false);
    const { sidebarOpen, setSidebarOpen, sidebarRef, sidebarButtonRef } = useSidebar();
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

    // 사이드바 외부 클릭했을 시 사이드바 닫음
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node) &&
                sidebarButtonRef.current &&
                !sidebarButtonRef.current.contains(event.target as Node)
            ) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setSidebarOpen, sidebarRef, sidebarButtonRef]);

    return (
        <>
            <S.Sidebar ref={sidebarRef} open={sidebarOpen}>
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