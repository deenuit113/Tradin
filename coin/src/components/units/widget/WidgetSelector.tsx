import React from "react";
import * as S from "./WidgetSelector.styles";
import { FaBitcoin, FaEthereum } from "react-icons/fa";

interface WidgetSelectorProps {
    addWidget: (widgetType: string) => void;
    setIsSelectorOpen: (isOpen: boolean) => void;
    availableWidgets: { type: string; name: string; icon: JSX.Element }[];
}

const WidgetSelector = ({ addWidget, setIsSelectorOpen, availableWidgets }: WidgetSelectorProps) => {
    return (
        <S.SelectorContainer>
            <S.SelectorHeader>
                <h3>위젯 추가</h3>
                <S.CloseButton onClick={() => setIsSelectorOpen(false)}>닫기</S.CloseButton>
            </S.SelectorHeader>
            {availableWidgets.map(widget => (
                <S.WidgetOption key={widget.type} onClick={() => addWidget(widget.type)}>
                    {widget.icon} {widget.name}
                </S.WidgetOption>
            ))}
        </S.SelectorContainer>
    );
};

export default WidgetSelector;