import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from "@emotion/react";
import { FaArrowDown, FaArrowUp, FaChartLine, FaClock, FaCrosshairs, FaDollarSign, FaExchangeAlt, FaLevelDownAlt, FaTrophy } from 'react-icons/fa';
import { calculateAllMetrics } from '../utils/calculateMetrics';
import { Trade } from '../main/BackTest.types';
import * as S from "./BackTestResult.styles";

interface ResultContentProps {
    strategies: { [key: string]: Trade[] };
    initialCapital: number;
}

const Container = styled.div<{ strategyCount: number }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: ${props => `${0.1 / props.strategyCount}rem`};
`;

const MetricContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    height: 4rem;
    padding: 0 1rem;
`;

const MetricTitle = styled.h3`
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    width: 7rem;
    color: ${({ theme }) => theme.textColor};
    z-index: 1;

    @media (max-width: 799px) {
        width: 5rem;
        font-size: 0.7rem;
    }
`;

const BarChartContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    align-items: center;
`;

const BarChartGroup = styled.div<{ strategyCount: number }>`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: ${props => `${props.strategyCount * 1.05}rem`};
    position: relative;
    border-radius: 0.3rem;
    overflow: hidden;
    gap: 0.1rem;
`;

const fillAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const BarChart = styled.div<{ width: number; color: string; isAnimating: boolean; index: number; total: number }>`
    width: ${props => props.isAnimating ? '0' : `${props.width}%`};
    height: ${props => `${100 / props.total}%`};
    background-color: ${props => props.color};
    opacity: 0.8;
    position: absolute;
    left: 0;
    top: ${props => `${(props.index * 100) / props.total}%`};
    transition: width 0.5s ease-out, opacity 0.3s ease;
    border-radius: 0.2rem;
    box-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    padding-left: 0.5rem;

    ${props => props.isAnimating && `
        animation: ${fillAnimation} 1s ease-out forwards;
    `}

    &:hover {
        opacity: 1;
    }
`;

const StrategyName = styled.span`
    color: white;
    font-size: 0.7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 90%;
`;

const ResultValue = styled.div<{ strategyCount: number }>`
    width: 6rem;
    text-align: right;
    color: ${({ theme }) => theme.timeTextColor};
    font-size: ${props => `${1 - (props.strategyCount - 1) * 0.1}rem`};

    @media (max-width: 799px) {
        font-size: ${props => `${0.9 - (props.strategyCount - 1) * 0.1}rem`};
    }
`;

const colors = [
    'rgba(78, 121, 167, 0.7)',
    'rgba(242, 142, 44, 0.7)',
    'rgba(225, 87, 89, 0.7)',
    'rgba(118, 183, 178, 0.7)',
    'rgba(89, 161, 79, 0.7)',
    'rgba(237, 201, 73, 0.7)',
    'rgba(175, 122, 161, 0.7)',
    'rgba(255, 157, 167, 0.7)',
    'rgba(156, 117, 95, 0.7)',
    'rgba(186, 176, 171, 0.7)'
];

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

    const [isInitialAnimationDone, setIsInitialAnimationDone] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialAnimationDone(true);
        }, 500); // 0.5초 후에 초기 애니메이션 완료

        return () => clearTimeout(timer);
    }, []);

    return (
        <S.ResultContentGroup>
            <Container strategyCount={results.length}>
                {metrics.map(metric => {
                    const maxValue = Math.max(...results.map(r => Math.abs(r[metric.key as keyof typeof r] as number)));
                    return (
                        <MetricContainer 
                            key={metric.key}
                        >
                            <MetricTitle>
                                {metric.icon}
                                {metric.label}
                            </MetricTitle>
                            <BarChartContainer>
                                <BarChartGroup strategyCount={results.length}>
                                    {results.map((result, index) => (
                                        <BarChart
                                            key={result.strategy}
                                            width={(Math.abs(result[metric.key as keyof typeof result] as number) / maxValue) * 100}
                                            color={colors[index % colors.length]}
                                            isAnimating={!isInitialAnimationDone}
                                            index={index}
                                            total={results.length}
                                        >
                                            <StrategyName>{result.strategy}</StrategyName>
                                        </BarChart>
                                    ))}
                                </BarChartGroup>
                                <div>
                                    {results.map((result, index) => (
                                        <ResultValue key={result.strategy} strategyCount={results.length}>
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