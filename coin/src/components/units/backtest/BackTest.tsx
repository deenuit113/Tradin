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

export default function BackTestPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [trades, setTrades] = useState<any[]>([]);
    const [selectedStrategies, setSelectedStrategies] = useState<StrategyKey[]>([]);
    const [position, setPosition] = useState<string>('long');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const initialCapital = 10000;

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
                        <div>
                            <h3>백테스트</h3>
                            <div>
                                <h4>전략</h4>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedStrategies.includes('A')}
                                        onChange={() => handleStrategyChange('A')}
                                    />
                                    전략 A
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedStrategies.includes('B')}
                                        onChange={() => handleStrategyChange('B')}
                                    />
                                    전략 B
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedStrategies.includes('C')}
                                        onChange={() => handleStrategyChange('C')}
                                    />
                                    전략 C
                                </label>
                            </div>
                            <div>
                                <h4>포지션</h4>
                                <label>
                                    <input
                                        type="radio"
                                        name="position"
                                        value="long"
                                        checked={position === 'long'}
                                        onChange={() => setPosition('long')}
                                    />
                                    Long
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="position"
                                        value="short"
                                        checked={position === 'short'}
                                        onChange={() => setPosition('short')}
                                    />
                                    Short
                                </label>
                            </div>
                            <div>
                                <h4>기간 선택</h4>
                                <label>
                                    시작 날짜
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </label>
                                <label>
                                    종료 날짜
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </label>
                            </div>
                            <button onClick={performBackTest} disabled={loading}>
                                백테스트 실행
                            </button>
                            {loading && <p>Loading data...</p>}
                            {error && <p>{error}</p>}
                            {trades.length > 0 && (
                                <div>
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
                                </div>
                            )}
                        </div>
                    </S.WidgetContainer>
                </S.MainContent>
            </S.Container>
        </>
    );
}