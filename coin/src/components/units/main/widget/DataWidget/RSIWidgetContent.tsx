import React, { useEffect, useState } from "react";
import { useRSIData } from "../../../../../hooks/useRSIData";
import styled from "@emotion/styled";
import * as S from "../../Main.styles";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const GaugeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
`;

const GaugeSvg = styled.svg`
    width: 90%;
    height: 60%;
    overflow: visible;
`;

const ArcPath = styled.path<{ color: string }>`
    fill: none;
    stroke: ${({ color }) => color};
    stroke-width: 10;
    transition: stroke 0.3s ease-in-out;
`;

const GaugeNeedle = styled.line`
    stroke: ${({ theme }) => theme.iconColor};
    stroke-width: 6;
    stroke-linecap: round;
    transition: transform 1s cubic-bezier(0.68, -1.00, 0.27, 1.55);
    transform-origin: 50% 80%; /* 중심점을 맞춰줍니다 */
`;

const GaugeText = styled.text`
    font-size: 16px;
    fill: #333;
    text-anchor: middle;
    alignment-baseline: middle;
`;

const Explanation = styled.text<{ hovered: boolean }>`
    font-size: 11px;
    font-weight: 400;
    color: ${({ theme }) => theme.timeTextColor};
    align-items: center;
    text-anchor: middle;
    alignment-baseline: middle;
    opacity: ${({ hovered }) => hovered ? 1 : 0};
    transition: opacity 0.3s ease-in-out;
`

const RSIWidgetContent: React.FC = () => {
    const { data, loading, error } = useRSIData("BTCUSDT");
    const [rotation, setRotation] = useState(-90);
    const [hovered, setHovered] = useState(false);
    const [color, setColor] = useState("#FFA500");

    useEffect(() => {
        if (data?.rsi !== undefined) {
            const value = data.rsi;
            const angle = (value / 100) * 180 - 90;

            // 애니메이션이 실행되도록 바늘 회전 각도를 설정합니다.
            requestAnimationFrame(() => {
                setRotation(angle);
            });

            if (value < 30) {
                setColor("#BF1E2E");
            } else if (value > 70) {
                setColor("#50C878");
            } else {
                setColor("#FFA500");
            }
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <S.WidgetContent
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
            <GaugeContainer>
                <GaugeSvg viewBox="0 0 150 75">
                    <ArcPath
                        color={color}
                        d="M 15 70 A 60 60 0 0 1 135 70"
                    />
                    <GaugeNeedle
                        x1="75"
                        y1="70"
                        x2="75"
                        y2="20"
                        style={{ transform: `rotate(${rotation}deg)` }}
                    />
                </GaugeSvg>
                <GaugeText x="75" y="85">{data?.rsi}</GaugeText>
                <Explanation hovered={hovered}>
                    30<FaAngleDown/>과매도 70<FaAngleUp/>과매수
                </Explanation>
            </GaugeContainer>
        </S.WidgetContent>
    );
};

export default RSIWidgetContent;
