import React, { useEffect, useState } from "react";
import { FaWonSign, FaDollarSign } from "react-icons/fa";
import * as S from "../../Main.styles";
import { ICryptoWidgetProps } from "../Widget.types";
import { useExchangeRate } from "../../../../../hooks/useExchangeRate";
import CryptoWidget from "./CryptoWidget";
import { StatLabel, StatRoot, StatValueText, StatHelpText, StatUpTrend, StatDownTrend } from "@/components/ui/stat"
import { Flex, HStack, Icon } from "@chakra-ui/react";
import { SkeletonText } from "@/components/ui/skeleton";

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
        if (priceData.prevPrice !== null && priceData.price !== null) {
            if (priceData.price !== priceData.prevPrice) {
                const priceChange = ((priceData.price - priceData.prevPrice) / priceData.prevPrice) * 100;
                const formattedChange = priceChange.toFixed(2) + "%";

                if (priceData.price > priceData.prevPrice) {
                    setPriceChangePercentage(`+${formattedChange}`);
                } else if (priceData.price < priceData.prevPrice) {
                    setPriceChangePercentage(formattedChange);
                }
                setLastChangeTimestamp(priceData.timestamp);
            }
        }
    }, [priceData]);

    return (
    <>
        <S.WidgetContent>
            <StatRoot maxW="240px" size="sm" alignItems="center" justifyContent="center" gap="2px">
                <HStack justify="space-between">
                    <StatLabel fontSize="13px" fontWeight="700">{widget.name}</StatLabel>
                    <Icon color="fg.muted" size="xs">
                        {isCurrencyKRW ? <FaWonSign/> : <FaDollarSign />}
                    </Icon>
                </HStack>
                <Flex flexDirection="column" justifyContent="center" alignItems="center">
                    {priceData.price !== null ? (
                        <StatValueText
                            value={isCurrencyKRW ? priceData.price ?? undefined : exchangePrice() ?? undefined} // null을 undefined로 변환
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
                        priceData.price > priceData.prevPrice ? (
                            <StatUpTrend variant="plain" px="0">{priceChangePercentage}</StatUpTrend> // 상승 트렌드
                        ) : (
                            <StatDownTrend variant="plain" px="0">{priceChangePercentage}</StatDownTrend> // 하락 트렌드
                        )
                    )}
                </Flex>
                {lastChangeTimestamp && (
                    <StatHelpText fontSize="8px">{lastChangeTimestamp}</StatHelpText>
                )}
            </StatRoot>
        </S.WidgetContent>
        {widget.type && <CryptoWidget coinId={widget.type} setPriceData={setPriceData} />}
    </>
        
    );
};

export default CryptoWidgetContent;