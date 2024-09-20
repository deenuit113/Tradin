import { useState, useEffect } from "react";

interface FearGreedIndexData {
    fearGreedIndex: number;
    timestamp: string;
}

export const useFearGreedIndex = () => {
    const [data, setData] = useState<FearGreedIndexData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFearGreedIndex = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.alternative.me/fng/?format=json`);
                const result = await response.json();
                if (result && result.data && result.data.length > 0) {
                    const latestData = result.data[0];
                    const timestampKR = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
                    setData({
                        fearGreedIndex: parseInt(latestData.value, 10),
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

        fetchFearGreedIndex();
    }, []);

    return { data, loading, error };
};