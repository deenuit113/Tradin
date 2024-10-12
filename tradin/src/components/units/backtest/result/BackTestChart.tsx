import React, { useMemo, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import * as S from "./BackTestResult.styles";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { useTheme } from '@emotion/react';
import { BackTestChartProps } from './BackTestResult.types';
import { calculateMetrics, getChartOptions } from '../utils/chartUtils';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const BackTestChart: React.FC<BackTestChartProps> = ({ trades, selectedMetric }) => {
    const theme = useTheme();
    const chartRef = useRef<ChartJS<"line">>(null!);

    const colors = [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ];

    const chartData = useMemo(() => {
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

        return {
            labels: trades[Object.keys(trades)[0]].map(trade => new Date(trade.entryTime).toLocaleDateString()),
            datasets,
        };
    }, [trades, selectedMetric]);

    const options: ChartOptions<'line'> = useMemo(() => {
        const baseOptions = getChartOptions(theme);
        return {
            ...baseOptions,
            plugins: {
                ...baseOptions.plugins,
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: (context) => {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                const value = context.parsed.y;
                                if (selectedMetric === 'drawdown') {
                                    label += value.toFixed(2) + '%';
                                } else {
                                    label += new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    }).format(value);
                                }
                            }
                            return label;
                        }
                    }
                }
            },
            hover: {
                mode: 'nearest',
                intersect: false,
                axis: 'x'
            },
            elements: {
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 5
                }
            }
        };
    }, [theme, selectedMetric]);

    return (
        <S.ChartContainer>
            <Line ref={chartRef} className='BackTestChart' data={chartData} options={options} />
        </S.ChartContainer>
    );
};

export default BackTestChart;