type Position = '상승' | '하강';

export interface CoinData {
    position: Position;
    entryPrice: string;
    profitLoss: string;
    winRate: string;
    profitFactor: string;
    trades: number;
    averageBars: number;
    averageProfit: string;
}

export interface FuturePageUIProps {
    onClickMoveToFutureStrategy: (num: number) => void;
}