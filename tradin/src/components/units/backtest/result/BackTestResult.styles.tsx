import styled from '@emotion/styled';
import { keyframes } from "@emotion/react";

// BackTest 결과 화면
export const ResultContainer = styled.div`
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    width: 100%;
    flex-grow: 1;
    padding: 2rem;
    border-radius: 8px;
    overflow: auto;
    margin-bottom: 1rem;
    overflow-y: hidden;
`;

export const ResultHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
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
    height: 80vh;
    overflow: hidden;
`;

export const ResultContentGroup = styled.div<{ strategyCount: number }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    height: ${props => props.strategyCount === 1 ? '50%' : '100%'};
    overflow-y: auto;
    flex-shrink: 0;
`;

export const ResultContentContainer = styled.div<{ strategyCount: number }>`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 100%;
    padding: 1rem;
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor};
    border-radius: 6px;
    height: ${props => {
        if (props.strategyCount === 1) return '100%';
        if (props.strategyCount === 2) return '50%';
        return '33.33%';
    }};
    overflow-y: hidden;
`

export const ResultSubtitle = styled.label`
    color: ${({ theme }) => theme.textColor};
    font-size: 1.1em;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 0;
    border-bottom: 1px solid ${({ theme }) => theme.moreinnerborderColor};
    width: 100%;
    transition: all 0.3s ease;

    @media (max-width: 799px) {
        font-size: 0.7em;
    }
`;

export const ResultContent = styled.p<{ strategyCount: number }>`
    color: ${({ theme }) => theme.textColor};
    width: calc(50% - 0.5rem);
    margin: 0;
    transition: all 0.3s ease;
    display: flex;
    align-content: center;
    align-items: center;
    font-size: ${props => {
        if (props.strategyCount === 1) return '0.9em';
        if (props.strategyCount === 2) return '0.7em';
        return '0.7em';
    }};


    .ResultIcon {
        margin-right: 5px;
        font-size: 1em;
    }

    @media (max-width: 799px) {
        font-size: 0.5em;

        .ResultIcon {
            font-size: 1.5em;
        }
    }
`

// BackTest 결과 화면 실행 옵션

export const ExecutedOptionsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

export const ExecutedOptionItem = styled.div`
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor|| '#f0f0f0'};
    color: ${({ theme }) => theme.timeTextColor};
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.9em;

    .OptionIcon {
        margin-right: 5px;
    }

    @media (max-width: 799px) {
        font-size: 0.5em;
        padding: 3px 6px;
    }
`;

// BackTest 결과 캐러셀

const slideInFromRight = keyframes`
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
`;

const slideOutToLeft = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
    }
`;

const slideInFromLeft = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
`;

const slideOutToRight = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(100%);
    }
`;

export const CarouselContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 1px solid red;
`;

export const CarouselPage = styled.div<{ isActive: boolean; isNext: boolean }>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    animation: ${props => {
        if (props.isActive) {
            return props.isNext ? slideInFromRight : slideInFromLeft;
        } else {
            return props.isNext ? slideOutToLeft : slideOutToRight;
        }
    }} 0.3s ease-in-out;
    animation-fill-mode: forwards;
`;

export const CarouselContent = styled.div<{ currentPage: number }>`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const CarouselControls = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
`;

export const CarouselButton = styled.button`
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 18px;
`;

export const CarouselDots = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;
`;

export const CarouselDot = styled.div<{ active: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => props.active ? '#333' : '#ccc'};
    margin: 0 5px;
    cursor: pointer;
`;

// BackTest 차트 보기 방식

export const ChartControls = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    gap: 1rem;
    padding: 0 1rem;
`;

export const ChartSelect = styled.select`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 1px #777;
    }

    @media (max-width: 799px) {
        font-size: 0.7rem;
        padding: 0.2rem 0.4rem;
    }
`;

// TransActionHistory

export const TransactionHistoryContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    height: 100%;
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor};
    padding: 0.5rem 0.5rem 1rem 0.5rem;
    border-radius: 6px;
    flex-shrink: 0;
`;

export const TransactionHistoryScroll = styled.div<{ strategyCount: number }>`
    display: flex;
    flex-direction: row;
    width: ${props => props.strategyCount > 2 ? '150%' : '100%'};
`;

export const StrategyTransactions = styled.div<{ strategyCount: number }>`
    display: flex;
    flex-direction: column;
    width: ${props => {
        if (props.strategyCount === 1) return '100%';
        if (props.strategyCount === 2) return '50%';
        return '50%';
    }};
    padding: 0 10px;
    height: 100%;
`;
export const StrategyTitle = styled.h3`
    margin-bottom: 10px;
    color: ${({ theme }) => theme.textColor};
`;

export const TransactionList = styled.div<{ isSkeleton : boolean }>`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0.5rem;
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    border-radius: 4px;
    padding: 0.5rem 0.5rem;
    overflow-y: ${props => props.isSkeleton ? 'hidden' : 'auto'};

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color:  ${({ theme }) => theme.scrollbarThumbColor};
        border-radius: 6px;
        transition: background-color 0.3s ease;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 8px;
    }

    &:hover {
        &::-webkit-scrollbar {
            width: 8px;
        }
    }
`;

export const TransactionItem = styled.div<{ strategyCount: number }>`
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 5px;
    padding: ${props => {
        if (props.strategyCount === 1) return '1rem';
        return '10px';
    }};
    margin-bottom: 10px;
`;

export const TransactionDetail = styled.p<{ strategyCount: number }>`
    margin: 5px 0;
    color: ${({ theme }) => theme.textColor};
    font-size: ${props => {
        if (props.strategyCount === 1) return '1em';
        return '0.8em';
    }};
`;

export const ProfitAmount = styled.span<{ isPositive: boolean }>`
    color: ${({ isPositive, theme }) => isPositive ? theme.ProfitPositiveColor: theme.ProfitNegativeColor};
    font-weight: bold;
`;

// BackTest 차트

export const ChartContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50vh;
    overflow: hidden;
    canvas {
        width: 100% !important;
        height: auto !important;
    }
    @media all and (max-width: 800px) {
        padding: 0;
    }
`;

// BackTest Skeleton UI

export const shimmer = keyframes`
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
`;

export const SkeletonBox = styled.div`
    background: ${({ theme }) => theme.skeletonBaseColor};
    background-image: linear-gradient(
        90deg,
        ${({ theme }) => theme.skeletonBaseColor} 0%, 
        ${({ theme }) => theme.skeletonHighlightColor} 20%, 
        ${({ theme }) => theme.skeletonBaseColor} 40%, 
        ${({ theme }) => theme.skeletonBaseColor} 100%
    );
    background-repeat: no-repeat;
    background-size: 200% 100%;
    display: inline-block;
    position: relative;
    animation: ${shimmer} 1.5s infinite linear;
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