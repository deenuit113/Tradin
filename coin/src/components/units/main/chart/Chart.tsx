import React, { useEffect, useRef } from "react";
import * as S from "./Chart.styles"
import CoinChart from "./CoinChart";

interface ChartPopupProps {
    symbol: string;
    onClose: () => void;
    $darkMode: boolean;
}

const ChartPopup: React.FC<ChartPopupProps> = ({ symbol, onClose, $darkMode }) => {
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
        <S.PopupContainer $darkMode={$darkMode} ref={popupRef}>
            <S.CloseButton onClick={onClose} $darkMode={$darkMode} >×</S.CloseButton>
            <CoinChart symbol={symbol} $darkMode={$darkMode} />
        </S.PopupContainer>
    );
};

export default ChartPopup;