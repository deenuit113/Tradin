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
            const selectedStrategyKey = selectedStrategies[0]; // Use the first selected strategy for simplicity

            // Send the selected strategy key to the server
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

    const totalReturn = calculateTotalReturn(trades);
    const annualizedReturn = calculateAnnualizedReturn(totalReturn, initialCapital, 1); // Assuming 1 year for simplicity
    const maxDrawdown = calculateMaxDrawdown(trades.map(trade => trade.profit));
    const winRate = calculateWinRate(trades);
    const averageGain = calculateAverageGain(trades);
    const averageLoss = calculateAverageLoss(trades);
    const sharpeRatio = calculateSharpeRatio(averageGain - averageLoss, 1); // Assuming a standard deviation of 1 for simplicity
    const averageHoldingPeriod = calculateAverageHoldingPeriod(trades);

    return (
        <>
            <S.Container>
                <S.BackTestHeader sidebarOpen={sidebarOpen}>
                    <Breadcrumb />
                </S.BackTestHeader>
                <S.MainContent sidebarOpen={sidebarOpen}>
                    <S.WidgetContainer>
                        <div>
                            <h3>Backtest</h3>
                            <div>
                                <h4>Select Strategies</h4>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedStrategies.includes('A')}
                                        onChange={() => handleStrategyChange('A')}
                                    />
                                    Strategy A
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedStrategies.includes('B')}
                                        onChange={() => handleStrategyChange('B')}
                                    />
                                    Strategy B
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedStrategies.includes('C')}
                                        onChange={() => handleStrategyChange('C')}
                                    />
                                    Strategy C
                                </label>
                            </div>
                            <div>
                                <h4>Select Position</h4>
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
                                <h4>Select Date Range</h4>
                                <label>
                                    Start Date:
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </label>
                                <label>
                                    End Date:
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </label>
                            </div>
                            <button onClick={performBackTest} disabled={loading}>
                                Run Backtest
                            </button>
                            {loading && <p>Loading data...</p>}
                            {error && <p>{error}</p>}
                            {trades.length > 0 && (
                                <div>
                                    <h4>Backtest Results:</h4>
                                    <p>Total Return: ${totalReturn.toFixed(2)}</p>
                                    <p>Annualized Return: {(annualizedReturn * 100).toFixed(2)}%</p>
                                    <p>Maximum Drawdown: ${maxDrawdown.toFixed(2)}</p>
                                    <p>Win Rate: {(winRate * 100).toFixed(2)}%</p>
                                    <p>Average Gain: ${averageGain.toFixed(2)}</p>
                                    <p>Average Loss: ${averageLoss.toFixed(2)}</p>
                                    <p>Sharpe Ratio: {sharpeRatio.toFixed(2)}</p>
                                    <p>Number of Trades: {trades.length}</p>
                                    <p>Average Holding Period: {averageHoldingPeriod.toFixed(2)} days</p>
                                </div>
                            )}
                        </div>
                    </S.WidgetContainer>
                </S.MainContent>
            </S.Container>
        </>
    );
}
