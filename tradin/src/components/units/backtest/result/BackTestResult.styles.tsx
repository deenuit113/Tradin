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
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
`

export const ResultSubtitle = styled.h5`
    color: ${({ theme }) => theme.textColor};
    font-size: 1.1em;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
    width: 100%;
    transition: all 0.3s ease;
`;

export const ResultContent = styled.p`
    color: ${({ theme }) => theme.textColor};
    width: calc(50% - 0.5rem);
    margin: 0;
    transition: all 0.3s ease;
    display: flex;
    align-content: center;
    align-items: center;

    .ResultIcon {
        margin-right: 5px;
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