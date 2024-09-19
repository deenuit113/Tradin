import React, { useState } from 'react';
import * as S from "./BackTest.styles";
import BackTestChart from './BackTestChart';
import {
    calculateTotalReturn,
    calculateAnnualizedReturn,
    calculateMaxDrawdown,
    calculateWinRate,
    calculateAverageGain,
    calculateAverageLoss,
    calculateSharpeRatio,
    calculateAverageHoldingPeriod
} from './CalculateMetrics';
import { FaArrowDown, FaArrowUp, FaChartLine, FaClock, FaCrosshairs, FaDollarSign, FaExchangeAlt, FaLevelDownAlt, FaTrophy } from 'react-icons/fa';

interface Trade {
    entryTime: string;
    exitTime: string;
    profit: number;
    strategy: string;
}

interface BackTestResultsProps {
    trades: { [key: string]: Trade[] };
    executedOptions: string | null;
}

const BackTestResults: React.FC<BackTestResultsProps> = ({ trades, executedOptions }) => {
    const [selectedMetric, setSelectedMetric] = useState<'profit' | 'equity' | 'drawdown'>('profit');
    
    const initialCapital = 10000;

    const results = Object.entries(trades).map(([strategy, strategyTrades]) => {
        const totalReturn = calculateTotalReturn(strategyTrades);
        const annualizedReturn = calculateAnnualizedReturn(totalReturn, initialCapital, 1);
        const maxDrawdown = calculateMaxDrawdown(strategyTrades.map(trade => trade.profit));
        const winRate = calculateWinRate(strategyTrades);
        const averageGain = calculateAverageGain(strategyTrades);
        const averageLoss = calculateAverageLoss(strategyTrades);
        const sharpeRatio = calculateSharpeRatio(averageGain - averageLoss, 1);
        const averageHoldingPeriod = calculateAverageHoldingPeriod(strategyTrades);

        return {
            strategy,
            totalReturn,
            annualizedReturn,
            maxDrawdown,
            winRate,
            averageGain,
            averageLoss,
            sharpeRatio,
            tradeCount: strategyTrades.length,
            averageHoldingPeriod
        };
    });

    return (
        <S.ResultContainer>
            <S.ResultHeader>
                <S.ResultTitle>실행 결과:</S.ResultTitle>
                {executedOptions && <S.ExecutedOptions>{executedOptions}</S.ExecutedOptions>}
            </S.ResultHeader>
            {results.map((result, index) => (
                <S.ResultInnerContainer key={index}>
                    <S.ResultSubtitle>{result.strategy}</S.ResultSubtitle>
                    <S.ResultContent>
                        <FaDollarSign className='ResultIcon'/>
                        총 수익: ${result.totalReturn.toFixed(2)}
                    </S.ResultContent>
                    <S.ResultContent>
                        <FaChartLine className='ResultIcon'/>
                        연간 수익률: {(result.annualizedReturn * 100).toFixed(2)}%
                    </S.ResultContent>
                    <S.ResultContent>
                        <FaLevelDownAlt className='ResultIcon'/>
                        최대 손실: ${result.maxDrawdown.toFixed(2)}
                    </S.ResultContent>
                    <S.ResultContent>
                        <FaTrophy className='ResultIcon'/>
                        승률: {(result.winRate * 100).toFixed(2)}%
                    </S.ResultContent>
                    <S.ResultContent>
                        <FaArrowUp className='ResultIcon'/>
                        평균 수익: ${result.averageGain.toFixed(2)}
                    </S.ResultContent>
                    <S.ResultContent>
                        <FaArrowDown className='ResultIcon'/>
                        평균 손실: ${result.averageLoss.toFixed(2)}
                    </S.ResultContent>
                    <S.ResultContent>
                        <FaCrosshairs className='ResultIcon'/>
                        샤프 비율: {result.sharpeRatio.toFixed(2)}
                    </S.ResultContent>
                    <S.ResultContent>
                        <FaExchangeAlt className='ResultIcon'/>
                        거래 횟수: {result.tradeCount}
                    </S.ResultContent>
                    <S.ResultContent>
                        <FaClock className='ResultIcon'/>
                        평균 보유 기간: {isNaN(result.averageHoldingPeriod) ? '0.00' : result.averageHoldingPeriod.toFixed(2)} days
                    </S.ResultContent>
                </S.ResultInnerContainer>
            ))}
            <S.ChartControls>
                <button onClick={() => setSelectedMetric('profit')}>손익</button>
                <button onClick={() => setSelectedMetric('equity')}>자산</button>
                <button onClick={() => setSelectedMetric('drawdown')}>최대 손실</button>
            </S.ChartControls>
            <BackTestChart trades={trades} selectedMetric={selectedMetric} />
        </S.ResultContainer>
    );
};

export default BackTestResults;