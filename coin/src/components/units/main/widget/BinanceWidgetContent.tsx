import React from "react";
import { useBinanceLongShortRatio } from "../../../../hooks/useBianceData";
import * as S from "../Main.styles";

interface BinanceWidgetContentProps {
    widget?: any;
}

const BinanceWidgetContent: React.FC<BinanceWidgetContentProps> = () => {
    const { data, loading, error } = useBinanceLongShortRatio("BTCUSDT");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <p>Long/Short Ratio: {data?.longShortRatio}</p>
            <p>Long Accounts: {data?.longAccount}</p>
            <p>Short Accounts: {data?.shortAccount}</p>
            <p>Last Updated: {new Date(parseInt(data?.timestamp || "0")).toLocaleString()}</p>
        </div>
    );
};

export default BinanceWidgetContent;