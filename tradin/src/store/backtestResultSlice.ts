import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BacktestState {
    results: any;
    executedOptions: string | null;
}

const initialState: BacktestState = {
    results: null,
    executedOptions: null,
};

const backtestSlice = createSlice({
    name: 'backtest',
    initialState,
    reducers: {
        setBacktestResults: (state, action: PayloadAction<any>) => {
            state.results = action.payload;
        },
        setExecutedOptions: (state, action: PayloadAction<string>) => {
            state.executedOptions = action.payload;
        },
        clearBacktestResults: (state) => {
            state.results = null;
            state.executedOptions = null;
        },
    },
});

export const { setBacktestResults, setExecutedOptions, clearBacktestResults } = backtestSlice.actions;
export default backtestSlice.reducer;