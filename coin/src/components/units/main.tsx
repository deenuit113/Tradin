import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import * as S from "./Main.styles";
import { useSidebar } from "../commons/SidebarContext";

export default function MainPage(): JSX.Element {
    const [spotOpen, setSpotOpen] = useState(false);
    const [futuresOpen, setFuturesOpen] = useState(false);
    const { sidebarOpen } = useSidebar();

    const toggleSpot = () => setSpotOpen(!spotOpen);
    const toggleFutures = () => setFuturesOpen(!futuresOpen);

    return (
        <S.Container>
            <S.Sidebar open={sidebarOpen}>
                <S.Menu>
                    <S.MenuItem>
                        <S.MenuTitle onClick={toggleSpot}>
                            현물 <S.Icon><FaAngleDown /></S.Icon>
                        </S.MenuTitle>
                        {spotOpen && (
                            <S.SubMenu>
                                <li>현물 1</li>
                                <li>현물 2</li>
                                <li>현물 3</li>
                                <li>현물 4</li>
                            </S.SubMenu>
                        )}
                    </S.MenuItem>
                    <S.MenuItem>
                        <S.MenuTitle onClick={toggleFutures}>
                            선물 <S.Icon><FaAngleDown /></S.Icon>
                        </S.MenuTitle>
                        {futuresOpen && (
                            <S.SubMenu>
                                <li>선물 1</li>
                                <li>선물 2</li>
                                <li>선물 3</li>
                                <li>선물 4</li>
                            </S.SubMenu>
                        )}
                    </S.MenuItem>
                </S.Menu>
            </S.Sidebar>
            <S.MainContent sidebarOpen={sidebarOpen}>
                <h1>Welcome to the Project</h1>
                <p>This is the main content area.</p>
            </S.MainContent>
        </S.Container>
    );
}