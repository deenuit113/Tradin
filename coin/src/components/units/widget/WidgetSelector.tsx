import React from "react";
import * as S from "./WidgetSelector.styles"
import { FaBitcoin, FaEthereum } from "react-icons/fa";

interface WidgetSelectorProps {
    addWidget: (widgetType: string) => void;
    setIsSelectorOpen: (open: boolean) => void;
}

export const WidgetSelector = ({ addWidget, setIsSelectorOpen }: WidgetSelectorProps) => {
    return (
        <S.SelectorContainer>
            <S.SelectorHeader>위젯 선택</S.SelectorHeader>
            <S.WidgetOption onClick={() => { addWidget('bitcoin'); setIsSelectorOpen(false); }}>
                <FaBitcoin /> 비트코인 위젯
            </S.WidgetOption>
            <S.WidgetOption onClick={() => { addWidget('ethereum'); setIsSelectorOpen(false); }}>
                <FaEthereum /> 이더리움 위젯
            </S.WidgetOption>
        </S.SelectorContainer>
    );
};