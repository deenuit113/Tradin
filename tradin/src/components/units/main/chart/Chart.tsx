import React, { useEffect, useRef } from "react";
import * as S from "./Chart.styles"
import CoinChart from "./CoinChart";

interface ChartPopupProps {
    symbol: string;
    onClose: () => void;
}

const ChartPopup: React.FC<ChartPopupProps> = ({ symbol, onClose }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);
    
    return (
        <S.PopupContainer ref={popupRef}>
            <S.CloseButton onClick={onClose}>×</S.CloseButton>
            <CoinChart symbol={symbol}/>
        </S.PopupContainer>
    );
};

export default ChartPopup;