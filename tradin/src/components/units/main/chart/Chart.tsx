import React, { useEffect, useRef } from "react";
import CoinChart from "./CoinChart";
import * as C from "./styles/CryptoChart.components"
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
        <C.CryptoChartContainer ref={popupRef}>
            <CoinChart symbol={symbol}/>
        </C.CryptoChartContainer>
    );
};

export default ChartPopup;