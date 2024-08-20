import React from "react";
import * as S from "./Chart.styles"
import CoinChart from "./CoinChart";

interface ChartPopupProps {
    symbol: string;
    onClose: () => void;
    $darkMode: boolean;
}

const ChartPopup: React.FC<ChartPopupProps> = ({ symbol, onClose, $darkMode }) => {
    return (
        <S.PopupContainer $darkMode={$darkMode}>
            <S.CloseButton onClick={onClose} $darkMode={$darkMode} >×</S.CloseButton>
            <CoinChart symbol={symbol} $darkMode={$darkMode} />
        </S.PopupContainer>
    );
};

export default ChartPopup;