// src/components/BackTest/BackTest.tsx
import React, { useState } from 'react';
import * as S from './BackTest.styles';
import { useSidebar } from '../../commons/sidebar/SidebarContext';
import Breadcrumb from '../../commons/breadcrumb/BreadCrumb';
import { useCryptoData } from '../../../hooks/useCryptoData';
import { calculateMetrics } from './CalculateMetrics';

function performBacktest(data: any[], selectedStrategies: string[], position: string, startDate: string, endDate: string) {
    // 날짜 범위에 따라 데이터를 필터링합니다.
    const filteredData = data.filter(entry => {
        const entryDate = new Date(entry.time);
        return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
    });

    // 초기 자본 및 거래 내역 초기화
    let initialCapital = 10000;
    let capital = initialCapital;
    let trades: any[] = [];

    filteredData.forEach(entry => {
        if (selectedStrategies.includes('A') && position === 'long') {
            if (entry.close < entry.open) {
                // 매수 시뮬레이션
                trades.push({ type: 'buy', price: entry.close });
                capital -= entry.close;
            }
        } else if (selectedStrategies.includes('B') && position === 'short') {
            if (entry.close > entry.open) {
                // 매도 시뮬레이션
                trades.push({ type: 'sell', price: entry.close });
                capital += entry.close;
            }
        }
        // 전략 C에 대한 로직 추가 가능
    });

    return {
        initialCapital,
        finalCapital: capital,
        trades
    };
}

export default function BackTestPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
    const [position, setPosition] = useState<string>('long');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [backtestResult, setBacktestResult] = useState<any | null>(null);

    const { data, loading, error } = useCryptoData('BTC', 'USD', startDate, endDate);

    const handleStrategyChange = (strategy: string) => {
        setSelectedStrategies((prev) =>
            prev.includes(strategy)
                ? prev.filter((s) => s !== strategy)
                : [...prev, strategy]
        );
    };

    const performBackTest = () => {
        if (!selectedStrategies.length || !startDate || !endDate) {
            alert("모든 설정을 선택해주세요.");
            return;
        }
        const { initialCapital, finalCapital, trades } = performBacktest(data, selectedStrategies, position, startDate, endDate);
        const metrics = calculateMetrics(trades, initialCapital, finalCapital);
        setBacktestResult(metrics);
    };

    return (
        <>
            <S.Container>
                <S.BackTestHeader sidebarOpen={sidebarOpen}>
                    <Breadcrumb />
                </S.BackTestHeader>
                <S.MainContent sidebarOpen={sidebarOpen}>
                    <S.WidgetContainer>
                        <div>
                            <h3>백테스트 설정</h3>
                            <div>
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
                                <label>
                                    시작 날짜:
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </label>
                                <label>
                                    종료 날짜:
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </label>
                            </div>
                            <button onClick={performBackTest}>백테스트 실행</button>
                            {loading && <p>Loading data...</p>}
                            {error && <p>{error}</p>}
                            {backtestResult && (
                                <div>
                                    <p>Total Return: ${backtestResult.totalReturn.toFixed(2)}</p>
                                    <p>Annualized Return: {(backtestResult.annualizedReturn * 100).toFixed(2)}%</p>
                                    <p>Maximum Drawdown: ${backtestResult.maxDrawdown.toFixed(2)}</p>
                                    <p>Win Rate: {(backtestResult.winRate * 100).toFixed(2)}%</p>
                                    <p>Average Gain: ${backtestResult.averageGain.toFixed(2)}</p>
                                    <p>Average Loss: ${backtestResult.averageLoss.toFixed(2)}</p>
                                    <p>Sharpe Ratio: {backtestResult.sharpeRatio.toFixed(2)}</p>
                                    <p>Number of Trades: {backtestResult.numberOfTrades}</p>
                                    <p>Average Holding Period: {backtestResult.averageHoldingPeriod.toFixed(2)} years</p>
                                </div>
                            )}
                        </div>
                    </S.WidgetContainer>
                </S.MainContent>
            </S.Container>
        </>
    );
}
