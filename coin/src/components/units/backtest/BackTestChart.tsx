import React from 'react';
import { Line } from 'react-chartjs-2';
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
}

const BackTestChart: React.FC<BackTestChartProps> = ({ trades }) => {
    const data = {
        labels: trades.map(trade => new Date(trade.entryTime).toLocaleDateString()),
        datasets: [
            {
                label: 'Profit/Loss',
                data: trades.map(trade => trade.profit),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default BackTestChart;