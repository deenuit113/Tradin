import React, { useState } from 'react';
import * as S from "./BackTest.styles";
import { useSidebar } from "../../commons/sidebar/SidebarContext";
import Breadcrumb from "../../commons/breadcrumb/BreadCrumb";
import { strategies, StrategyKey } from './MockStrategy';
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
import BackTestChart from './BackTestChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faAlignRight, faFilter } from '@fortawesome/free-solid-svg-icons';
import OptionsContainer from './BackTestOption';

export default function BackTestPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [trades, setTrades] = useState<any[]>([]);
    const [selectedStrategies, setSelectedStrategies] = useState<StrategyKey[]>([]);
    const [position, setPosition] = useState<string>('long');
    const [startDate, setStartDate] = useState<string>('2023-01-01');
    const [endDate, setEndDate] = useState<string>('2024-01-01');
    const initialCapital = 10000;

    const [optionsVisible, setOptionsVisible] = useState(true);

    const toggleOptions = () => {
        if (optionsVisible) {
            setOptionsVisible(false);
        } else {
            setOptionsVisible(true);
        }
    };

    const handleStrategyChange = (strategy: StrategyKey) => {
        setSelectedStrategies((prev) =>
            prev.includes(strategy)
                ? prev.filter((s) => s !== strategy)
                : [...prev, strategy]
        );
    };

    const performBackTest = async () => {
        if (!selectedStrategies.length || !startDate || !endDate) {
            alert("Please select strategies, position, and date range.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const selectedStrategyKey = selectedStrategies[0];

            const response = await fetch('/api/backtest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ strategyKey: selectedStrategyKey, startDate, endDate, position }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTrades(data);
        } catch (err) {
            setError('Failed to perform backtest');
        } finally {
            setLoading(false);
        }
    };

    const totalReturn = calculateTotalReturn(trades); // 총 수익
    const annualizedReturn = calculateAnnualizedReturn(totalReturn, initialCapital, 1); //연간 수익률
    const maxDrawdown = calculateMaxDrawdown(trades.map(trade => trade.profit)); // 최대 손실
    const winRate = calculateWinRate(trades); // 승률
    const averageGain = calculateAverageGain(trades); // 평균 수익 및 손실
    const averageLoss = calculateAverageLoss(trades); // 샤프 비율
    const sharpeRatio = calculateSharpeRatio(averageGain - averageLoss, 1); // 거래 횟수
    const averageHoldingPeriod = calculateAverageHoldingPeriod(trades); // 포지션 평균 보유 기간

    return (
        <>
            <S.Container>
                <S.BackTestHeader sidebarOpen={sidebarOpen}>
                    <Breadcrumb />
                </S.BackTestHeader>
                <S.MainContent sidebarOpen={sidebarOpen}>
                    <S.WidgetContainer>
                        <h3>백테스트</h3>
                        <S.OptionToggleButton onClick={toggleOptions}>
                            <FontAwesomeIcon className="FilterIcon" icon={faFilter} />
                            {optionsVisible ? '옵션 숨기기' : '옵션 보기'}
                        </S.OptionToggleButton>
                        <OptionsContainer
                            isVisible={optionsVisible}
                            selectedStrategies={selectedStrategies}
                            handleStrategyChange={handleStrategyChange}
                            position={position}
                            setPosition={setPosition}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            performBackTest={performBackTest}
                            loading={loading}
                        />
                        {loading && <p>Loading data...</p>}
                        {error && <p>{error}</p>}
                        {trades.length > 0 && (
                            <S.ResultContainer>
                                <h4>실행 결과:</h4>
                                <p>총 수익: ${totalReturn.toFixed(2)}</p>
                                <p>연간 수익률: {(annualizedReturn * 100).toFixed(2)}%</p>
                                <p>최대 손실: ${maxDrawdown.toFixed(2)}</p>
                                <p>승률: {(winRate * 100).toFixed(2)}%</p>
                                <p>평균 수익: ${averageGain.toFixed(2)}</p>
                                <p>평균 손실: ${averageLoss.toFixed(2)}</p>
                                <p>샤프 비율: {sharpeRatio.toFixed(2)}</p>
                                <p>거래 횟수: {trades.length}</p>
                                <p>평균 보유 기간: {averageHoldingPeriod.toFixed(2)} days</p>
                                <BackTestChart trades={trades} />
                            </S.ResultContainer>
                        )}
                    </S.WidgetContainer>
                </S.MainContent>
            </S.Container>
        </>
    );
}