import { combineReducers, Reducer } from '@reduxjs/toolkit';
import backtestReducer, { BacktestState } from './backtestResultSlice';

const rootReducer: Reducer<{ backtest: BacktestState }> = combineReducers({
    backtest: backtestReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;