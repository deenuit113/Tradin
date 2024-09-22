import { Trade } from "../main/BackTest.types";

// BackTest main => result
export interface BackTestResultsProps {
    trades: { [key: string]: Trade[] };
    executedOptions: string | null;
}

// BackTest result => chart
export interface BackTestChartProps {
    trades: { [key: string]: Trade[] };
    selectedMetric: 'profit' | 'equity' | 'drawdown';
};