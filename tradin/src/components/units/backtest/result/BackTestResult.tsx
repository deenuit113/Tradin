import React, { useState } from 'react';
import * as S from "./BackTestResult.styles";
import BackTestChart from './BackTestChart';
import { calculateAllMetrics } from '../utils/calculateMetrics';
import { FaArrowDown, FaArrowUp, FaChartLine, FaClock, FaCrosshairs, FaDollarSign, FaExchangeAlt, FaLevelDownAlt, FaTrophy, FaGlobe, FaChartBar, FaLongArrowAltUp, FaLongArrowAltDown, FaCalendarAlt } from 'react-icons/fa';
import { BackTestResultsProps } from './BackTestResult.types';
import { Trade } from '../main/BackTest.types';

const BackTestResults: React.FC<BackTestResultsProps> = ({ trades, executedOptions }) => {
    const [selectedMetric, setSelectedMetric] = useState<'profit' | 'equity' | 'drawdown'>('profit');
    const isSkeleton = false;
    
    const initialCapital = 10000;
    
    const results = Object.entries(trades).map(([strategy, strategyTrades]) => ({
        strategy,
        ...calculateAllMetrics(strategyTrades, initialCapital)
    }));

    const strategyCount = Object.keys(trades).length;

    const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMetric(event.target.value as 'profit' | 'equity' | 'drawdown');
    };
    
    const renderExecutedOptions = () => {
        if (!executedOptions) return null;

        const [marketType, strategies, position, dateRange] = executedOptions.split(' / ');

        return (
            <S.ExecutedOptionsContainer>
                <S.ExecutedOptionItem>
                    <FaGlobe className="OptionIcon" />
                    {marketType}
                </S.ExecutedOptionItem>
                <S.ExecutedOptionItem>
                    <FaChartBar className="OptionIcon" />
                    {strategies}
                </S.ExecutedOptionItem>
                <S.ExecutedOptionItem>
                    {position === 'long' ? <FaLongArrowAltUp className="OptionIcon" /> : <FaLongArrowAltDown className="OptionIcon" />}
                    {position}
                </S.ExecutedOptionItem>
                <S.ExecutedOptionItem>
                    <FaCalendarAlt className="OptionIcon" />
                    {dateRange.replace('기간 ', '')}
                </S.ExecutedOptionItem>
            </S.ExecutedOptionsContainer>
        );
    };

    const renderResultItem = (label: string, value: string | number, icon: React.ReactNode) => (
        <S.ResultContent strategyCount={strategyCount}>
            {icon}
            {label}: {value}
        </S.ResultContent>
    );

    const renderTransactionHistory = () => {
        return (
            <S.TransactionHistoryContainer>
                <S.TransactionHistoryScroll strategyCount={strategyCount}>
                    {Object.entries(trades).map(([strategy, strategyTrades]) => {
                        let cumulativeProfit = 0;
                        return (
                            <S.StrategyTransactions key={strategy} strategyCount={strategyCount}>
                                <S.StrategyTitle>{strategy}</S.StrategyTitle>
                                <S.TransactionList isSkeleton={isSkeleton}>
                                    {strategyTrades.map((trade: Trade, index: number) => {
                                        cumulativeProfit += trade.profit;
                                        const profitPercentage = (trade.profit / initialCapital) * 100;
                                        const cumulativeProfitPercentage = (cumulativeProfit / initialCapital) * 100;
                                        
                                        return (
                                            <S.TransactionItem key={index} strategyCount={strategyCount}>
                                                <S.TransactionDetail strategyCount={strategyCount}>진입: {new Date(trade.entryTime).toLocaleString()}</S.TransactionDetail>
                                                <S.TransactionDetail strategyCount={strategyCount}>청산: {new Date(trade.exitTime).toLocaleString()}</S.TransactionDetail>
                                                <S.TransactionDetail strategyCount={strategyCount}>
                                                    수익: <S.ProfitAmount isPositive={trade.profit > 0}>${trade.profit.toFixed(2)}</S.ProfitAmount>
                                                </S.TransactionDetail>
                                                <S.TransactionDetail strategyCount={strategyCount}>
                                                    수익률: <S.ProfitAmount isPositive={profitPercentage > 0}>{profitPercentage.toFixed(2)}%</S.ProfitAmount>
                                                </S.TransactionDetail>
                                                <S.TransactionDetail strategyCount={strategyCount}>
                                                    누적 수익률: <S.ProfitAmount isPositive={cumulativeProfitPercentage > 0}>{cumulativeProfitPercentage.toFixed(2)}%</S.ProfitAmount>
                                                </S.TransactionDetail>
                                            </S.TransactionItem>
                                        );
                                    })}
                                </S.TransactionList>
                            </S.StrategyTransactions>
                        );
                    })}
                </S.TransactionHistoryScroll>
            </S.TransactionHistoryContainer>
        );
    };

    return (
        <S.ResultContainer>
            <S.ResultHeader>
                <S.ResultTitle>실행 결과:</S.ResultTitle>
                {renderExecutedOptions()}
            </S.ResultHeader>
            <S.ResultInnerContainer>
                <S.ResultContentGroup strategyCount={strategyCount}>
                    {results.map((result, index) => (
                        <S.ResultContentContainer key={index} strategyCount={strategyCount}>
                            <S.ResultSubtitle>{result.strategy}</S.ResultSubtitle>
                            {renderResultItem('총 수익', `$${result.totalReturn.toFixed(2)}`, <FaDollarSign className='ResultIcon'/>)}
                            {renderResultItem('연간 수익률', `${(result.annualizedReturn * 100).toFixed(2)}%`, <FaChartLine className='ResultIcon'/>)}
                            {renderResultItem('최대 손실', `$${result.maxDrawdown.toFixed(2)}`, <FaLevelDownAlt className='ResultIcon'/>)}
                            {renderResultItem('승률', `${(result.winRate * 100).toFixed(2)}%`, <FaTrophy className='ResultIcon'/>)}
                            {renderResultItem('평균 수익', `$${result.averageGain.toFixed(2)}`, <FaArrowUp className='ResultIcon'/>)}
                            {renderResultItem('평균 손실', `$${result.averageLoss.toFixed(2)}`, <FaArrowDown className='ResultIcon'/>)}
                            {renderResultItem('샤프 비율', result.sharpeRatio.toFixed(2), <FaCrosshairs className='ResultIcon'/>)}
                            {renderResultItem('거래 횟수', result.tradeCount, <FaExchangeAlt className='ResultIcon'/>)}
                            {renderResultItem('평균 보유 기간', `${isNaN(result.averageHoldingPeriod) ? '0.00' : result.averageHoldingPeriod.toFixed(2)}일`, <FaClock className='ResultIcon'/>)}
                        </S.ResultContentContainer>
                    ))}
                </S.ResultContentGroup>
                {renderTransactionHistory()}
            </S.ResultInnerContainer>
            
            <S.ChartControls>
                <S.ChartSelect onChange={handleMetricChange} value={selectedMetric}>
                    <option value="profit">손익</option>
                    <option value="equity">자산</option>
                    <option value="drawdown">최대 손실</option>
                </S.ChartSelect>
            </S.ChartControls>
            <BackTestChart trades={trades} selectedMetric={selectedMetric} />
        </S.ResultContainer>
    );
};

export default BackTestResults;