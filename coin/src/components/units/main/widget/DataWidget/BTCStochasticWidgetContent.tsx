import React, { useState } from "react";
import { useStochasticData } from "../../../../../hooks/useStochasticData";
import styled from "@emotion/styled";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import Switch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as S from "../../Main.styles";

// Chart.js 등록
ChartJS.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

const ChartContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

const SwitchContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`;

const IconTextSwitch = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-right: 10px;
`;

const StochasticWidgetContent: React.FC = () => {
    const [showK, setShowK] = useState(true);
    const { data, loading, error } = useStochasticData("BTCUSDT");

    if (loading) return <S.WidgetContent><FontAwesomeIcon id="LoadingIcon" icon={faSpinner} spin /></S.WidgetContent>;
    if (error) return <p>Error: {error}</p>;

    // 데이터를 날짜와 %K, %D 값으로 변환
    const labels = data.map((entry) => entry.timestamp);
    const kData = data.map((entry) => entry.k);
    const dData = data.map((entry) => entry.d);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "%K",
                data: showK ? kData : [],
                borderColor: "blue",
                backgroundColor: "transparent",
                fill: false,
                tension: 0.1,
                pointRadius: 0,
            },
            {
                label: "%D",
                data: !showK ? dData : [],
                borderColor: "orange",
                backgroundColor: "transparent",
                fill: false,
                tension: 0.1,
                pointRadius: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                mode: 'nearest' as const, // 타입을 명시적으로 지정
                intersect: false,
                callbacks: {
                    label: function (context: any) {
                        return `${context.dataset.label}: ${context.raw.toFixed(2)}`;
                    },
                },
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
    };

    return (
        <S.WidgetContent>
            <SwitchContainer>
                <IconTextSwitch>
                    <Switch
                        onChange={() => setShowK(prev => !prev)}
                        checked={showK}
                        offColor="#888"
                        onColor="#0d6efd"
                        uncheckedIcon={<FontAwesomeIcon icon={faArrowDown} style={{ color: 'blue', padding: '5px', fontSize: '11px' }} />}
                        checkedIcon={<FontAwesomeIcon icon={faArrowUp} style={{ color: 'orange', padding: '5px', fontSize: '11px' }} />}
                        height={18}
                        width={30}
                        aria-label="K와 D 스위치"
                        role="switch"
                        className="K-D-Switch"
                    />
                    <span style={{ marginLeft: '3px' }}>{showK ? 'K' : 'D'}</span>
                </IconTextSwitch>
            </SwitchContainer>
            <ChartContainer>
                <Line data={chartData} options={options} />
            </ChartContainer>
        </S.WidgetContent>
    );
};

export default StochasticWidgetContent;
