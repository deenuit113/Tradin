import React, { useEffect, useState } from "react";
import * as S from "./WidgetSelector.styles";
import Widget from "./Widget";
import { darkMode } from "../../commons/atoms";
import { useRecoilState } from "recoil";
import { useSpring, animated } from "react-spring";

interface WidgetSelectorProps {
    addWidget: (widgetType: string) => void;
    setIsSelectorOpen: (isOpen: boolean) => void;
    availableWidgets: { type: string; name: string; icon: JSX.Element }[];
    isOpen: boolean;
}

const WidgetSelector = ({ addWidget, setIsSelectorOpen, availableWidgets, isOpen }: WidgetSelectorProps) => {
    const [isDarkMode] = useRecoilState(darkMode);
    const [closing, setClosing] = useState(false);

    const slideInAnimation = useSpring({
        transform: isOpen ? 'translateY(0%)' : 'translateY(100%)',
        config: { tension: 100, friction: 20 },
        onRest: () => {
            if (closing) {
                setIsSelectorOpen(false);
                setClosing(false);
            }
        }
    });

    const handleClose = () => {
        setClosing(true);
        setIsSelectorOpen(false);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <S.SelectorContainer as={animated.div} style={slideInAnimation} darkMode={isDarkMode}>
            <S.SelectorHeader>
                <S.SelectorHeaderTitle darkMode={isDarkMode}>위젯 추가</S.SelectorHeaderTitle>
                <S.CloseButton darkMode={isDarkMode} onClick={handleClose}>&times;</S.CloseButton>
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