import styled from '@emotion/styled';

// BackTest 차트

export const ChartContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50vh;
    overflow: hidden;
    canvas {
        width: 95% !important;
        height: auto !important;
    }
    @media all and (max-width: 800px) {
        padding: 0;
    }
`;