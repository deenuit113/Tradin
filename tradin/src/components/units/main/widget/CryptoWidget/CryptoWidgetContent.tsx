import React, { useEffect, useState } from "react";
import { ICryptoWidgetProps } from "../Widget.types";
import { useExchangeRate } from "../../../../../hooks/useExchangeRate";
import CryptoWidget from "./CryptoWidget";
import { StatLabel, StatRoot, StatValueText, StatHelpText, StatUpTrend, StatDownTrend } from "@/components/ui/stat";
import { Flex, HStack } from "@chakra-ui/react";
import { SkeletonText } from "@/components/ui/skeleton";

const CryptoWidgetContent = ({ widget, isCurrencyKRW, widgetIcon }: ICryptoWidgetProps): JSX.Element => {
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
            <StatRoot width="100%" size="sm" alignItems="center" justifyContent="center" gap="2px">
                <HStack justify="flex-start" width="70%" alignItems="center">
                    <StatLabel fontSize="13px" fontWeight="700">{widget.name}</StatLabel>
                    <StatLabel fontSize="13px" fontWeight="700">{widgetIcon}</StatLabel>
                </HStack>
                <Flex flexDirection="column" width="70%" justifyContent="flex-start" alignItems="flex-start" marginBottom="10px">
                    {priceData.price !== null ? (
                        <StatValueText
                            value={isCurrencyKRW ? priceData.price ?? undefined : exchangePrice() ?? undefined}
                            formatOptions={{
                                style: "currency",
                                currency: isCurrencyKRW ? "KRW" : "USD",
                            }}
                            fontSize="19px"
                        />
                    ) : (
                        <SkeletonText noOfLines={1} variant="shine" />
                    )}
                    {priceData.price !== null && priceData.prevPrice !== null && priceChangePercentage && (
                        parseFloat(priceChangePercentage) > 0 ? (
                            <StatUpTrend variant="plain" px="0">{priceChangePercentage}</StatUpTrend> // 상승 트렌드
                        ) : (
                            <StatDownTrend variant="plain" px="0">{priceChangePercentage}</StatDownTrend> // 하락 트렌드
                        )
                    )}
                </Flex>
                {lastChangeTimestamp && (
                    <StatHelpText fontSize="10px">{lastChangeTimestamp}</StatHelpText>
                )}
            </StatRoot>
            {widget.type && <CryptoWidget coinId={widget.type} setPriceData={setPriceData} />}
        </>
    );
};

export default CryptoWidgetContent;