import React from 'react';
import * as S from './BackTestResult.styles';

const ResultSkeletonUI: React.FC = () => {
    return (
        <S.ResultContainer>
            <S.ResultHeader>
                <S.ResultTitle>실행 결과:</S.ResultTitle>
                <S.ExecutedOptionsSkeletonBox />
            </S.ResultHeader>
            <S.ResultInnerContainer>
                {[...Array(9)].map((_, index) => (
                    <S.ResultSkeletonContent key={index} />
                ))}
            </S.ResultInnerContainer>
            <S.ChartSkeletonContainer />
        </S.ResultContainer>
    );
};

export default ResultSkeletonUI;