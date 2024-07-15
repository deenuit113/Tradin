import React from "react";
import * as S from "./WidgetSelector.styles";
import Widget from "./Widget";
import { darkMode } from "../../commons/atoms";
import { useRecoilState } from "recoil";
import { useSpring, animated } from "react-spring";

interface WidgetSelectorProps {
    addWidget: (widgetType: string) => void;
    setIsSelectorOpen: (isOpen: boolean) => void;
    availableWidgets: { type: string; name: string; icon: JSX.Element }[];
}

const WidgetSelector = ({ addWidget, setIsSelectorOpen, availableWidgets }: WidgetSelectorProps) => {
    const [isDarkMode] = useRecoilState(darkMode);
    
    const slideInAnimation = useSpring({
        transform: 'translateY(0%)',
        from: { transform: 'translateY(100%)' },
    });

    return (
        <S.SelectorContainer as={animated.div} style={slideInAnimation} darkMode={isDarkMode}>
            <S.SelectorHeader>
                <S.SelectorHeaderTitle darkMode={isDarkMode}>위젯 추가</S.SelectorHeaderTitle>
                <S.CloseButton darkMode={isDarkMode} onClick={() => setIsSelectorOpen(false)}>닫기</S.CloseButton>
            </S.SelectorHeader>
            <S.WidgetOptionContainer darkMode={isDarkMode}>
                {availableWidgets.length > 0 ? (
                    availableWidgets.map(widget => (
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
                    ))
                ) : (
                    <S.NoWidgetMessage>추가할 위젯이 없습니다</S.NoWidgetMessage>
                )}
            </S.WidgetOptionContainer>
        </S.SelectorContainer>
    );
};

export default WidgetSelector;