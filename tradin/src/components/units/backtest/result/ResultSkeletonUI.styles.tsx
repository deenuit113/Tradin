import styled from '@emotion/styled';
import { css, keyframes } from "@emotion/react";
import { CSSProperties } from 'react';


// BackTest Skeleton UI

export const ResultContainer = styled.div`
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    width: 100%;
    flex-grow: 1;
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: hidden;
    margin-bottom: 1rem;
    overflow-y: hidden;
`;

export const ResultHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0rem 1rem 1rem 1rem;
    width: 100%;
`;

export const ResultTitle = styled.h4`
    color: ${({ theme }) => theme.textColor};
    margin-right: 1rem;
    transition: all 0.3s ease;
    width: auto;
`;

export const ResultInnerContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    overflow: hidden;
    margin-bottom: 1rem;
    padding: 0 2rem;
    gap: 10px;
`;

export const ExecutedOptionsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    @media (max-width: 799px) {
        gap: 7px;
    }
`;

export const CarouselContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const CarouselPage = styled.div<{ isActive: boolean; isNext: boolean }>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

export const CarouselContent = styled.div<{ currentPage: number }>`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const CarouselDots = styled.div`
    top: 95%;
    width: 100%;
    margin: 0;
    padding: 1% 0;
    height: 3%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;
export const CarouselDot = styled.div<{ active: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ active, theme }) => (active ? theme.CarouselDotActiveColor : theme.CarouselDotDefaultColor)};
    margin: 0 5px;
    cursor: pointer;
`;

export const ChartControls = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    gap: 1rem;
    padding: 0 1rem;
`;

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

export const shimmer = keyframes`
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
`;

export const SkeletonBox = styled.div`
    background: ${({ theme }) => theme.skeletonBaseColor};
    background-image: linear-gradient(
        90deg,
        ${({ theme }) => theme.skeletonBaseColor} 0%,
        ${({ theme }) => theme.skeletonHighlightColor} 50%,
        ${({ theme }) => theme.skeletonBaseColor} 100%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 2s infinite linear;
`;

export const ResultSkeletonContent = styled(SkeletonBox)`
    width: calc(50% - 0.5rem);
    height: 30px;
    margin-bottom: 1rem;
    border-radius: 4px;
`;

export const ChartSkeletonContainer = styled(SkeletonBox)`
    width: 100%;
    height: 50vh;
    border-radius: 8px;
`;

export const ExecutedOptionsSkeletonBox = styled(SkeletonBox)`
    width: 200px;
    height: 20px;
    border-radius: 4px;
    align-content: center;
`;