import React from 'react';
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
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaArrowDown, FaArrowUp, FaBalanceScale, FaChartLine, FaClock, FaCrosshairs, FaDollarSign, FaExchangeAlt, FaLevelDownAlt, FaTrophy } from 'react-icons/fa';

interface Trade {
    entryTime: string;
    profit: number;
}

interface BackTestResultsProps {
    trades: Trade[];
}

const BackTestResults: React.FC<BackTestResultsProps> = ({ trades }) => {
    const initialCapital = 10000;
    const totalReturn = calculateTotalReturn(trades);
    const annualizedReturn = calculateAnnualizedReturn(totalReturn, initialCapital, 1);
    const maxDrawdown = calculateMaxDrawdown(trades.map(trade => trade.profit));
    const winRate = calculateWinRate(trades);
    const averageGain = calculateAverageGain(trades);
    const averageLoss = calculateAverageLoss(trades);
    const sharpeRatio = calculateSharpeRatio(averageGain - averageLoss, 1);
    const averageHoldingPeriod = calculateAverageHoldingPeriod(trades);

    return (
        <S.ResultContainer>
            <S.ResultInnerContainer>
                <S.ResultTitle>실행 결과:</S.ResultTitle>
                <S.ResultContent>
                    <FaDollarSign className='ResultIcon'/>
                    총 수익: ${totalReturn.toFixed(2)}
                </S.ResultContent>
                <S.ResultContent>
                    <FaChartLine className='ResultIcon'/>
                    연간 수익률: {(annualizedReturn * 100).toFixed(2)}%
                </S.ResultContent>
                <S.ResultContent>
                    <FaLevelDownAlt className='ResultIcon'/>
                    최대 손실: ${maxDrawdown.toFixed(2)}
                </S.ResultContent>
                <S.ResultContent>
                    <FaTrophy className='ResultIcon'/>
                    승률: {(winRate * 100).toFixed(2)}%
                </S.ResultContent>
                <S.ResultContent>
                    <FaArrowUp className='ResultIcon'/>
                    평균 수익: ${averageGain.toFixed(2)}
                </S.ResultContent>
                <S.ResultContent>
                    <FaArrowDown className='ResultIcon'/>
                    평균 손실: ${averageLoss.toFixed(2)}
                </S.ResultContent>
                <S.ResultContent>
                    <FaCrosshairs className='ResultIcon'/>
                    샤프 비율: {sharpeRatio.toFixed(2)}
                </S.ResultContent>
                <S.ResultContent>
                    <FaExchangeAlt className='ResultIcon'/>
                    거래 횟수: {trades.length}
                </S.ResultContent>
                <S.ResultContent>
                    <FaClock className='ResultIcon'/>
                    평균 보유 기간: {averageHoldingPeriod.toFixed(2)} days
                </S.ResultContent>
            </S.ResultInnerContainer>
            <BackTestChart trades={trades} />
        </S.ResultContainer>
    );
};

export default BackTestResults;