import { useRouter } from 'next/router';
import * as S from "../ItemDetail.styles";
import { useSidebar } from '../../../commons/sidebar/SidebarContext';
import SideBar from '../../../commons/sidebar/Sidebar';
import { useRecoilState } from "recoil";
import { darkMode } from '../../../commons/atoms';
import { useState, useEffect } from 'react';
import SpotDetailOption from './SpotDetailOpt';

export default function SpotDetail(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const [isDarkMode] = useRecoilState(darkMode);
    const router = useRouter();
    const { num } = router.query;
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const transactions = [
        { id: 1, type: "BUY", date: "2024-06-01", price: "1000", yield: "10.00%", cumYield: "50.00%" },
        { id: 1, type: "SELL", date: "2024-06-02", price: "1100", yield: "", cumYield: "" },
        { id: 2, type: "BUY", date: "2024-06-03", price: "2000", yield: "20.00%", cumYield: "70.00%" },
        { id: 2, type: "SELL", date: "2024-06-04", price: "2100", yield: "", cumYield: "" },
        { id: 3, type: "BUY", date: "2024-06-03", price: "2000", yield: "20.00%", cumYield: "70.00%" },
        { id: 3, type: "SELL", date: "2024-06-04", price: "2100", yield: "", cumYield: "" },
        { id: 4, type: "BUY", date: "2024-06-03", price: "2000", yield: "20.00%", cumYield: "70.00%" },
        { id: 4, type: "SELL", date: "2024-06-04", price: "2100", yield: "", cumYield: "" },
        { id: 5, type: "BUY", date: "2024-06-03", price: "2000", yield: "20.00%", cumYield: "70.00%" },
        { id: 5, type: "SELL", date: "2024-06-04", price: "2100", yield: "", cumYield: "" },
        { id: 6, type: "BUY", date: "2024-06-03", price: "2000", yield: "20.00%", cumYield: "70.00%" },
        { id: 6, type: "SELL", date: "2024-06-04", price: "2100", yield: "", cumYield: "" },
        { id: 7, type: "BUY", date: "2024-06-03", price: "2000", yield: "20.00%", cumYield: "70.00%" },
        { id: 7, type: "SELL", date: "2024-06-04", price: "2100", yield: "", cumYield: "" },
        { id: 8, type: "BUY", date: "2024-06-03", price: "2000", yield: "20.00%", cumYield: "70.00%" },
        { id: 8, type: "SELL", date: "2024-06-04", price: "2100", yield: "", cumYield: "" },
        // Add more transactions as needed
    ];

    const handleCheckboxChange = (option: number) => {
        setSelectedOption(selectedOption === option ? null : option);
    };

    const availableOptions = [1, 2, 3, 4].filter(n => n !== Number(num));
    
    useEffect(() => {
        setSelectedOption(null); // Reset selected option when route changes
    }, [num]);

    const onClickStrategyOption = () => {
        setMenuOpen(prev=> !prev);
    }

    return (
        <S.Container darkMode={isDarkMode}>
            <SideBar />
            <S.SpotHeader sidebarOpen={sidebarOpen} darkMode={isDarkMode}>
                    현물
                    <S.StrategyOption onClick={onClickStrategyOption}>옵션</S.StrategyOption>
                    <SpotDetailOption
                        isMenuOpen={isMenuOpen}
                        availableOptions={availableOptions}
                        selectedOption={selectedOption}
                        handleCheckboxChange={handleCheckboxChange}
                    />    
                </S.SpotHeader>
            <S.MainContent sidebarOpen={sidebarOpen} darkMode={isDarkMode}>
                <S.WidgetDetailContainer darkMode={isDarkMode} selectedOption={selectedOption}>
                    <S.WidgetHeader darkMode={isDarkMode}>현물 {num}</S.WidgetHeader>
                    <S.WidgetTable darkMode={isDarkMode} selectedOption={selectedOption}>
                        <thead>
                            <tr>
                                <S.StrategyInfo className="title" darkMode={isDarkMode}>코인</S.StrategyInfo>
                                <S.StrategyInfo className="title" darkMode={isDarkMode}>현재 포지션</S.StrategyInfo>
                                <S.StrategyInfo className="title" darkMode={isDarkMode}>진입가격</S.StrategyInfo>
                                <S.StrategyInfo className="title" darkMode={isDarkMode}>누적손익</S.StrategyInfo>
                                <S.StrategyInfo className="title" darkMode={isDarkMode}>승률</S.StrategyInfo>
                                <S.StrategyInfo className="title" darkMode={isDarkMode}>수익 팩터</S.StrategyInfo>
                                <S.StrategyInfo className="title" darkMode={isDarkMode}>횟수</S.StrategyInfo>
                                <S.StrategyInfo className="title" darkMode={isDarkMode}>평균봉수</S.StrategyInfo>
                                <S.StrategyInfo className="title" darkMode={isDarkMode}>평균수익</S.StrategyInfo>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <S.StrategyInfo className="value" darkMode={isDarkMode}>코인아이콘</S.StrategyInfo>
                                <S.StrategyInfo className="value" darkMode={isDarkMode}>상승</S.StrategyInfo>
                                <S.StrategyInfo className="value" darkMode={isDarkMode}>1000 KRW</S.StrategyInfo>
                                <S.StrategyInfo className="value" darkMode={isDarkMode}>10.00%</S.StrategyInfo>
                                <S.StrategyInfo className="value" darkMode={isDarkMode}>50.00%</S.StrategyInfo>
                                <S.StrategyInfo className="value" darkMode={isDarkMode}>1.234</S.StrategyInfo>
                                <S.StrategyInfo className="value" darkMode={isDarkMode}>5</S.StrategyInfo>
                                <S.StrategyInfo className="value" darkMode={isDarkMode}>10</S.StrategyInfo>
                                <S.StrategyInfo className="value" darkMode={isDarkMode}>5.00%</S.StrategyInfo>
                            </tr>
                        </tbody>
                    </S.WidgetTable>
                    <S.HorizontalDivider />
                    <S.TransactionHistory darkMode={isDarkMode} selectedOption={selectedOption}>
                        <thead>
                            <tr>
                                <S.StrategyInFoDetail className="title">ID</S.StrategyInFoDetail>
                                <S.StrategyInFoDetail className="title">타입</S.StrategyInFoDetail>
                                <S.StrategyInFoDetail className="title">날짜<small><sub>{selectedOption ? 'MM-DD' : 'YY-MM-DD'}</sub></small></S.StrategyInFoDetail>
                                <S.StrategyInFoDetail className="title">가격<small><sub>KRW</sub></small></S.StrategyInFoDetail>
                                <S.StrategyInFoDetail className="title">수익</S.StrategyInFoDetail>
                                <S.StrategyInFoDetail className="title">누적</S.StrategyInFoDetail>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, idx) => (
                                <tr key={idx}>
                                    {idx % 2 === 0 ? (
                                        <>
                                            <S.StrategyInFoDetail className="value bordered" rowSpan={2}>{transaction.id}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value buy">{transaction.type}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{selectedOption ? transaction.date.slice(5) : transaction.date}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{transaction.price}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value bordered" rowSpan={2}>{transaction.yield}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value bordered" rowSpan={2}>{transaction.cumYield}</S.StrategyInFoDetail>
                                        </>
                                    ) : (
                                        <>
                                            <S.StrategyInFoDetail className="value sell">{transaction.type}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{selectedOption ? transaction.date.slice(5) : transaction.date}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{transaction.price}</S.StrategyInFoDetail>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </S.TransactionHistory>
                </S.WidgetDetailContainer>

                {selectedOption && (
                    <S.WidgetDetailContainer darkMode={isDarkMode} selectedOption={selectedOption}>
                        <S.WidgetHeader darkMode={isDarkMode}>현물 {selectedOption}</S.WidgetHeader>
                        <S.WidgetTable darkMode={isDarkMode} selectedOption={selectedOption}>
                            <thead>
                                <tr>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>코인</S.StrategyInfo>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>현재 포지션</S.StrategyInfo>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>진입가격</S.StrategyInfo>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>누적손익</S.StrategyInfo>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>승률</S.StrategyInfo>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>수익 팩터</S.StrategyInfo>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>횟수</S.StrategyInfo>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>평균봉수</S.StrategyInfo>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>평균수익</S.StrategyInfo>
                                 </tr>
                            </thead>
                            <tbody>
                                {/* Example static data or fetch similar data for the selected option */}
                                <tr>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>코인아이콘</S.StrategyInfo>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>상승</S.StrategyInfo>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>1000 KRW</S.StrategyInfo>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>10.00%</S.StrategyInfo>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>50.00%</S.StrategyInfo>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>1.234</S.StrategyInfo>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>5</S.StrategyInfo>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>10</S.StrategyInfo>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>5.00%</S.StrategyInfo>
                                </tr>
                            </tbody>
                        </S.WidgetTable>
                        <S.HorizontalDivider />
                        <S.TransactionHistory darkMode={isDarkMode} selectedOption={selectedOption}>
                            <thead>
                                <tr>
                                    <S.StrategyInFoDetail className="title">ID</S.StrategyInFoDetail>
                                    <S.StrategyInFoDetail className="title">타입</S.StrategyInFoDetail>
                                    <S.StrategyInFoDetail className="title">날짜<small><sub>{selectedOption ? 'MM-DD' : 'YY-MM-DD'}</sub></small></S.StrategyInFoDetail>
                                    <S.StrategyInFoDetail className="title">가격<small><sub>KRW</sub></small></S.StrategyInFoDetail>
                                    <S.StrategyInFoDetail className="title">수익</S.StrategyInFoDetail>
                                    <S.StrategyInFoDetail className="title">누적</S.StrategyInFoDetail>
                                </tr>
                            </thead>
                            <tbody>
                            {transactions.map((transaction, idx) => (
                                <tr key={idx}>
                                    {idx % 2 === 0 ? (
                                        <>
                                            <S.StrategyInFoDetail className="value bordered" rowSpan={2}>{transaction.id}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value buy">{transaction.type}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{selectedOption ? transaction.date.slice(5) : transaction.date}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{transaction.price}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value bordered" rowSpan={2}>{transaction.yield}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value bordered" rowSpan={2}>{transaction.cumYield}</S.StrategyInFoDetail>
                                        </>
                                    ) : (
                                        <>
                                            <S.StrategyInFoDetail className="value sell">{transaction.type}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{selectedOption ? transaction.date.slice(5) : transaction.date}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{transaction.price}</S.StrategyInFoDetail>
                                        </>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </S.TransactionHistory>
                    </S.WidgetDetailContainer>
                )}
            </S.MainContent>
        </S.Container>
    );
}