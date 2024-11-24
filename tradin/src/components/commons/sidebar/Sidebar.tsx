'use client';

import { useEffect, useState } from "react";
import { FaAngleDown, FaCalendarAlt, FaClock, FaExchangeAlt } from "react-icons/fa";
import { useSidebar } from "../../../contexts/SidebarContext";
import { useRouter } from 'next/navigation';
import { Box, Center, Collapsible } from "@chakra-ui/react";
import * as C from "./styles/Sidebar.components";

export default function SideBar(): JSX.Element {
    const [spotOpen, setSpotOpen] = useState(false);
    const [futuresOpen, setFuturesOpen] = useState(false);
    const { sidebarOpen, setSidebarOpen, sidebarRef, sidebarButtonRef } = useSidebar();
    const router = useRouter();

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
        <C.SidebarContainer ref={sidebarRef} sidebarOpen={sidebarOpen}>
            <C.Menu>
                {/* 현물 메뉴 */}
                <Collapsible.Root>
                    <Collapsible.Trigger asChild>
                        <C.ItemContainer
                            onClick={() => setSpotOpen(!spotOpen)}
                        >
                            <C.MenuTitle onClick={onClickMoveToSpot}>
                                <FaExchangeAlt className="MenuIcon" />
                                <Box marginLeft="1rem">현물</Box>
                            </C.MenuTitle>
                            <Center width="20%" height="100%">
                                <FaAngleDown
                                    className="FaAngleDown"
                                    style={{
                                        transform: spotOpen ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "transform 0.3s ease",
                                    }}
                                />
                            </Center>
                        </C.ItemContainer>
                    </Collapsible.Trigger>

                    <Collapsible.Content>
                        <Box
                            as="ul"
                            listStyleType="none"
                            paddingLeft="10%"
                            marginBottom={spotOpen ? "1rem" : "0"}
                        >
                            {[1, 2, 3].map((num) => (
                                <Box
                                    key={num}
                                    as="li"
                                    fontSize="12px"
                                    padding="1rem"
                                    cursor="pointer"
                                    borderRadius="5px"
                                    _hover={{ backgroundColor: "gray.700" }}
                                    onClick={() => onClickMoveToSpotStrategy(num)}
                                >
                                    현물 {num}
                                </Box>
                            ))}
                        </Box>
                    </Collapsible.Content>
                </Collapsible.Root>
                {/* 현물 메뉴 */}
                <Collapsible.Root>
                    <Collapsible.Trigger asChild>
                        <C.ItemContainer
                            onClick={() => setFuturesOpen(!futuresOpen)}
                        >
                            <C.MenuTitle onClick={onClickMoveToFutures}>
                                <FaClock className="MenuIcon" />
                                <Box marginLeft="1rem">선물</Box>
                            </C.MenuTitle>
                            <Center width="20%" height="100%">
                                <FaAngleDown
                                    className="FaAngleDown"
                                    style={{
                                        transform: futuresOpen ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "transform 0.3s ease",
                                    }}
                                />
                            </Center>
                        </C.ItemContainer>
                    </Collapsible.Trigger>

                    <Collapsible.Content>
                        <Box
                            as="ul"
                            listStyleType="none"
                            paddingLeft="10%"
                        >
                            {[1, 2, 3].map((num) => (
                                <Box
                                    key={num}
                                    as="li"
                                    fontSize="12px"
                                    padding="1rem"
                                    cursor="pointer"
                                    borderRadius="5px"
                                    _hover={{ backgroundColor: "gray.700" }}
                                >
                                    선물 {num}
                                </Box>
                            ))}
                        </Box>
                    </Collapsible.Content>
                </Collapsible.Root>
                {/* 백테스트 메뉴 */}
                <C.ItemContainer>
                    <C.MenuTitle onClick={onClickMoveToBackTest}>
                        <FaCalendarAlt className="MenuIcon" />
                        <Box marginLeft="1rem">백테스트</Box>
                    </C.MenuTitle>
                </C.ItemContainer>
            </C.Menu>
        </C.SidebarContainer>
    );
}