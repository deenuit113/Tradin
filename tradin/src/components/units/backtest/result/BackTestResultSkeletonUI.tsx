import React from 'react';
import * as S from './BackTestResult.styles';

const ResultSkeletonUI: React.FC = () => {
    const strategyCount = 2;
    const isSkeleton = true;

    return (
        <S.ResultContainer>
            <S.ResultHeader>
                <S.ResultTitle>실행 결과:</S.ResultTitle>
                <S.ExecutedOptionsContainer>
                    {[...Array(4)].map((_, index) => (
                        <S.ExecutedOptionsSkeletonBox key={index} />
                    ))}
                </S.ExecutedOptionsContainer>
            </S.ResultHeader>
            <S.ResultInnerContainer>
                <S.ResultContentGroup strategyCount={strategyCount}>
                    {[...Array(strategyCount)].map((_, strategyIndex) => (
                        <S.ResultContentContainer key={strategyIndex} strategyCount={strategyCount}>
                            <S.ResultSkeletonContent style={{ width: '100%', height: '20px', marginBottom: '10px' }} /> {/* Strategy title */}
                            {[...Array(8)].map((_, index) => (
                                <S.ResultSkeletonContent key={index} />
                            ))}
                        </S.ResultContentContainer>
                    ))}
                </S.ResultContentGroup>
                <S.TransactionHistoryContainer>
                    <S.TransactionHistoryScroll strategyCount={strategyCount}>
                        {[...Array(strategyCount)].map((_, strategyIndex) => (
                            <S.StrategyTransactions key={strategyIndex} strategyCount={strategyCount}>
                                <S.StrategyTitle>
                                    <S.ResultSkeletonContent style={{ width: '50%', height: '20px' }} />
                                </S.StrategyTitle>
                                <S.TransactionList isSkeleton={isSkeleton}>
                                    {[...Array(5)].map((_, index) => (
                                        <S.TransactionItem key={index} strategyCount={2}>
                                            {[...Array(5)].map((_, detailIndex) => (
                                                <S.ResultSkeletonContent key={detailIndex} style={{ width: '100%', height: '15px', marginBottom: '5px' }} />
                                            ))}
                                        </S.TransactionItem>
                                    ))}
                                </S.TransactionList>
                            </S.StrategyTransactions>
                        ))}
                    </S.TransactionHistoryScroll>
                </S.TransactionHistoryContainer>
            </S.ResultInnerContainer>
            <S.ChartControls>
                <S.ResultSkeletonContent style={{ width: '100px', height: '30px' }} />
            </S.ChartControls>
            <S.ChartSkeletonContainer />
        </S.ResultContainer>
    );
};

export default ResultSkeletonUI;