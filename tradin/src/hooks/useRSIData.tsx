import { useState, useEffect } from "react";
import { RSI } from "technicalindicators";

interface RSIData {
    rsi: number;
    timestamp: string;
}

export const useRSIData = (symbol: string, period: number = 14) => {
    const [data, setData] = useState<RSIData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPrices = async () => {
            setLoading(true);
            try {
                // RSI 계산에 필요한 충분한 데이터를 가져옴
                const response = await fetch(
                    `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1d&limit=120`
                );
                const result = await response.json();
                const prices = result.map((entry: any) => parseFloat(entry[4])); // 종가를 가져옴

                // technicalindicators 라이브러리 사용하여 RSI 계산
                const rsiValues = RSI.calculate({ values: prices, period });

                // 최신 RSI 값 사용
                const rsi = rsiValues[rsiValues.length - 1];

                setData({
                    rsi,
                    timestamp: new Date().toLocaleString(),
                });
            } catch (error) {
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, [symbol, period]);

    return { data, loading, error };
};
