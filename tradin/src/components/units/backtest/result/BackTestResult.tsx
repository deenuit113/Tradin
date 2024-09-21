import React, { useState } from 'react';
import * as S from "./BackTestResult.styles";
import BackTestChart from './BackTestChart';
import { calculateAllMetrics } from '../utils/calculateMetrics';
import { FaArrowDown, FaArrowUp, FaChartLine, FaClock, FaCrosshairs, FaDollarSign, FaExchangeAlt, FaLevelDownAlt, FaTrophy, FaGlobe, FaChartBar, FaLongArrowAltUp, FaLongArrowAltDown, FaCalendarAlt } from 'react-icons/fa';
import { BackTestResultsProps } from './BackTestResult.types';

const BackTestResults: React.FC<BackTestResultsProps> = ({ trades, executedOptions }) => {
    const [selectedMetric, setSelectedMetric] = useState<'profit' | 'equity' | 'drawdown'>('profit');

    // 백테스트 자본금 > 추후 옵션 표시?
    const initialCapital = 10000;
    
    // 자본금으로 결과 계산
    const results = Object.entries(trades).map(([strategy, strategyTrades]) => ({
        strategy,
        ...calculateAllMetrics(strategyTrades, initialCapital)
    }));

    // 그래프 표시 방식 변경
    const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMetric(event.target.value as 'profit' | 'equity' | 'drawdown');
    };
    
    // 실행 옵션 표시
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
    // 항목별 결과 표시
    const renderResultItem = (label: string, value: string | number, icon: React.ReactNode) => (
        <S.ResultContent>
            {icon}
            {label}: {value}
        </S.ResultContent>
    );

    return (
        <S.ResultContainer>
            <S.ResultHeader>
                <S.ResultTitle>실행 결과:</S.ResultTitle>
                {renderExecutedOptions()}
            </S.ResultHeader>
            {results.map((result, index) => (
                <S.ResultInnerContainer key={index}>
                    <S.ResultSubtitle>{result.strategy}</S.ResultSubtitle>
                    {renderResultItem('총 수익', `$${result.totalReturn.toFixed(2)}`, <FaDollarSign className='ResultIcon'/>)}
                    {renderResultItem('연간 수익률', `${(result.annualizedReturn * 100).toFixed(2)}%`, <FaChartLine className='ResultIcon'/>)}
                    {renderResultItem('최대 손실', `$${result.maxDrawdown.toFixed(2)}`, <FaLevelDownAlt className='ResultIcon'/>)}
                    {renderResultItem('승률', `${(result.winRate * 100).toFixed(2)}%`, <FaTrophy className='ResultIcon'/>)}
                    {renderResultItem('평균 수익', `$${result.averageGain.toFixed(2)}`, <FaArrowUp className='ResultIcon'/>)}
                    {renderResultItem('평균 손실', `$${result.averageLoss.toFixed(2)}`, <FaArrowDown className='ResultIcon'/>)}
                    {renderResultItem('샤프 비율', result.sharpeRatio.toFixed(2), <FaCrosshairs className='ResultIcon'/>)}
                    {renderResultItem('거래 횟수', result.tradeCount, <FaExchangeAlt className='ResultIcon'/>)}
                    {renderResultItem('평균 보유 기간', `${isNaN(result.averageHoldingPeriod) ? '0.00' : result.averageHoldingPeriod.toFixed(2)} days`, <FaClock className='ResultIcon'/>)}
                </S.ResultInnerContainer>
            ))}
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