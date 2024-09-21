import { NextRequest, NextResponse } from 'next/server';
import { backtest } from 'grademark';
import { DataFrame } from 'data-forge';
import axios from 'axios';
import { strategies, StrategyKey } from '../../../src/components/units/backtest/mockdata/MockStrategy';

interface Trade {
    entryTime: string;
    exitTime: string;
    profit: number;
    strategy: string;
}

const API_KEY = process.env.NEXT_PUBLIC_CRYPTOCOMPARE_API_KEY;

export async function POST(req: NextRequest) {
    try {
        const { strategies: selectedStrategies, startDate, endDate, position } = await req.json();

        const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=2000&api_key=${API_KEY}`;
        const response = await axios.get(url);
        const historicalData = response.data.Data.Data.map((entry: any) => ({
            time: new Date(entry.time * 1000),
            open: entry.open,
            high: entry.high,
            low: entry.low,
            close: entry.close,
            volume: entry.volumefrom,
        }));

        const filteredData = historicalData.filter((entry: any) => {
            const entryDate = new Date(entry.time);
            return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
        });

        const inputSeries = new DataFrame(filteredData);

        const results: { [key: string]: Trade[] } = {};
        for (const strategyKey of selectedStrategies) {
            const strategy = strategies[strategyKey as StrategyKey];
            if (strategy) {
                const trades = backtest(strategy, inputSeries);
                results[strategyKey] = trades.map(trade => ({
                    entryTime: trade.entryTime.toISOString(),
                    exitTime: trade.exitTime ? trade.exitTime.toISOString() : trade.entryTime.toISOString(),
                    profit: trade.profit,
                    strategy: strategyKey
                }));
            }
        }

        return NextResponse.json(results);
    } catch (error) {
        console.error('Backtest error:', error);
        return NextResponse.json({ error: 'Failed to perform backtest' }, { status: 500 });
    }
}