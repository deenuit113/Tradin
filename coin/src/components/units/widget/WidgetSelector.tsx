import React from "react";
import * as S from "./WidgetSelector.styles";
import { FaBitcoin, FaEthereum } from "react-icons/fa";

interface WidgetSelectorProps {
    addWidget: (widgetType: string) => void;
    setIsSelectorOpen: (isOpen: boolean) => void;
}

const WidgetSelector = ({ addWidget, setIsSelectorOpen }: WidgetSelectorProps) => {
    return (
        <S.SelectorContainer>
            <S.SelectorHeader>
                <h3>위젯 추가</h3>
                <S.CloseButton onClick={() => setIsSelectorOpen(false)}>닫기</S.CloseButton>
            </S.SelectorHeader>
            <S.WidgetOption onClick={() => addWidget('bitcoin')}><FaBitcoin/>비트코인 가격</S.WidgetOption>
            <S.WidgetOption onClick={() => addWidget('ethereum')}><FaEthereum/>이더리움 가격</S.WidgetOption>
        </S.SelectorContainer>
    );
};

export default WidgetSelector;