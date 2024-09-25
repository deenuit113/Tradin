import React from 'react';
import * as S from "./BackTestResult.styles";
import { Trade } from '../main/BackTest.types';

interface ResultTransactionHistoryProps {
    trades: { [key: string]: Trade[] };
    initialCapital: number;
}

const ResultTransactionHistory: React.FC<ResultTransactionHistoryProps> = ({ trades, initialCapital }) => {
    const strategyCount = Object.keys(trades).length;

    return (
        <S.TransactionHistoryContainer>
            <S.TransactionHistoryScroll strategyCount={strategyCount}>
                {Object.entries(trades).map(([strategy, strategyTrades]) => {
                    let cumulativeProfit = 0;
                    return (
                        <S.StrategyTransactions key={strategy} strategyCount={strategyCount}>
                            <S.StrategyTitle>{strategy}</S.StrategyTitle>
                            <S.TransactionList isSkeleton={false}>
                                {strategyTrades.map((trade: Trade, index: number) => {
                                    cumulativeProfit += trade.profit;
                                    const profitPercentage = (trade.profit / initialCapital) * 100;
                                    const cumulativeProfitPercentage = (cumulativeProfit / initialCapital) * 100;
                                    
                                    return (
                                        <S.TransactionItem key={index} strategyCount={strategyCount}>
                                            <S.TransactionDetail strategyCount={strategyCount}>진입: {new Date(trade.entryTime).toLocaleString()}</S.TransactionDetail>
                                            <S.TransactionDetail strategyCount={strategyCount}>청산: {new Date(trade.exitTime).toLocaleString()}</S.TransactionDetail>
                                            <S.TransactionDetail strategyCount={strategyCount}>
                                                수익: <S.ProfitAmount isPositive={trade.profit > 0}>${trade.profit.toFixed(2)}</S.ProfitAmount>
                                            </S.TransactionDetail>
                                            <S.TransactionDetail strategyCount={strategyCount}>
                                                수익률: <S.ProfitAmount isPositive={profitPercentage > 0}>{profitPercentage.toFixed(2)}%</S.ProfitAmount>
                                            </S.TransactionDetail>
                                            <S.TransactionDetail strategyCount={strategyCount}>
                                                누적 수익률: <S.ProfitAmount isPositive={cumulativeProfitPercentage > 0}>{cumulativeProfitPercentage.toFixed(2)}%</S.ProfitAmount>
                                            </S.TransactionDetail>
                                        </S.TransactionItem>
                                    );
                                })}
                            </S.TransactionList>
                        </S.StrategyTransactions>
                    );
                })}
            </S.TransactionHistoryScroll>
        </S.TransactionHistoryContainer>
    );
};

export default ResultTransactionHistory;