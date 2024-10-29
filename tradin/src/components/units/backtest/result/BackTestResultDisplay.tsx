'use client';

import React, { useState, useEffect } from 'react';
import pako from 'pako';
import * as S from "./BackTestResult.styles"; // 스타일이 동일하다고 가정합니다.
import BackTestChart from './BackTestChart';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ResultTransactionHistory from './ResultTransactionHistory';
import ResultContent from './ResultContent';

const CarouselPage: React.FC<{
    pageNumber: number;
    currentPage: number;
    isNext: boolean;
    children: React.ReactNode;
}> = ({ pageNumber, currentPage, isNext, children }) => (
    <S.CarouselPage isActive={pageNumber === currentPage} isNext={isNext}>
        {children}
    </S.CarouselPage>
);

const BacktestDisplayPage = () => {
    const [data, setData] = useState(null);
    const [selectedMetric, setSelectedMetric] = useState<'profit' | 'equity' | 'drawdown'>('profit');
    const [currentPage, setCurrentPage] = useState(0);
    const [isNext, setIsNext] = useState(true);
    const initialCapital = 10000; // 초기 자본 설정
    
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        console.log(query);
        const compressedData = query.get('data');
        
        if (compressedData) {
            try {
                // Base64 디코딩 및 압축 해제
                const binaryString = atob(compressedData);
                const charData = binaryString.split('').map(char => char.charCodeAt(0));
                const binData = new Uint8Array(charData);
                const decompressedData = pako.inflate(binData, { to: 'string' });

                // JSON 파싱
                setData(JSON.parse(decompressedData));
            } catch (error) {
                console.error('Failed to decompress data:', error);
            }
        }
    }, []);

    if (!data) return <div>Loading...</div>;

    const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMetric(event.target.value as 'profit' | 'equity' | 'drawdown');
    };

    const handleNextPage = () => {
        setIsNext(true);
        setCurrentPage((prev) => (prev + 1) % 2);
    };

    const handlePrevPage = () => {
        setIsNext(false);
        setCurrentPage((prev) => (prev - 1 + 2) % 2);
    };

    return (
        <S.ResultContainer>
            <S.ResultHeader>
                <S.ResultTitle>결과 보기:</S.ResultTitle>
            </S.ResultHeader>
            <S.ResultInnerContainer>
                <S.CarouselContainer>
                    <S.CarouselContent currentPage={currentPage}>
                        <CarouselPage pageNumber={0} currentPage={currentPage} isNext={isNext}>
                            <ResultContent 
                                strategies={data} // 필터링된 데이터 사용
                                initialCapital={initialCapital}
                            />
                        </CarouselPage>
                        <CarouselPage pageNumber={1} currentPage={currentPage} isNext={isNext}>
                            <ResultTransactionHistory trades={data} initialCapital={initialCapital} />
                        </CarouselPage>
                    </S.CarouselContent>
                </S.CarouselContainer>
                <S.PrevButton onClick={handlePrevPage}>
                    <FaChevronLeft />
                </S.PrevButton>
                <S.NextButton onClick={handleNextPage}>
                    <FaChevronRight />
                </S.NextButton>
                <S.CarouselDots>
                    <S.CarouselDot active={currentPage === 0} onClick={() => setCurrentPage(0)} />
                    <S.CarouselDot active={currentPage === 1} onClick={() => setCurrentPage(1)} />
                </S.CarouselDots>
            </S.ResultInnerContainer>

            <S.ChartControls>
                <S.ChartSelect onChange={handleMetricChange} value={selectedMetric}>
                    <option value="profit">손익</option>
                    <option value="equity">자산</option>
                    <option value="drawdown">최대 손실</option>
                </S.ChartSelect>
            </S.ChartControls>

            <BackTestChart trades={data} selectedMetric={selectedMetric} />
        </S.ResultContainer>
    );
};

export default BacktestDisplayPage;