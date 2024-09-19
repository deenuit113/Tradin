import React from 'react';
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import * as S from './BackTest.styles';

// 스켈레톤 UI를 위한 애니메이션 효과
const shimmer = keyframes`
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
`;

const SkeletonBox = styled.div`
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

const ResultSkeletonContent = styled(SkeletonBox)`
    width: calc(50% - 0.5rem);
    height: 30px;
    margin-bottom: 1rem;
    border-radius: 4px;
`;

const ChartSkeletonContainer = styled(SkeletonBox)`
    width: 100%;
    height: 50vh;
    border-radius: 8px;
`;

const ExecutedOptionsSkeletonBox = styled(SkeletonBox)`
    width: 200px;
    height: 20px;
    border-radius: 4px;
`;

export const ResultSkeletonUI: React.FC = () => {
    return (
        <S.ResultContainer>
            <S.ResultHeader>
                <S.ResultTitle>실행 결과:</S.ResultTitle>
                <ExecutedOptionsSkeletonBox />
            </S.ResultHeader>
            <S.ResultInnerContainer>
                {[...Array(9)].map((_, index) => (
                    <ResultSkeletonContent key={index} />
                ))}
            </S.ResultInnerContainer>
            <ChartSkeletonContainer />
        </S.ResultContainer>
    );
};

export default ResultSkeletonUI;