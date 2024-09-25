import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FaArrowDown, FaArrowUp, FaChartLine, FaClock, FaCrosshairs, FaDollarSign, FaExchangeAlt, FaLevelDownAlt, FaTrophy } from 'react-icons/fa';
import { calculateAllMetrics } from '../utils/calculateMetrics';
import { Trade } from '../main/BackTest.types';
import * as S from "./BackTestResult.styles";

interface ResultContentProps {
    strategies: { [key: string]: Trade[] };
    initialCapital: number;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
`;

const MetricContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    height: 50px;
    margin-bottom: 10px;
`;

const MetricTitle = styled.h3`
    margin: 0;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1em;
    width: 150px;
    color: ${({ theme }) => theme.textColor};
    z-index: 1000;
`;

const BarChartContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    align-items: center;
`;

const BarChartGroup = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 20px;
    position: relative;
`;

const BarChart = styled.div<{ width: number; color: string; isHovered: boolean; isTop: boolean }>`
    width: ${props => props.width}%;
    height: 10px;
    background-color: ${props => props.color};
    transition: transform 0.3s ease;
    position: absolute;
    ${props => props.isTop ? 'top: 0;' : 'bottom: 0;'}
    transform-origin: ${props => props.isTop ? 'bottom' : 'top'};
    transform: ${props => props.isHovered ? `scaleY(2)` : 'scaleY(1)'};
`;

const ResultValue = styled.div`
    width: 100px;
    text-align: right;
    color: ${({ theme }) => theme.timeTextColor};
`;

const colors = ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f', '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'];

const metrics = [
    { key: 'totalReturn', label: '총 수익', icon: <FaDollarSign className='ResultIcon'/>, format: (v: number) => `$${v.toFixed(2)}` },
    { key: 'annualizedReturn', label: '연간 수익률', icon: <FaChartLine className='ResultIcon'/>, format: (v: number) => `${(v * 100).toFixed(2)}%` },
    { key: 'maxDrawdown', label: '최대 손실', icon: <FaLevelDownAlt className='ResultIcon'/>, format: (v: number) => `$${v.toFixed(2)}` },
    { key: 'winRate', label: '승률', icon: <FaTrophy className='ResultIcon'/>, format: (v: number) => `${(v * 100).toFixed(2)}%` },
    { key: 'averageGain', label: '평균 수익', icon: <FaArrowUp className='ResultIcon'/>, format: (v: number) => `$${v.toFixed(2)}` },
    { key: 'averageLoss', label: '평균 손실', icon: <FaArrowDown className='ResultIcon'/>, format: (v: number) => `$${v.toFixed(2)}` },
    { key: 'sharpeRatio', label: '샤프 비율', icon: <FaCrosshairs className='ResultIcon'/>, format: (v: number) => v.toFixed(2) },
    { key: 'tradeCount', label: '거래 횟수', icon: <FaExchangeAlt className='ResultIcon'/>, format: (v: number) => v.toString() },
    { key: 'averageHoldingPeriod', label: '평균 보유 기간', icon: <FaClock className='ResultIcon'/>, format: (v: number) => `${v.toFixed(2)}일` },
];

const ResultContent: React.FC<ResultContentProps> = ({ strategies, initialCapital }) => {
    const results = Object.entries(strategies).map(([strategy, trades]) => ({
        strategy,
        ...calculateAllMetrics(trades, initialCapital)
    }));

    const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

    return (
        <S.ResultContentGroup>
            <Container>
                {metrics.map(metric => {
                    const maxValue = Math.max(...results.map(r => Math.abs(r[metric.key as keyof typeof r] as number)));
                    return (
                        <MetricContainer 
                            key={metric.key}
                            onMouseEnter={() => setHoveredMetric(metric.key)}
                            onMouseLeave={() => setHoveredMetric(null)}
                        >
                            <MetricTitle>
                                {metric.icon}
                                {metric.label}
                            </MetricTitle>
                            <BarChartContainer>
                                <BarChartGroup onMouseEnter={() => setHoveredMetric(metric.key)} onMouseLeave={() => setHoveredMetric(null)}>
                                    {results.map((result, index) => (
                                        <BarChart
                                            key={result.strategy}
                                            width={(Math.abs(result[metric.key as keyof typeof result] as number) / maxValue) * 100}
                                            color={colors[index % colors.length]}
                                            isHovered={hoveredMetric === metric.key}
                                            isTop={index === 0}
                                        />
                                    ))}
                                </BarChartGroup>
                                <div>
                                    {results.map((result, index) => (
                                        <ResultValue key={result.strategy}>
                                            {metric.format(result[metric.key as keyof typeof result] as number)}
                                        </ResultValue>
                                    ))}
                                </div>
                            </BarChartContainer>
                        </MetricContainer>
                    );
                })}
            </Container>
        </S.ResultContentGroup>
    );
};

export default ResultContent;