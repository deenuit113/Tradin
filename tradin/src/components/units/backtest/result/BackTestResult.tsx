import React, { useState } from 'react';
import Modal from 'react-modal';
import * as S from "./BackTestResult.styles";
import BackTestChart from './BackTestChart';
import { FaGlobe, FaChartBar, FaLongArrowAltUp, FaLongArrowAltDown, FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BackTestResultsProps } from './BackTestResult.types';
import ResultTransactionHistory from './ResultTransactionHistory';
import ResultContent from './ResultContent';
import { useBackTestContext } from '../../../../contexts/BackTestContext';
import { saveOptionModalStyle } from './BackTestResult.styles';
import pako from 'pako';

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

const BackTestResults: React.FC<BackTestResultsProps> = ({ trades, executedOptions }) => {
    const [selectedMetric, setSelectedMetric] = useState<'profit' | 'equity' | 'drawdown'>('profit');
    const [currentPage, setCurrentPage] = useState(0);
    const [isNext, setIsNext] = useState(true);
    const { saveOption } = useBackTestContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [optionName, setOptionName] = useState('');
    
    const initialCapital = 10000;

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

    const handleSave = () => {
        setIsModalOpen(true);
    };

    const handleConfirmSave = () => {
        if (optionName && executedOptions) {
            saveOption(optionName, executedOptions, executedOptions);
            setIsModalOpen(false);
            setOptionName('');
        }
    };

    const renderExecutedOptions = () => {
        if (!executedOptions) return null;

        const [marketType, strategies, position, dateRange] = executedOptions.split(' / ');

        return (
            <S.ExecutedOptionsContainer>
                <S.ExecutedOptionItem>
                    <FaGlobe className="OptionIcon" />
                    {marketType}
                </S.ExecutedOptionItem>
                <S.ExecutedOptionItem>
                    <FaChartBar className="OptionIcon" />
                    {strategies}
                </S.ExecutedOptionItem>
                <S.ExecutedOptionItem>
                    {position === 'long' ? <FaLongArrowAltUp className="OptionIcon" /> : <FaLongArrowAltDown className="OptionIcon" />}
                    {position}
                </S.ExecutedOptionItem>
                <S.ExecutedOptionItem>
                    <FaCalendarAlt className="OptionIcon" />
                    {dateRange.replace('기간 ', '')}
                </S.ExecutedOptionItem>
                
            </S.ExecutedOptionsContainer>
        );
    };

    const generateShareableURL = () => {
        // JSON으로 변환 후 압축
        const jsonData = JSON.stringify(trades);
        const compressedData = pako.deflate(jsonData);
    
        // Base64 인코딩
        const base64CompressedData = btoa(String.fromCharCode.apply(null, Array.from(compressedData)));
        
        const baseUrl = `${window.location.protocol}//${window.location.host}/backtestdisplay`;
        return `${baseUrl}?data=${encodeURIComponent(base64CompressedData)}`;
    };
    
    // URL 복사 함수
    const handleShare = () => {
        const shareableURL = generateShareableURL();
        navigator.clipboard.writeText(shareableURL).then(() => {
            alert('URL이 클립보드에 복사되었습니다.');
        }).catch(err => {
            console.error('Failed to copy!', err);
        });
    };

    return (
        <S.ResultContainer>
            <S.ResultHeader>
                <S.ResultTitle>실행 결과:</S.ResultTitle>
                {renderExecutedOptions()}
                <S.SaveButton onClick={handleSave}>저장</S.SaveButton>
                <button onClick={handleShare}>공유</button>

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    style={saveOptionModalStyle}
                    contentLabel="옵션 저장"
                >
                    <S.ModalContent>
                        <S.ModalInput
                            type="text"
                            value={optionName}
                            onChange={(e) => setOptionName(e.target.value)}
                            placeholder="옵션 이름 입력"
                        />
                        <S.ModalButtonWrapper>
                            <S.ModalButton onClick={handleConfirmSave}>확인</S.ModalButton>
                            <S.ModalButton onClick={() => setIsModalOpen(false)}>취소</S.ModalButton>
                        </S.ModalButtonWrapper>
                    </S.ModalContent>
                </Modal>
            </S.ResultHeader>
            <S.ResultInnerContainer>
                <S.CarouselContainer>
                    <S.CarouselContent currentPage={currentPage}>
                        <CarouselPage pageNumber={0} currentPage={currentPage} isNext={isNext}>
                            <ResultContent 
                                    strategies={trades}
                                    initialCapital={initialCapital}
                            />
                        </CarouselPage>
                        <CarouselPage pageNumber={1} currentPage={currentPage} isNext={isNext}>
                            <ResultTransactionHistory trades={trades} initialCapital={initialCapital} />
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
            <BackTestChart trades={trades} selectedMetric={selectedMetric} />
        </S.ResultContainer>
    );
};

export default BackTestResults;