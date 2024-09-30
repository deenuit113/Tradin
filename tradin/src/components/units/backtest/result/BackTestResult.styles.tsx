import styled from '@emotion/styled';
import { css, keyframes } from "@emotion/react";
import { CSSProperties } from 'react';

// BackTest 결과 화면
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

// BackTest 결과 화면 실행 옵션

export const ExecutedOptionsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    @media (max-width: 799px) {
        gap: 7px;
    }
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

export const SaveButton = styled.button`
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    margin: 10px;
    cursor: pointer;
    border-radius: 20px;
    transition: background-color 0.3s;
    font-size: 800;

    &:hover {
        background-color: #45a049;
    }

    
    @media (max-width: 799px) {
        font-size: 0.5em;
        padding: 3px 6px;
        margin: 4px 2px 4px 10px;
    }
`;

interface SaveOptionModalStyle {
    content?: CSSProperties;
    overlay?: CSSProperties;
  }
  
export const saveOptionModalStyle: SaveOptionModalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#333',
        border: 'none',
        borderRadius: '6px',
        padding: '0'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1200,
    }
};

export const ModalContent = styled.div`
    background-color: ${({ theme }) => theme.backgroundColor};
    padding: 2rem 1rem 1rem 1rem;
    border-radius: 6px;
    z-index: 1200;
    width: 20vw;
    max-height: 30vh;
    margin: 0;

    @media (max-width: 799px) {
        width: 50vw;
    }
`;

export const ModalInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor};
    box-shadow: none;
    color: ${({ theme }) => theme.textColor};
`;

export const ModalButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
`

export const ModalButton = styled.button`
    padding: 4px 7px;
    border: none;
    border-radius: 6px;
    font-size: 0.7rem;
    cursor: pointer;
    background-color:  ${({ theme }) => theme.innerbackgroundColor};
    color:  ${({ theme }) => theme.textColor};
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

export const CarouselButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 8px;
    cursor: pointer;
    font-size: 10px;
    border-radius: 50%;
    z-index: 2;
`;

export const PrevButton = styled(CarouselButton)`
    left: 0;
`;

export const NextButton = styled(CarouselButton)`
    right: 0;
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

// BackTest Result Content

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
    font-size: 0.8rem;
    width: 7rem;
    color: ${({ theme }) => theme.textColor};
    z-index: 1;

    @media (max-width: 799px) {
        width: 5rem;
        font-size: 0.7rem;
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
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    padding: 0;
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
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor};
    border-radius: 4px;
    padding: 1rem;
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
        width: 95% !important;
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