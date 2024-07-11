import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BitcoinWidget({ setPriceData }) {
    useEffect(() => {
        const fetchBitcoinPrice = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=krw'
                );
                setPriceData((prevData) => ({
                    prevPrice: prevData.price,
                    price: response.data.bitcoin.krw,
                }));
            } catch (error) {
                console.error('Error fetching Bitcoin price:', error);
            }
        };

        fetchBitcoinPrice();
        const intervalId = setInterval(fetchBitcoinPrice, 60000); // 1분마다 가격 업데이트

        return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 제거
    }, [setPriceData]);

    return null; // 이 컴포넌트는 데이터를 가져오기만 하고 UI는 반환하지 않음
}