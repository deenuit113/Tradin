import React, { useEffect, useState } from "react";
import { useBinanceLongShortRatio } from "../../../../../hooks/useLongShortRatioData";
import { Center, Spinner, Text } from "@chakra-ui/react";
import * as C from "./styles/components/longShortRatioWidget.components";
import { WidgetFooter, WidgetTimeStamp } from "../styles/components/CryptoWidget.components";

const LongShortRatioWidgetContent: React.FC = () => {
    const { data, loading, error } = useBinanceLongShortRatio("BTCUSDT");
    const [longRatio, setLongRatio] = useState(0);
    const [shortRatio, setShortRatio] = useState(0);
    const [hovered, setHovered] = useState(false);
    
    useEffect(() => {
        // 로컬스토리지에서 데이터 가져오기
        const storedData = localStorage.getItem("binanceLongShortRatio");
        if (storedData) {
            const { longRatio, shortRatio } = JSON.parse(storedData);
            setLongRatio(longRatio);
            setShortRatio(shortRatio);
        }
    }, []);

    useEffect(() => {
        if (data) {
            const newLongRatio = Number(data.longAccount) * 100;
            const newShortRatio = Number(data.shortAccount) * 100;

            // 애니메이션을 위한 상태 업데이트
            setLongRatio(newLongRatio);
            setShortRatio(newShortRatio);

            // 로컬스토리지에 데이터 저장
            localStorage.setItem(
                "binanceLongShortRatio",
                JSON.stringify({
                    longRatio: newLongRatio,
                    shortRatio: newShortRatio,
                    timestamp: data.timestamp,
                })
            );
        }
    }, [data]);

    if (loading) {
        return (
            <Center width="100%" height="100%">
                <Spinner size="lg"/>
            </Center>
        );
    }
    if (error) {
        return (
            <Center width="100%" height="100%">
                <Text>Error: {error}</Text>
            </Center>
        );
    } 

    return (
        <>
            <C.LongShortRatioContainer
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <C.RatioBarContainer>
                    <C.LongRatioBar long={longRatio}>
                        {hovered ? `${longRatio.toFixed(2)}%` : "Long"}
                    </C.LongRatioBar>
                    <C.ShortRatioBar short={shortRatio}>
                        {hovered ? `${shortRatio.toFixed(2)}%` : "Short"}
                    </C.ShortRatioBar>
                </C.RatioBarContainer>
            </C.LongShortRatioContainer>
            <WidgetFooter>
                <WidgetTimeStamp>
                    {data?.timestamp || JSON.parse(localStorage.getItem('binanceLongShortRatio') || '{}').timestamp}
                </WidgetTimeStamp>
            </WidgetFooter>
        </>
    );
}

export default LongShortRatioWidgetContent;