'use client'

import { useSidebar } from "../../../commons/sidebar/SidebarContext";
import * as S from "./SkeletonUI.styles";

export default function BackTestPageSkeletonUI() {
    const { sidebarOpen } = useSidebar();
    return (
        <S.Container>
            <S.BackTestHeader sidebarOpen={sidebarOpen}/>
            <S.MainContent sidebarOpen={sidebarOpen}>
                <S.OptionsContainer>
                    
                </S.OptionsContainer>
            </S.MainContent>
        </S.Container>
    )
}