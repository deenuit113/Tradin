import { useEffect } from 'react';
import axios from 'axios';

interface CryptoWidgetProps {
    coinId: string;
    setPriceData: React.Dispatch<React.SetStateAction<{ price: number | null; prevPrice: number | null; timestamp: string | null }>>;
}

export default function CryptoWidget({ coinId, setPriceData }: CryptoWidgetProps) {
    useEffect(() => {
        const cachedData = localStorage.getItem(`crypto-${coinId}`);
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            setPriceData(parsedData);
        }

        const fetchCryptoPrice = async () => {
            try {
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=krw`
                );
                const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
                const newData = {
                    prevPrice: response.data[coinId].krw,
                    price: response.data[coinId].krw,
                    timestamp,
                };

                setPriceData(newData);
                localStorage.setItem(`crypto-${coinId}`, JSON.stringify(newData));
            } catch (error) {
                console.error('Error fetching crypto price:', error);
            }
        };

        fetchCryptoPrice();
        const intervalId = setInterval(fetchCryptoPrice, 30000);

        return () => clearInterval(intervalId);
    }, [coinId, setPriceData]);

    return null;
}