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

interface BackTestChartProps {
    trades: any[];
};

declare module "@emotion/react" {
    export interface Theme extends CustomTheme {}
}

const BackTestChart: React.FC<BackTestChartProps> = ({ trades }) => {
    const theme = useTheme();

    // 자산 곡선 계산
    const equityCurve: number[] = trades.reduce((acc: number[], trade: any) => {
        const lastEquity = acc.length ? acc[acc.length - 1] : 0;
        return [...acc, lastEquity + trade.profit];
    }, []);

    // 최대 손실 계산
    const drawdown: number[] = equityCurve.map((val: number, idx: number): number => {
        const maxEquity = Math.max(...equityCurve.slice(0, idx + 1));
        return (maxEquity - val) / maxEquity * 100; // Convert to percentage
    });

    const data = {
        labels: trades.map(trade => new Date(trade.entryTime).toLocaleDateString()),
        datasets: [
            {
                label: '손익($)',
                data: trades.map(trade => trade.profit),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
            {
                label: '자산($)',
                data: equityCurve,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: false,
            },
            {
                label: '최대 손실(%)',
                data: drawdown,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
        ],
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