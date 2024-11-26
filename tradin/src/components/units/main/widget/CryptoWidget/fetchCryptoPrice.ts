import axios from 'axios';

interface FetchCryptoPriceProps {
    coinId: string;
    prevPrice: number | null;
}

export async function fetchCryptoPrice({ coinId, prevPrice }: FetchCryptoPriceProps) {
    try {
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=krw`
        );
        const newPrice = response.data[coinId].krw;
        const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

        const newData = {
            prevPrice,
            price: newPrice,
            timestamp,
        };

        // 캐시 데이터 저장
        localStorage.setItem(`crypto-${coinId}`, JSON.stringify(newData));

        return newData; // 새로운 가격 데이터 반환
    } catch (error) {
        console.error('Error fetching crypto price:', error);
        return null; // 에러 발생 시 null 반환
    }
}