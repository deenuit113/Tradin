import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EthereumWidget({ setPriceData }) {
    useEffect(() => {
        const fetchEthereumPrice = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=krw'
                );
                setPriceData((prevData) => ({
                    prevPrice: prevData.price,
                    price: response.data.ethereum.krw,
                }));
            } catch (error) {
                console.error('Error fetching Ethereum price:', error);
            }
        };

        fetchEthereumPrice();
        const intervalId = setInterval(fetchEthereumPrice, 60000); // 1분마다 가격 업데이트

        return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 제거
    }, [setPriceData]);

    return null; // 이 컴포넌트는 데이터를 가져오기만 하고 UI는 반환하지 않음
}