import { combineReducers } from '@reduxjs/toolkit';
import backtestReducer from './backtestResultSlice';

const rootReducer = combineReducers({
    backtest: backtestReducer,
});

export default rootReducer;