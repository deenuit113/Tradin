import { useRouter } from 'next/router';
import * as S from "../Item.styles";
import { useSidebar } from '../../../commons/sidebar/SidebarContext';
import SideBar from '../../../commons/sidebar/Sidebar';
import { useRecoilState } from "recoil";
import { darkMode } from '../../../commons/atoms';
import { useState, useEffect } from 'react';

export default function SpotDetail(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const [isDarkMode] = useRecoilState(darkMode);
    const router = useRouter();
    const { num } = router.query;

    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const transactions = [
        { id: 1, type: "매수", date: "2024-06-01", price: "1000 KRW", yield: "10.00%", cumYield: "50.00%" },
        { id: 1, type: "매도", date: "2024-06-02", price: "1050 KRW", yield: "", cumYield: "" },
        { id: 2, type: "매수", date: "2024-06-03", price: "2000 KRW", yield: "20.00%", cumYield: "70.00%" },
        { id: 2, type: "매도", date: "2024-06-04", price: "2100 KRW", yield: "", cumYield: "" },
        { id: 3, type: "매수", date: "2024-06-03", price: "2000 KRW", yield: "20.00%", cumYield: "70.00%" },
        { id: 3, type: "매도", date: "2024-06-04", price: "2100 KRW", yield: "", cumYield: "" },
        { id: 4, type: "매수", date: "2024-06-03", price: "2000 KRW", yield: "20.00%", cumYield: "70.00%" },
        { id: 4, type: "매도", date: "2024-06-04", price: "2100 KRW", yield: "", cumYield: "" },
        { id: 5, type: "매수", date: "2024-06-03", price: "2000 KRW", yield: "20.00%", cumYield: "70.00%" },
        { id: 5, type: "매도", date: "2024-06-04", price: "2100 KRW", yield: "", cumYield: "" },
        { id: 6, type: "매수", date: "2024-06-03", price: "2000 KRW", yield: "20.00%", cumYield: "70.00%" },
        { id: 6, type: "매도", date: "2024-06-04", price: "2100 KRW", yield: "", cumYield: "" },
        { id: 7, type: "매수", date: "2024-06-03", price: "2000 KRW", yield: "20.00%", cumYield: "70.00%" },
        { id: 7, type: "매도", date: "2024-06-04", price: "2100 KRW", yield: "", cumYield: "" },
        { id: 8, type: "매수", date: "2024-06-03", price: "2000 KRW", yield: "20.00%", cumYield: "70.00%" },
        { id: 8, type: "매도", date: "2024-06-04", price: "2100 KRW", yield: "", cumYield: "" },
        // Add more transactions as needed
    ];

    const handleCheckboxChange = (option: number) => {
        setSelectedOption(selectedOption === option ? null : option);
    };

    const availableOptions = [1, 2, 3, 4].filter(n => n !== Number(num));
    
    useEffect(() => {
        setSelectedOption(null); // Reset selected option when route changes
    }, [num]);

    return (
        <S.Container darkMode={isDarkMode}>
            <SideBar />
            <S.MainContent sidebarOpen={sidebarOpen} darkMode={isDarkMode}>
                <S.SpotHeader darkMode={isDarkMode}>
                    현물
                    <div>
                        {availableOptions.map(n => (
                            <label key={n}>
                                <input
                                    type="checkbox"
                                    checked={selectedOption === n}
                                    onChange={() => handleCheckboxChange(n)}
                                />
                                현물 {n}
                            </label>
                        ))}
                    </div>
                </S.SpotHeader>
                <S.WidgetContainer darkMode={isDarkMode}>
                    <S.WidgetHeader darkMode={isDarkMode}>현물 {num}</S.WidgetHeader>
                    <S.WidgetTable darkMode={isDarkMode}>
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
                    <S.TransactionHistory darkMode={isDarkMode}>
                        <thead>
                            <tr>
                                <S.StrategyInFoDetail className="title">ID</S.StrategyInFoDetail>
                                <S.StrategyInFoDetail className="title">매매타입</S.StrategyInFoDetail>
                                <S.StrategyInFoDetail className="title">날짜</S.StrategyInFoDetail>
                                <S.StrategyInFoDetail className="title">가격</S.StrategyInFoDetail>
                                <S.StrategyInFoDetail className="title">수익률</S.StrategyInFoDetail>
                                <S.StrategyInFoDetail className="title">누적수익률</S.StrategyInFoDetail>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, idx) => (
                                <tr key={idx}>
                                    {idx % 2 === 0 ? (
                                        <>
                                            <S.StrategyInFoDetail className="value bordered" rowSpan={2}>{transaction.id}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{transaction.type}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{transaction.date}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{transaction.price}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value bordered" rowSpan={2}>{transaction.yield}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value bordered" rowSpan={2}>{transaction.cumYield}</S.StrategyInFoDetail>
                                        </>
                                    ) : (
                                        <>
                                            <S.StrategyInFoDetail className="value">{transaction.type}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{transaction.date}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{transaction.price}</S.StrategyInFoDetail>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </S.TransactionHistory>
                </S.WidgetContainer>

                {selectedOption && (
                    <S.WidgetContainer darkMode={isDarkMode}>
                        <S.WidgetHeader darkMode={isDarkMode}>현물 {selectedOption}</S.WidgetHeader>
                        <S.WidgetTable darkMode={isDarkMode}>
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
                        <S.TransactionHistory darkMode={isDarkMode}>
                            <thead>
                                <tr>
                                    <S.StrategyInFoDetail className="title">ID</S.StrategyInFoDetail>
                                    <S.StrategyInFoDetail className="title">매매타입</S.StrategyInFoDetail>
                                    <S.StrategyInFoDetail className="title">날짜</S.StrategyInFoDetail>
                                    <S.StrategyInFoDetail className="title">가격</S.StrategyInFoDetail>
                                    <S.StrategyInFoDetail className="title">수익률</S.StrategyInFoDetail>
                                    <S.StrategyInFoDetail className="title">누적수익률</S.StrategyInFoDetail>
                                </tr>
                            </thead>
                            <tbody>
                            {transactions.map((transaction, idx) => (
                                <tr key={idx}>
                                    {idx % 2 === 0 ? (
                                        <>
                                            <S.StrategyInFoDetail className="value bordered" rowSpan={2}>{transaction.id}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{transaction.type}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{transaction.date}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{transaction.price}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value bordered" rowSpan={2}>{transaction.yield}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value bordered" rowSpan={2}>{transaction.cumYield}</S.StrategyInFoDetail>
                                        </>
                                    ) : (
                                        <>
                                            <S.StrategyInFoDetail className="value">{transaction.type}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{transaction.date}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{transaction.price}</S.StrategyInFoDetail>
                                        </>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </S.TransactionHistory>
                    </S.WidgetContainer>
                )}
            </S.MainContent>
        </S.Container>
    );
}