export function calculateTotalReturn(trades: any[]) {
    return trades.reduce((acc, trade) => acc + trade.profit, 0);
}

export function calculateAnnualizedReturn(totalReturn: number, initialCapital: number, holdingPeriodYears: number) {
    const yieldReturn = totalReturn / initialCapital;
    return (1 + yieldReturn) ** (1 / holdingPeriodYears) - 1;
}

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

export function calculateWinRate(trades: any[]) {
    const winningTrades = trades.filter(trade => trade.profit > 0);
    return winningTrades.length / trades.length;
}

export function calculateAverageGain(trades: any[]) {
    const winningTrades = trades.filter(trade => trade.profit > 0);
    return winningTrades.length > 0 ? winningTrades.reduce((sum, trade) => sum + trade.profit, 0) / winningTrades.length : 0;
}

export function calculateAverageLoss(trades: any[]) {
    const losingTrades = trades.filter(trade => trade.profit <= 0);
    return losingTrades.length > 0 ? losingTrades.reduce((sum, trade) => sum + trade.profit, 0) / losingTrades.length : 0;
}

export function calculateSharpeRatio(meanReturn: number, stdDevReturn: number) {
    return stdDevReturn !== 0 ? meanReturn / stdDevReturn : 0;
}

export function calculateAverageHoldingPeriod(trades: any[]) {
    return trades.reduce((sum, trade) => sum + trade.holdingPeriod, 0) / trades.length;
}
