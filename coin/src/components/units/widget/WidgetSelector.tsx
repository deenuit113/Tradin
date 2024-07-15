import React from "react";
import * as S from "./WidgetSelector.styles";
import Widget from "./Widget";
import { darkMode } from "../../commons/atoms";
import { useRecoilState } from "recoil";

interface WidgetSelectorProps {
    addWidget: (widgetType: string) => void;
    setIsSelectorOpen: (isOpen: boolean) => void;
    availableWidgets: { type: string; name: string; icon: JSX.Element }[];
}

const WidgetSelector = ({ addWidget, setIsSelectorOpen, availableWidgets }: WidgetSelectorProps) => {
    const [isDarkMode] = useRecoilState(darkMode);

    return (
        <S.SelectorContainer>
            <S.SelectorHeader>
                <h3>위젯 추가</h3>
                <S.CloseButton onClick={() => setIsSelectorOpen(false)}>닫기</S.CloseButton>
            </S.SelectorHeader>
            <S.WidgetOptionContainer darkMode={isDarkMode}>
                {availableWidgets.map(widget => (
                    <S.WidgetOption key={widget.type} onClick={() => addWidget(widget.type)}>
                        <Widget
                            widget={{ id: widget.type, type: widget.type, name: widget.name }}
                            index={0}
                            menuOpen={null}
                            setMenuOpen={() => {}}
                            removeWidget={() => {}}
                            moveWidget={() => {}}
                        />
                    </S.WidgetOption>
                ))}
            </S.WidgetOptionContainer>
        </S.SelectorContainer>
    );
};

export default WidgetSelector;