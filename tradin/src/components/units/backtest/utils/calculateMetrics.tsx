import { Trade } from "../main/BackTest.types";

// 총 수익 계산
export function calculateTotalReturn(trades: any[]) {
    return trades.reduce((acc, trade) => acc + trade.profit, 0);
}

// 연간 수익률 계산
export function calculateAnnualizedReturn(totalReturn: number, initialCapital: number, holdingPeriodYears: number) {
    const yieldReturn = totalReturn / initialCapital;
    return (1 + yieldReturn) ** (1 / holdingPeriodYears) - 1;
}

// 최대 손실 계산
export function calculateMaxDrawdown(capitalSeries: number[]) {
    let maxDrawdown = 0;
    let peak = capitalSeries[0];
    for (const capital of capitalSeries) {
        if (capital > peak) peak = capital;
        const drawdown = peak - capital;
        if (drawdown > maxDrawdown) maxDrawdown = drawdown;
    }
    return maxDrawdown;
}

// 승률 계산
export function calculateWinRate(trades: any[]) {
    const winningTrades = trades.filter(trade => trade.profit > 0);
    return winningTrades.length / trades.length;
}

// 평균 수익 계산
export function calculateAverageGain(trades: any[]) {
    const winningTrades = trades.filter(trade => trade.profit > 0);
    return winningTrades.length > 0 ? winningTrades.reduce((sum, trade) => sum + trade.profit, 0) / winningTrades.length : 0;
}

// 평균 손실 계산
export function calculateAverageLoss(trades: any[]) {
    const losingTrades = trades.filter(trade => trade.profit <= 0);
    return losingTrades.length > 0 ? losingTrades.reduce((sum, trade) => sum + trade.profit, 0) / losingTrades.length : 0;
}

// 샤프 비율 계산
export function calculateSharpeRatio(meanReturn: number, stdDevReturn: number) {
    return stdDevReturn !== 0 ? meanReturn / stdDevReturn : 0;
}

// 평균 보유 기간 계산산
export const calculateAverageHoldingPeriod = (trades: Trade[]): number => {
    const validTrades = trades.filter(trade => trade.entryTime && trade.exitTime);
    if (validTrades.length === 0) return 0;

    const totalHoldingPeriod = validTrades.reduce((sum, trade) => {
        const entryDate = new Date(trade.entryTime);
        const exitDate = new Date(trade.exitTime);
        const holdingPeriod = (exitDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24); // Convert to days
        return sum + holdingPeriod;
    }, 0);

    return totalHoldingPeriod / validTrades.length;
};

// 모든 계산 실행
export const calculateAllMetrics = (trades: Trade[], initialCapital: number) => {
    const totalReturn = calculateTotalReturn(trades);
    const annualizedReturn = calculateAnnualizedReturn(totalReturn, initialCapital, 1);
    const maxDrawdown = calculateMaxDrawdown(trades.map(trade => trade.profit));
    const winRate = calculateWinRate(trades);
    const averageGain = calculateAverageGain(trades);
    const averageLoss = calculateAverageLoss(trades);
    const sharpeRatio = calculateSharpeRatio(averageGain - averageLoss, 1);
    const averageHoldingPeriod = calculateAverageHoldingPeriod(trades);

    return {
        totalReturn,
        annualizedReturn,
        maxDrawdown,
        winRate,
        averageGain,
        averageLoss,
        sharpeRatio,
        tradeCount: trades.length,
        averageHoldingPeriod
    };
};