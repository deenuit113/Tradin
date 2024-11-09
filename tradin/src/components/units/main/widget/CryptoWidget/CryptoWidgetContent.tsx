import React, { useEffect, useState } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import * as S from "../../Main.styles";
import { ICryptoWidgetProps } from "../Widget.types";
import { useExchangeRate } from "../../../../../hooks/useExchangeRate";
import CryptoWidget from "./CryptoWidget";

const CryptoWidgetContent = ({ widget, isCurrencyKRW }: ICryptoWidgetProps): JSX.Element => {
    const [priceData, setPriceData] = useState<{ price: number | null; prevPrice: number | null; timestamp: string | null }>({
        price: null,
        prevPrice: null,
        timestamp: null,
    });
    const [priceChangeIcon, setPriceChangeIcon] = useState<JSX.Element | null>(null);
    const [priceChangePercentage, setPriceChangePercentage] = useState<string | null>(null);
    const [lastChangeTimestamp, setLastChangeTimestamp] = useState<string | null>(null);
    const { exchangeRate } = useExchangeRate();

    const exchangePrice = () => {
        if (priceData?.price !== null && exchangeRate !== null) {
            return (priceData.price / exchangeRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        return null;
    };

    useEffect(() => {
        if (priceData.prevPrice !== null && priceData.price !== null) {
            if (priceData.price !== priceData.prevPrice) {
                const priceChange = ((priceData.price - priceData.prevPrice) / priceData.prevPrice) * 100;
                const formattedChange = priceChange.toFixed(2) + "%";

                if (priceData.price > priceData.prevPrice) {
                    setPriceChangeIcon(<S.PriceUPIcon />);
                    setPriceChangePercentage(`+${formattedChange}`);
                } else if (priceData.price < priceData.prevPrice) {
                    setPriceChangeIcon(<S.PriceDownIcon />);
                    setPriceChangePercentage(formattedChange);
                }

                setLastChangeTimestamp(priceData.timestamp);
            }
        }
    }, [priceData]);

    return (
    <>
        <S.WidgetContent>
                {isCurrencyKRW ?
                <p className="coin-price">가격: {priceData.price ? `${priceData.price.toLocaleString()} KRW` : '로딩 중...'}</p>
                : <p className="coin-price">가격: {priceData.price ? `${exchangePrice()} USD` : '로딩 중...'}</p>
                }
                {priceChangeIcon && (
                    <S.PriceChangeContainer>
                        <span>{priceChangeIcon}</span>
                        <span>{priceChangePercentage}</span>
                    </S.PriceChangeContainer>
                )}
                {lastChangeTimestamp && (
                    <S.CoinTimeStamp>
                        {lastChangeTimestamp} 기준
                    </S.CoinTimeStamp>
                )}
        </S.WidgetContent>
        {widget.type && <CryptoWidget coinId={widget.type} setPriceData={setPriceData} />}
    </>
        
    );
};

export default CryptoWidgetContent;