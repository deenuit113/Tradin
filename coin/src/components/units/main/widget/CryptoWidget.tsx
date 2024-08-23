import { useEffect } from 'react';
import axios from 'axios';

interface CryptoWidgetProps {
    coinId: string;
    setPriceData: React.Dispatch<React.SetStateAction<{ price: number | null; prevPrice: number | null; timestamp: string | null }>>;
}

export default function CryptoWidget({ coinId, setPriceData }: CryptoWidgetProps) {
    useEffect(() => {
        const cachedData = localStorage.getItem(`crypto-${coinId}`);
        let prevPrice: number | null = null;

        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            prevPrice = parsedData.price;
            setPriceData(parsedData);
        }

        const fetchCryptoPrice = async () => {
            try {
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=krw`
                );
                const newPrice = response.data[coinId].krw;
                const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

                const newData = {
                    prevPrice: prevPrice,
                    price: newPrice,
                    timestamp,
                };

                setPriceData(newData);
                localStorage.setItem(`crypto-${coinId}`, JSON.stringify(newData));

                // Update prevPrice for the next iteration
                prevPrice = newPrice;
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