import React from 'react';
import * as S from './BackTestResult.styles';

const ResultSkeletonUI: React.FC = () => {
    const metricCount = 8;

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
                <S.CarouselContainer>
                    <S.CarouselContent currentPage={0}>
                        <S.CarouselPage isActive={true} isNext={false}>
                            <S.ResultContentContainer>
                                <S.ResultContent strategyCount={2}>
                                    {[...Array(metricCount)].map((_, metricIndex) => (
                                        <S.ResultSkeletonContent 
                                            key={metricIndex}
                                            style={{
                                                width: '100%',
                                                height: '4rem', // MetricContainer의 높이와 동일하게 설정
                                                marginBottom: '1rem', // 각 MetricContainer 사이의 간격
                                                backgroundColor: 'rgba(200, 200, 200, 0.5)',
                                                borderRadius: '0.2rem'
                                            }}
                                        />
                                    ))}
                                </S.ResultContent>
                            </S.ResultContentContainer>
                        </S.CarouselPage>
                    </S.CarouselContent>
                </S.CarouselContainer>
                <S.CarouselDots>
                    <S.CarouselDot active={true} />
                    <S.CarouselDot active={false} />
                </S.CarouselDots>
            </S.ResultInnerContainer>
            <S.ChartControls>
                <S.ResultSkeletonContent style={{ width: '100px', height: '30px' }} />
            </S.ChartControls>
            <S.ChartSkeletonContainer />
        </S.ResultContainer>
    );
};

export default ResultSkeletonUI;