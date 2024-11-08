import * as S from "../../ItemDetail.styles";
import { useSidebar } from '../../../../../contexts/SidebarContext';
import FutureDetailOption from './option/FutureDetailOption.container';
import { FaCaretUp, FaCaretDown, FaAngleRight, FaCog } from 'react-icons/fa';
import Breadcrumb from '../../../../commons/breadcrumb/BreadCrumb.container';
import { transactions } from './MockTransaction';
import { FutureDetailUIProps } from "./FutureDetail.types";

export default function FutureDetailUI(props: FutureDetailUIProps): JSX.Element {
    const { sidebarOpen } = useSidebar();

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
    ].filter(header => props.filters[header.key]);

    const position = "하강";

    return (
        <S.Container>
            <S.SpotHeader sidebarOpen={sidebarOpen} >
                    <div>
                        <Breadcrumb/>
                    </div>
                    <S.StrategyOption onClick={props.onClickStrategyOption}><FaCog className="OptionIcon"/>옵션</S.StrategyOption>
                    <FutureDetailOption
                        isMenuOpen={props.isMenuOpen}
                        availableOptions={props.availableOptions}
                        selectedOption={props.selectedOption}
                        handleCheckboxChange={props.handleCheckboxChange}
                        filters={props.filters}
                        handleFilterChange={props.handleFilterChange}
                        currentStrategy={props.currentStrategy}
                    />    
                </S.SpotHeader>
            <S.MainContent sidebarOpen={sidebarOpen} selectedOption={props.selectedOption}>
                <S.WidgetDetailContainer>
                    <S.WidgetHeader>선물 {props.num}</S.WidgetHeader>
                    <S.WidgetTable selectedOption={props.selectedOption}>
                        <thead>
                            <tr>
                                {filteredHeaders.map(header => (
                                    <S.StrategyInfo key={header.key} className="title">{header.label}</S.StrategyInfo>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {props.coinData.map((data, index) => (
                                <tr key={index}>
                                    {props.filters.coin && <S.StrategyInfo className="value">코인아이콘</S.StrategyInfo>}
                                    {props.filters.position && (
                                        <S.StrategyInfo className="value">
                                            {data.position === '상승' ? <FaCaretUp className="position-icon" color="red" /> : <FaCaretDown className="position-icon" color="blue" />}
                                        </S.StrategyInfo>
                                    )}
                                    {props.filters.entryPrice && <S.StrategyInfo className="value">{data.entryPrice}</S.StrategyInfo>}
                                    {props.filters.profitLoss && <S.StrategyInfo className="value">{data.profitLoss}</S.StrategyInfo>}
                                    {props.filters.winRate && <S.StrategyInfo className="value">{data.winRate}</S.StrategyInfo>}
                                    {props.filters.profitFactor && <S.StrategyInfo className="value">{data.profitFactor}</S.StrategyInfo>}
                                    {props.filters.trades && <S.StrategyInfo className="value">{data.trades}</S.StrategyInfo>}
                                    {props.filters.averageBars && <S.StrategyInfo className="value">{data.averageBars}</S.StrategyInfo>}
                                    {props.filters.averageProfit && <S.StrategyInfo className="value">{data.averageProfit}</S.StrategyInfo>}
                                </tr>
                            ))}
                        </tbody>
                    </S.WidgetTable>
                    <S.TransactionHistory selectedOption={props.selectedOption}>
                        <thead>
                            <tr>
                                <S.StrategyInFoDetail className="title">ID</S.StrategyInFoDetail>
                                <S.StrategyInFoDetail className="title">타입</S.StrategyInFoDetail>
                                <S.StrategyInFoDetail className="title">날짜<small><sub>{props.selectedOption ? 'MM-DD' : 'YY-MM-DD'}</sub></small></S.StrategyInFoDetail>
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
                                            <S.StrategyInFoDetail className="value">{props.selectedOption ? transaction.date.slice(5) : transaction.date}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{transaction.price}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value bordered" rowSpan={2}>{transaction.yield}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value bordered" rowSpan={2}>{transaction.cumYield}</S.StrategyInFoDetail>
                                        </>
                                    ) : (
                                        <>
                                            <S.StrategyInFoDetail className="value sell">{transaction.type}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{props.selectedOption ? transaction.date.slice(5) : transaction.date}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{transaction.price}</S.StrategyInFoDetail>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </S.TransactionHistory>
                </S.WidgetDetailContainer>

                {props.selectedOption && (
                    <S.WidgetDetailContainer>
                        <S.WidgetHeader>선물 {props.selectedOption}</S.WidgetHeader>
                        <S.WidgetTable  selectedOption={props.selectedOption}>
                            <thead>
                                <tr>
                                    {filteredHeaders.map(header => (
                                        <S.StrategyInfo key={header.key} className="title">{header.label}</S.StrategyInfo>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {props.coinData.map((data, index) => (
                                    <tr key={index}>
                                        {props.filters.coin && <S.StrategyInfo className="value">코인아이콘</S.StrategyInfo>}
                                        {props.filters.position && (
                                            <S.StrategyInfo className="value">
                                                {data.position === '상승' ? <FaCaretUp className="position-icon" color="red" /> : <FaCaretDown className="position-icon" color="blue" />}
                                            </S.StrategyInfo>
                                        )}
                                        {props.filters.entryPrice && <S.StrategyInfo className="value">{data.entryPrice}</S.StrategyInfo>}
                                        {props.filters.profitLoss && <S.StrategyInfo className="value">{data.profitLoss}</S.StrategyInfo>}
                                        {props.filters.winRate && <S.StrategyInfo className="value">{data.winRate}</S.StrategyInfo>}
                                        {props.filters.profitFactor && <S.StrategyInfo className="value">{data.profitFactor}</S.StrategyInfo>}
                                        {props.filters.trades && <S.StrategyInfo className="value">{data.trades}</S.StrategyInfo>}
                                        {props.filters.averageBars && <S.StrategyInfo className="value">{data.averageBars}</S.StrategyInfo>}
                                        {props.filters.averageProfit && <S.StrategyInfo className="value">{data.averageProfit}</S.StrategyInfo>}
                                    </tr>
                                ))}
                            </tbody>
                        </S.WidgetTable>
                        <S.TransactionHistory selectedOption={props.selectedOption}>
                            <thead>
                                <tr>
                                    <S.StrategyInFoDetail className="title">ID</S.StrategyInFoDetail>
                                    <S.StrategyInFoDetail className="title">타입</S.StrategyInFoDetail>
                                    <S.StrategyInFoDetail className="title">날짜<small><sub>{props.selectedOption ? 'MM-DD' : 'YY-MM-DD'}</sub></small></S.StrategyInFoDetail>
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
                                            <S.StrategyInFoDetail className="value">{props.selectedOption ? transaction.date.slice(5) : transaction.date}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{transaction.price}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value bordered" rowSpan={2}>{transaction.yield}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value bordered" rowSpan={2}>{transaction.cumYield}</S.StrategyInFoDetail>
                                        </>
                                    ) : (
                                        <>
                                            <S.StrategyInFoDetail className="value sell">{transaction.type}</S.StrategyInFoDetail>
                                            <S.StrategyInFoDetail className="value">{props.selectedOption ? transaction.date.slice(5) : transaction.date}</S.StrategyInFoDetail>
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