import React, { useEffect, useState } from "react";
import { useFearGreedIndex } from "../../../../../hooks/useFearGreedIndex";
import { DataWidgetTitle } from "./styles/components/Common.components";
import * as C from "./styles/components/FearGreedWidget.components";
import { Center, Spinner, Text } from "@chakra-ui/react";

interface FearGreedWidgetProps {
    title: string;
}

const FearGreedWidgetContent: React.FC<FearGreedWidgetProps> = ({ title }) => {
    const { data, loading, error } = useFearGreedIndex();
    const [offset, setOffset] = useState(0);
    const [circumference, setCircumference] = useState(0);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const radius = 40;
        const calculatedCircumference = 2 * Math.PI * radius;
        setCircumference(calculatedCircumference);

        if (data?.fearGreedIndex !== undefined) {
            const value = data.fearGreedIndex;
            const strokeValue = (value / 100) * calculatedCircumference;

            // 애니메이션 시작 전에 미리 초기화하지 않고 직접 애니메이션을 적용
            requestAnimationFrame(() => {
                setOffset(calculatedCircumference - strokeValue);
            });
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
        <C.ProgressBarContainer>
            <DataWidgetTitle>{title}</DataWidgetTitle>
            <C.SvgContainer 
                xmlns="http://www.w3.org/2000/svg" width="65%" height="65%" viewBox="0 0 100 100"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <C.BackgroundCircle
                    cx="50"
                    cy="50"
                    r="40"
                />
                <C.ForegroundCircle
                    cx="50"
                    cy="50"
                    r="40"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    hovered={hovered}
                />
                <foreignObject x="0" y="0" width="100" height="100">
                    <div 
                        style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            height: '100%', 
                            width: '100%',
                            transform: 'rotate(90deg)',
                        }}>
                        <C.ProgressText hovered={hovered}>
                            {data?.fearGreedIndex}
                        </C.ProgressText>
                    </div>
                </foreignObject>
            </C.SvgContainer>
        </C.ProgressBarContainer>
    );
};

export default FearGreedWidgetContent;
