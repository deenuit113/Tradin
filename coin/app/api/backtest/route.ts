// app/api/backtest/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { backtest } from 'grademark';
import { DataFrame } from 'data-forge';
import axios from 'axios';
import { strategies, StrategyKey } from '../../../src/components/units/backtest/MockStrategy';

const API_KEY = process.env.NEXT_PUBLIC_CRYPTOCOMPARE_API_KEY;

export async function POST(req: NextRequest) {
    try {
        const { strategyKey, startDate, endDate, position } = await req.json();
        const strategy = strategies[strategyKey as StrategyKey];

        if (!strategy) {
            return NextResponse.json({ error: 'Invalid strategy key' }, { status: 400 });
        }

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

        const inputSeries = new DataFrame(historicalData);

        const trades = backtest(strategy, inputSeries);
        return NextResponse.json(trades);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to perform backtest' }, { status: 500 });
    }
}
