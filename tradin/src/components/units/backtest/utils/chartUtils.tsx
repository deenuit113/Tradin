import { Trade } from '../main/BackTest.types';
import { Theme as CustomTheme } from '../../../../styles/theme';

// BackTest chart util

export const calculateMetrics = (tradeList: Trade[]) => {
    const profits = tradeList.map(trade => trade.profit);
    const equityCurve = profits.reduce((acc, profit) => [...acc, (acc[acc.length - 1] || 0) + profit], [0]);
    const drawdown = equityCurve.map((equity, i) => {
        const peak = Math.max(...equityCurve.slice(0, i + 1));
        return (peak - equity) / peak * 100;
    });

    return { profits, equityCurve, drawdown };
};

export const getChartOptions = (theme: CustomTheme) => ({
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top' as const,
            labels: {
                color: theme.textColor,
            },
        },
    },
    scales: {
        x: {
            ticks: {
                color: theme.textColor,
            },
            grid: {
                color: `${theme.textColor}22`,
            },
        },
        y: {
            ticks: {
                color: theme.textColor,
            },
            grid: {
                color: `${theme.textColor}22`,
            },
        },
    },
});