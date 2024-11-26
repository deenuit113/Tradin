import React, { useEffect, useState } from "react";
import { ICryptoWidgetProps } from "../Widget.types";
import { useExchangeRate } from "../../../../../hooks/useExchangeRate";
import { fetchCryptoPrice } from "./fetchCryptoPrice";
import { StatLabel, StatRoot, StatValueText, StatHelpText, StatUpTrend, StatDownTrend } from "@/components/ui/stat";
import { Flex, HStack } from "@chakra-ui/react";
import { SkeletonText } from "@/components/ui/skeleton";
import { WidgetFooter, WidgetTimeStamp } from "../styles/components/CryptoWidget.components";

const CryptoWidgetContent = ({ widget, isCurrencyKRW }: ICryptoWidgetProps): JSX.Element => {
    const [priceData, setPriceData] = useState<{ price: number | null; prevPrice: number | null; timestamp: string | null }>({
        price: null,
        prevPrice: null,
        timestamp: null,
    });
    const [priceChangePercentage, setPriceChangePercentage] = useState<string | null>(null);
    const [lastChangeTimestamp, setLastChangeTimestamp] = useState<string | null>(null);
    const { exchangeRate } = useExchangeRate();

    const exchangePrice = () => {
        if (priceData?.price !== null && exchangeRate !== null) {
            return priceData.price / exchangeRate;
        }
        return null;
    };

    useEffect(() => {
        const cachedData = localStorage.getItem(`crypto-${widget.type}`);
        let prevPrice: number | null = null;

        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            prevPrice = parsedData.price;
            setPriceData(parsedData);
        }

        const updateCryptoPrice = async () => {
            const newData = await fetchCryptoPrice({ coinId: widget.type, prevPrice });
            if (newData) {
                setPriceData(newData);
                prevPrice = newData.price; // 이전 가격 갱신
            }
        };

        updateCryptoPrice();
        const intervalId = setInterval(updateCryptoPrice, 30000);

        return () => clearInterval(intervalId);
    }, [widget.type]);

    useEffect(() => {
        if (priceData.prevPrice !== null && priceData.price !== null) {
            const priceChange = ((priceData.price - priceData.prevPrice) / priceData.prevPrice) * 100;
            const formattedChange = priceChange.toFixed(2) + "%";

            if (priceChange > 0) {
                setPriceChangePercentage(`+${formattedChange}`);
            } else if (priceChange < 0) {
                setPriceChangePercentage(formattedChange);
            }

            setLastChangeTimestamp(priceData.timestamp);
        }
    }, [priceData]);

    return (
        <>
            <StatRoot width="100%" height="65%" alignItems="center" justifyContent="center" gap="10px">
                <Flex flexDirection="column" width="100%" justifyContent="center" alignItems="center">
                    {priceData.price !== null ? (
                        <StatValueText
                            value={isCurrencyKRW ? priceData.price ?? undefined : exchangePrice() ?? undefined}
                            formatOptions={{
                                style: "currency",
                                currency: isCurrencyKRW ? "KRW" : "USD",
                            }}
                            marginBottom={{
                                base: "0",
                                lg: "0",
                                sm: "0",
                            }}
                            fontSize={{
                                base: "20px",
                                lg: "20px",
                                sm: "18px",
                            }}
                        />
                    ) : (
                        <SkeletonText noOfLines={1} variant="shine" />
                    )}
                    {priceData.price !== null && priceData.prevPrice !== null && priceChangePercentage && (
                        parseFloat(priceChangePercentage) > 0 ? (
                            <StatUpTrend px="0" variant="plain" padding="0px 6px" size={{ base: "sm", lg: "sm", sm: "xs" }}>
                                {priceChangePercentage}
                            </StatUpTrend>
                        ) : (
                            <StatDownTrend px="0" variant="plain" padding="0px 6px" size={{ base: "sm", lg: "sm", sm: "xs" }}>
                                {priceChangePercentage}
                            </StatDownTrend>
                        )
                    )}
                </Flex>
            </StatRoot>
            <WidgetFooter>
                <WidgetTimeStamp>{lastChangeTimestamp}</WidgetTimeStamp>
            </WidgetFooter>
        </>
    );
};

export default CryptoWidgetContent;