import React, { useEffect } from "react";
import { useBinanceLongShortRatio } from "../../../../hooks/useBianceData";
import * as S from "../Main.styles";
import styled from "@emotion/styled";

export const RatioBarContainer = styled.div`
    width: 100%;
    height: 30px;
    border: 1px solid lightgrey;
    display: flex;
    border-radius: 10px;
`

export const LongRatiobar = styled.div`
    background-color: blue;
    display: flex;
    justify-content: flex-start;
    color: white;
    font-size: 11px;
    font-weight: 600;
    padding-left: 5px;
`;

export const ShortRatiobar = styled.div`
    background-color: red;
    display: flex;
    justify-content: flex-end;
    color: white;
    font-size: 11px;
    font-weight: 600;
    padding-right: 5px;
`;

interface BinanceWidgetContentProps {
    widget?: any;
}

const BinanceWidgetContent: React.FC<BinanceWidgetContentProps> = () => {
    const { data, loading, error } = useBinanceLongShortRatio("BTCUSDT");

    useEffect(() => {
        console.log("load long short data"); 
    },[data])

    let longRatio: number = Number(data?.longAccount) * 100;
    let shortRatio: number = Number(data?.shortAccount) * 100;
    let longRatioSliced = longRatio.toFixed(2);
    let shortRatioSliced = shortRatio.toFixed(2);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <S.WidgetContent>
            <RatioBarContainer>
                <LongRatiobar style={{width: `${longRatio}%`}}>Long:{longRatioSliced}%</LongRatiobar>
                <ShortRatiobar style={{width: `${shortRatio}%`}}>Short:{shortRatioSliced}%</ShortRatiobar>
            </RatioBarContainer>
            <S.CoinTimeStamp>{data?.timestamp}기준</S.CoinTimeStamp>
        </S.WidgetContent>
    );
};

export default BinanceWidgetContent;