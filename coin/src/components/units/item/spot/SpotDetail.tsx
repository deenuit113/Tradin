import { useSearchParams, useParams } from 'next/navigation';
import * as S from "../ItemDetail.styles";
import { useSidebar } from '../../../commons/sidebar/SidebarContext';
import { useState, useEffect } from 'react';
import SpotDetailOption from './SpotDetailOpt';
import { FaCaretUp, FaCaretDown, FaAngleRight, FaCog, FaExchangeAlt } from 'react-icons/fa';
import Breadcrumb from '../../../commons/breadcrumb/BreadCrumb';

type Position = '상승' | '하강';

interface CoinData {
    position: Position;
    entryPrice: string;
    profitLoss: string;
    winRate: string;
    profitFactor: string;
    trades: number;
    averageBars: number;
    averageProfit: string;
}

const initialFilters = {
    coin: true,
    position: true,
    entryPrice: true,
    profitLoss: false,
    winRate: false,
    profitFactor: false,
    trades: false,
    averageBars: false,
    averageProfit: false
};

const coinData: CoinData[] = [
    { position: '하강', entryPrice: '1000 KRW', profitLoss: '10.00%', winRate: '50.00%', profitFactor: '1.234', trades: 5, averageBars: 10, averageProfit: '5.00%' },
];

export default function SpotDetail(): JSX.Element {
    const { num } = useParams();
    const { sidebarOpen } = useSidebar();
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const [filters, setFilters] = useState<{ [key: string]: boolean }>(initialFilters);

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

    const handleFilterChange = (key: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: !prevFilters[key]
        }));
    };


    const availableOptions = [1, 2, 3, 4].filter(n => n !== Number(num));
    
    useEffect(() => {
        setSelectedOption(null);
    }, [num]);

    const onClickStrategyOption = () => {
        setMenuOpen(prev=> !prev);
    }

    const filteredHeaders = [
        { key: "coin", label: "코인" },
        { key: "position", label: "현재 포지션" },
        { key: "entryPrice", label: "진입가격" },
        { key: "profitLoss", label: "누적손익" },
        { key: "winRate", label: "승률" },
        { key: "profitFactor", label: "수익 팩터" },
        { key: "trades", label: "횟수" },
        { key: "averageBars", label: "평균봉수" },
        { key: "averageProfit", label: "평균수익" }
    ].filter(header => filters[header.key]);

    const position = "하강";

    return (
        <S.Container>
            <S.SpotHeader sidebarOpen={sidebarOpen} >
                    <div><Breadcrumb/></div>
                    <S.StrategyOption onClick={onClickStrategyOption}><FaCog className="OptionIcon"/>옵션</S.StrategyOption>
                    <SpotDetailOption
                        isMenuOpen={isMenuOpen}
                        availableOptions={availableOptions}
                        selectedOption={selectedOption}
                        handleCheckboxChange={handleCheckboxChange}
                        filters={filters}
                        handleFilterChange={handleFilterChange}
                    />    
                </S.SpotHeader>
            <S.MainContent sidebarOpen={sidebarOpen} selectedOption={selectedOption}>
                <S.WidgetDetailContainer>
                    <S.WidgetHeader>현물 {num}</S.WidgetHeader>
                    <S.WidgetTable selectedOption={selectedOption}>
                        <thead>
                            <tr>
                                {filteredHeaders.map(header => (
                                    <S.StrategyInfo key={header.key} className="title">{header.label}</S.StrategyInfo>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {coinData.map((data, index) => (
                                <tr key={index}>
                                    {filters.coin && <S.StrategyInfo className="value">코인아이콘</S.StrategyInfo>}
                                    {filters.position && (
                                        <S.StrategyInfo className="value">
                                            {data.position === '상승' ? <FaCaretUp className="position-icon" color="red" /> : <FaCaretDown className="position-icon" color="blue" />}
                                        </S.StrategyInfo>
                                    )}
                                    {filters.entryPrice && <S.StrategyInfo className="value">{data.entryPrice}</S.StrategyInfo>}
                                    {filters.profitLoss && <S.StrategyInfo className="value">{data.profitLoss}</S.StrategyInfo>}
                                    {filters.winRate && <S.StrategyInfo className="value">{data.winRate}</S.StrategyInfo>}
                                    {filters.profitFactor && <S.StrategyInfo className="value">{data.profitFactor}</S.StrategyInfo>}
                                    {filters.trades && <S.StrategyInfo className="value">{data.trades}</S.StrategyInfo>}
                                    {filters.averageBars && <S.StrategyInfo className="value">{data.averageBars}</S.StrategyInfo>}
                                    {filters.averageProfit && <S.StrategyInfo className="value">{data.averageProfit}</S.StrategyInfo>}
                                </tr>
                            ))}
                        </tbody>
                    </S.WidgetTable>
                    <S.TransactionHistory selectedOption={selectedOption}>
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
                    <S.WidgetDetailContainer>
                        <S.WidgetHeader>현물 {selectedOption}</S.WidgetHeader>
                        <S.WidgetTable  selectedOption={selectedOption}>
                            <thead>
                                <tr>
                                    {filteredHeaders.map(header => (
                                        <S.StrategyInfo key={header.key} className="title">{header.label}</S.StrategyInfo>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {coinData.map((data, index) => (
                                    <tr key={index}>
                                        {filters.coin && <S.StrategyInfo className="value">코인아이콘</S.StrategyInfo>}
                                        {filters.position && (
                                            <S.StrategyInfo className="value">
                                                {data.position === '상승' ? <FaCaretUp className="position-icon" color="red" /> : <FaCaretDown className="position-icon" color="blue" />}
                                            </S.StrategyInfo>
                                        )}
                                        {filters.entryPrice && <S.StrategyInfo className="value">{data.entryPrice}</S.StrategyInfo>}
                                        {filters.profitLoss && <S.StrategyInfo className="value">{data.profitLoss}</S.StrategyInfo>}
                                        {filters.winRate && <S.StrategyInfo className="value">{data.winRate}</S.StrategyInfo>}
                                        {filters.profitFactor && <S.StrategyInfo className="value">{data.profitFactor}</S.StrategyInfo>}
                                        {filters.trades && <S.StrategyInfo className="value">{data.trades}</S.StrategyInfo>}
                                        {filters.averageBars && <S.StrategyInfo className="value">{data.averageBars}</S.StrategyInfo>}
                                        {filters.averageProfit && <S.StrategyInfo className="value">{data.averageProfit}</S.StrategyInfo>}
                                    </tr>
                                ))}
                            </tbody>
                        </S.WidgetTable>
                        <S.TransactionHistory selectedOption={selectedOption}>
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