import styled from '@emotion/styled';
import { css, keyframes } from "@emotion/react";

// BackTest Result Content

export const ResultContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
    height: 100%;
    overflow-y: auto;
    flex-shrink: 0;
`;

export const ResultContent = styled.div<{ strategyCount: number }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: ${props => `${0.1 / props.strategyCount}rem`};
`;

export const MetricContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    height: 4rem;
    padding: 0 1rem;
`;

export const MetricTitle = styled.h3`
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    width: 7rem;
    color: ${({ theme }) => theme.textColor};
    z-index: 1;

    @media (max-width: 799px) {
        width: 5rem;
        font-size: 0.8rem;
    }
`;

export const BarChartContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    align-items: center;
`;


export const BarChartGroup = styled.div<{ strategyCount: number }>`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: ${props => `${props.strategyCount * 1.05}rem`};
    position: relative;
    border-radius: 0.3rem;
    overflow: hidden;
    gap: 0.1rem;
`;

const fillAnimation = keyframes`
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
`;

export const BarChart = styled.div<{ width: number; color: string; isAnimating: boolean; index: number; total: number }>`
    width: ${props => props.isAnimating ? '0' : `${props.width}%`};
    height: ${props => `${100 / props.total}%`};
    background-color: ${props => props.color};
    opacity: 0.8;
    position: absolute;
    left: 0;
    top: ${props => `${(props.index * 100) / props.total}%`};
    transition: width 0.5s ease-out, opacity 0.3s ease;
    border-radius: 0.2rem;
    box-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    padding-left: 0.5rem;

    ${props => props.isAnimating && css`
        animation: ${fillAnimation} 1s ease-out forwards;
    `}

    &:hover {
        opacity: 1;
    }
`;

export const StrategyName = styled.span`
    color: white;
    font-size: 0.7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 90%;
`;

export const ResultValue = styled.div<{ strategyCount: number }>`
    width: 6rem;
    text-align: right;
    color: ${({ theme }) => theme.timeTextColor};
    font-size: ${props => `${1 - (props.strategyCount - 1) * 0.1}rem`};

    @media (max-width: 799px) {
        font-size: ${props => `${0.9 - (props.strategyCount - 1) * 0.1}rem`};
    }
`;
