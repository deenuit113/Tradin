import { useState, useEffect } from "react";

interface LongShortRatioData {
    longShortRatio: string;
    longAccount: string;
    shortAccount: string;
    timestamp: string;
}

export const useBinanceLongShortRatio = (symbol: string, period = "5m") => {
    const [data, setData] = useState<LongShortRatioData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLongShortRatio = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://fapi.binance.com/futures/data/globalLongShortAccountRatio?symbol=${symbol}&period=${period}&limit=1`
                );
                const result = await response.json();
                const timestampKR = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
                if (result && result.length > 0) {
                    const ratioData = result[0];
                    setData({
                        longShortRatio: ratioData.longShortRatio,
                        longAccount: ratioData.longAccount,
                        shortAccount: ratioData.shortAccount,
                        timestamp: timestampKR,
                    });
                } else {
                    setError("No data received");
                }
            } catch (error) {
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchLongShortRatio();
    }, [symbol, period]);

    return { data, loading, error };
};