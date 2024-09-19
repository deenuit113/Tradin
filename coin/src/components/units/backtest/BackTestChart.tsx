import React from 'react';
import { Line } from 'react-chartjs-2';
import * as S from "./BackTest.styles";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Theme as CustomTheme } from '../../../styles/theme'
import { useTheme } from '@emotion/react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Trade {
    entryTime: string;
    profit: number;
}

interface BackTestChartProps {
    trades: { [key: string]: Trade[] };
    selectedMetric: 'profit' | 'equity' | 'drawdown';
};

declare module "@emotion/react" {
    export interface Theme extends CustomTheme {}
}

const BackTestChart: React.FC<BackTestChartProps> = ({ trades, selectedMetric }) => {
    const theme = useTheme();

    const colors = [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ];

    const calculateMetrics = (tradeList: Trade[]) => {
        const profits = tradeList.map(trade => trade.profit);
        const equityCurve = profits.reduce((acc, profit) => [...acc, (acc[acc.length - 1] || 0) + profit], [0]);
        const drawdown = equityCurve.map((equity, i) => {
            const peak = Math.max(...equityCurve.slice(0, i + 1));
            return (peak - equity) / peak * 100;
        });

        return { profits, equityCurve, drawdown };
    };

    const datasets = Object.entries(trades).map(([strategy, tradeList], index) => {
        const { profits, equityCurve, drawdown } = calculateMetrics(tradeList);
        const color = colors[index % colors.length];

        let data;
        let label;
        switch (selectedMetric) {
            case 'profit':
                data = profits;
                label = `${strategy} 손익($)`;
                break;
            case 'equity':
                data = equityCurve;
                label = `${strategy} 자산($)`;
                break;
            case 'drawdown':
                data = drawdown;
                label = `${strategy} 최대 손실(%)`;
                break;
        }

        return {
            label,
            data,
            borderColor: color,
            backgroundColor: color.replace('1)', '0.2)'),
            fill: false,
        };
    });

    const data = {
        labels: trades[Object.keys(trades)[0]].map(trade => new Date(trade.entryTime).toLocaleDateString()),
        datasets,
    };

    const options = {
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
    };

    return (
        <S.ChartContainer>
            <Line className='BackTestChart' data={data} options={options} />
        </S.ChartContainer>
    )
};

export default BackTestChart;