import { useState, useEffect } from "react";
import { Stochastic } from "technicalindicators";

interface StochasticData {
    k: number;
    d: number;
    timestamp: string;
}

export const useStochasticData = (
    symbol: string,
    period: number = 14,
    signalPeriod: number = 3
) => {
    const [data, setData] = useState<StochasticData[]>([]); // 배열로 수정
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPrices = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1d&limit=120`
                );
                const result = await response.json();
                const high = result.map((entry: any) => parseFloat(entry[2]));
                const low = result.map((entry: any) => parseFloat(entry[3]));
                const close = result.map((entry: any) => parseFloat(entry[4]));

                const stochasticValues = Stochastic.calculate({
                    high,
                    low,
                    close,
                    period,
                    signalPeriod,
                });

                // 데이터 배열로 반환
                const formattedData = stochasticValues.map((value) => ({
                    k: value.k,
                    d: value.d,
                    timestamp: new Date().toLocaleString(),
                }));

                setData(formattedData);
            } catch (error) {
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, [symbol, period, signalPeriod]);

    return { data, loading, error };
};
