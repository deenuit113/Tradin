type Trade = {
    type: 'buy' | 'sell';
    price: number;
};

export function calculateMetrics(trades: Trade[], initialCapital: number, finalCapital: number) {
    // 총 수익 계산
    const totalReturn = finalCapital - initialCapital;

    // 연간 수익률 계산 (단순히 1년으로 가정)
    const holdingPeriodYears = 1;
    const annualizedReturn = (1 + (totalReturn / initialCapital)) ** (1 / holdingPeriodYears) - 1;

    // 자본 시리즈 생성 및 최대 손실 (최대 드로우다운) 계산
    const capitalSeries = trades.reduce<number[]>((acc, trade) => {
        const lastCapital = acc.length ? acc[acc.length - 1] : initialCapital;
        const newCapital = trade.type === 'buy' ? lastCapital - trade.price : lastCapital + trade.price;
        return [...acc, newCapital];
    }, []);
    const maxDrawdown = Math.min(...capitalSeries) - initialCapital;

    // 승률 계산
    const winningTrades = trades.filter(trade => trade.type === 'sell' && trade.price > initialCapital);
    const winRate = trades.length > 0 ? winningTrades.length / trades.length : 0;

    // 평균 수익 계산
    const averageGain = winningTrades.length > 0 
        ? winningTrades.reduce((sum, trade) => sum + (trade.price - initialCapital), 0) / winningTrades.length 
        : 0;

    // 평균 손실 계산
    const losingTrades = trades.filter(trade => trade.type === 'sell' && trade.price <= initialCapital);
    const averageLoss = losingTrades.length > 0 
        ? losingTrades.reduce((sum, trade) => sum + (trade.price - initialCapital), 0) / losingTrades.length 
        : 0;

    // 샤프 비율 계산
    const returns = capitalSeries.map((capital, index, array) => index === 0 ? 0 : (capital - array[index - 1]) / array[index - 1]);
    const meanReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const stdDevReturn = Math.sqrt(returns.reduce((sum, r) => sum + Math.pow(r - meanReturn, 2), 0) / returns.length);
    const sharpeRatio = stdDevReturn !== 0 ? meanReturn / stdDevReturn : 0;

    // 거래 횟수 계산
    const numberOfTrades = trades.length;

    // 평균 포지션 보유 기간 계산
    const averageHoldingPeriod = numberOfTrades > 0 ? holdingPeriodYears / numberOfTrades : 0;

    return {
        totalReturn,
        annualizedReturn,
        maxDrawdown,
        winRate,
        averageGain,
        averageLoss,
        sharpeRatio,
        numberOfTrades,
        averageHoldingPeriod,
    };
}
