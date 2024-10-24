import React, { useState, useEffect } from 'react';
import { FaArrowDown, FaArrowUp, FaChartLine, FaClock, FaCrosshairs, FaDollarSign, FaExchangeAlt, FaLevelDownAlt, FaTrophy } from 'react-icons/fa';
import { calculateAllMetrics } from '../utils/calculateMetrics';
import { Trade } from '../main/BackTest.types';
import * as S from "./ResultContent.styles";

interface ResultContentProps {
    strategies: { [key: string]: Trade[] };
    initialCapital: number;
}

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
        <S.ResultContentContainer>
            <S.ResultContent strategyCount={results.length}>
                {metrics.map(metric => {
                    const maxValue = Math.max(...results.map(r => Math.abs(r[metric.key as keyof typeof r] as number)));
                    return (
                        <S.MetricContainer 
                            key={metric.key}
                        >
                            <S.MetricTitle>
                                {metric.icon}
                                {metric.label}
                            </S.MetricTitle>
                            <S.BarChartContainer>
                                <S.BarChartGroup strategyCount={results.length}>
                                    {results.map((result, index) => (
                                        <S.BarChart
                                            key={result.strategy}
                                            width={(Math.abs(result[metric.key as keyof typeof result] as number) / maxValue) * 100}
                                            color={colors[index % colors.length]}
                                            isAnimating={!isInitialAnimationDone}
                                            index={index}
                                            total={results.length}
                                        >
                                            <S.StrategyName>{result.strategy}</S.StrategyName>
                                        </S.BarChart>
                                    ))}
                                </S.BarChartGroup>
                                <div>
                                    {results.map((result, index) => (
                                        <S.ResultValue key={result.strategy} strategyCount={results.length}>
                                            {metric.format(result[metric.key as keyof typeof result] as number)}
                                        </S.ResultValue>
                                    ))}
                                </div>
                            </S.BarChartContainer>
                        </S.MetricContainer>
                    );
                })}
            </S.ResultContent>
        </S.ResultContentContainer>
    );
};

export default ResultContent;