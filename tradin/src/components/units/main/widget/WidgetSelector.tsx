import React, { useEffect, useState, useRef } from "react";
import * as S from "./WidgetSelector.styles";
import Widget from "./Widget";
import { currencyKRW } from "../../../../util/atoms";
import { useRecoilState } from "recoil";
import { useSpring, animated } from "react-spring";
import { useExchangeRate } from "../../../../hooks/useExchangeRate";
import { FaTimes } from "react-icons/fa";

interface WidgetSelectorProps {
    addWidget: (widgetType: string) => void;
    setIsSelectorOpen: (isOpen: boolean) => void;
    availableWidgets: { type: string; name: string; icon: JSX.Element }[];
    isOpen: boolean;
}

const WidgetSelector = ({ addWidget, setIsSelectorOpen, availableWidgets, isOpen }: WidgetSelectorProps) => {
    const WidgetSelectorRef = useRef<HTMLDivElement>(null);
    const [closing, setClosing] = useState(false);
    const [isCurrencyKRW] = useRecoilState(currencyKRW);

    const { exchangeRate, timestamp } = useExchangeRate();

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

    const OnClickCloseWidgetSelector = () => {
        setClosing(true);
        setIsSelectorOpen(false);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                OnClickCloseWidgetSelector();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (WidgetSelectorRef.current && !WidgetSelectorRef.current.contains(event.target as Node)) {
                setIsSelectorOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsSelectorOpen]);

    return (
        <S.SelectorContainer ref={WidgetSelectorRef} style={slideInAnimation}>
            <S.SelectorHeader>
                <S.SelectorHeaderTitle>위젯 추가</S.SelectorHeaderTitle>
                <S.CloseButton onClick={OnClickCloseWidgetSelector}><FaTimes/></S.CloseButton>
            </S.SelectorHeader>
            <S.WidgetOptionContainer>
                {availableWidgets.length > 0 ? (
                    availableWidgets.map(widget => (
                        <S.WidgetOption key={`${widget.type}`} onClick={() => addWidget(widget.type)}>
                            <Widget
                                widget={{ id: `${widget.type}`, type: widget.type, name: widget.name }} // 고유한 ID 생성
                                index={0}
                                menuOpen={null}
                                setMenuOpen={() => {}}
                                removeWidget={() => {}}
                                moveWidget={() => {}}
                                onClickWidget={(symbol: string) => {}}
                                isCurrencyKRW={isCurrencyKRW}
                                exchangeRate={exchangeRate}
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