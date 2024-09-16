import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_CRYPTOCOMPARE_API_KEY;

export const useCryptoData = (symbol: string, comparisonSymbol: string, limit = 2000) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=${comparisonSymbol}&limit=${limit}&api_key=${API_KEY}`;
                const response = await axios.get(url);
                const historicalData = response.data.Data.Data.map((entry: any) => ({
                    time: new Date(entry.time * 1000),
                    open: entry.open,
                    high: entry.high,
                    low: entry.low,
                    close: entry.close,
                    volume: entry.volumefrom,
                }));
                setData(historicalData);
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [symbol, comparisonSymbol, limit]);

    return { data, loading, error };
};
