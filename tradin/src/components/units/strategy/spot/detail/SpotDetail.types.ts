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

export interface SpotDetailUIProps {
    filters: { [key: string]: boolean };
    onClickStrategyOption: () => void;
    isMenuOpen: boolean;
    availableOptions: number[];
    selectedOption: number | null;
    handleCheckboxChange: (option: number) => void;
    handleFilterChange: (key: string) => void;
    currentStrategy: number;
    num: string | string[];
    coinData: CoinData[];
}