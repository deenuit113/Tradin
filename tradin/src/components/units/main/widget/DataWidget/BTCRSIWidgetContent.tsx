import React, { useEffect, useState } from "react";
import { useRSIData } from "../../../../../hooks/useRSIData";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import * as C from "./styles/components/RSIWidget.components";
import { DataWidgetTitle } from "./styles/components/Common.components";
import { Center, Spinner, Text } from "@chakra-ui/react";

interface RSIWidgetProps {
    title: string;
}

const RSIWidgetContent: React.FC<RSIWidgetProps> = ({ title }) => {
    const { data, loading, error } = useRSIData("BTCUSDT");
    const [rotation, setRotation] = useState(-90);
    const [hovered, setHovered] = useState(false);
    const [color, setColor] = useState<"red" | "green" | "orange">("orange");

    useEffect(() => {
        if (data?.rsi !== undefined) {
            const value = data.rsi;
            const angle = (value / 100) * 180 - 90;

            // 애니메이션이 실행되도록 바늘 회전 각도를 설정합니다.
            requestAnimationFrame(() => {
                setRotation(angle);
            });

            if (value < 30) {
                setColor("red");
            } else if (value > 70) {
                setColor("green");
            } else {
                setColor("orange");
            }
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
            <C.GaugeContainer
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <DataWidgetTitle>{title}</DataWidgetTitle>
                <C.GaugeSvg viewBox="0 0 150 75">
                    <C.ArcPath color={color} d="M 15 70 A 60 60 0 0 1 135 70" />
                    <C.GaugeNeedle
                        x1="75"
                        y1="70"
                        x2="75"
                        y2="20"
                        style={{ transform: `rotate(${rotation}deg)` }}
                    />
                </C.GaugeSvg>
                <C.GaugeText x="75" y="85">{data?.rsi}</C.GaugeText>
                <C.ExplanationContainer hovered={hovered}>
                    <C.Explanation>
                        30<FaAngleDown/> 과매도
                        /
                        70<FaAngleUp/> 과매수
                    </C.Explanation>
                </C.ExplanationContainer>
            </C.GaugeContainer>
        </>
    );
};

export default RSIWidgetContent;
