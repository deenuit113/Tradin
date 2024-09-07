import axios from 'axios';

export async function getCurrencyConversionRates() {
    try {
        const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY; // 여기에 API 키를 입력하세요.
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`);
        
        const rates = response.data.rates;
        const usdToKrwRate = rates.KRW; // USD -> KRW 환율

        return usdToKrwRate;
    } catch (error) {
        console.error('Failed to fetch currency conversion rates:', error);
        throw error;
    }
}