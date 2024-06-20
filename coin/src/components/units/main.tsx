import { useState } from "react";
import * as S from "./Main.styles";
import { useSidebar } from "../commons/SidebarContext";
import SideBar from "./Sidebar";

export default function MainPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();

    return (
        <S.Container>
            <SideBar/>
            <S.MainContent sidebarOpen={sidebarOpen}>
                <h1>Welcome to the Project</h1>
                <p>This is the main content area.</p>
            </S.MainContent>
        </S.Container>
    );
}