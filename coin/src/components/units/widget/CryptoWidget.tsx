import { useEffect } from 'react';
import axios from 'axios';

interface CryptoWidgetProps {
    coinId: string;
    setPriceData: React.Dispatch<React.SetStateAction<{ price: number | null; prevPrice: number | null; }>>;
}

export default function CryptoWidget({ coinId, setPriceData }: CryptoWidgetProps) {
    useEffect(() => {
        const fetchCryptoPrice = async () => {
            try {
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=krw`
                );
                setPriceData(prevData => ({
                    prevPrice: prevData.price,
                    price: response.data[coinId].krw,
                }));
            } catch (error) {
                console.error('Error fetching crypto price:', error);
            }
        };

        fetchCryptoPrice();
        const intervalId = setInterval(fetchCryptoPrice, 60000); // 1분마다 가격 업데이트

        return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 제거
    }, [coinId, setPriceData]);

    return null; // 이 컴포넌트는 데이터를 가져오기만 하고 UI는 반환하지 않음
}